'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Download, Copy, Check, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface SyncCollectionDialogProps {
  collection: Record<string, number>;
  onImport: (newCollection: Record<string, number>, merge: boolean) => void;
}

import LZString from 'lz-string';
import { getAllStickers } from '@/lib/album-data';

export function SyncCollectionDialog({ collection, onImport }: SyncCollectionDialogProps) {
  const [copied, setCopied] = useState(false);
  const [importCode, setImportCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  // Generate a compressed string from the collection
  const generateExportCode = () => {
    try {
      const allStickers = getAllStickers();
      
      // New format: positional string where each char is base36 representation of count
      let str = allStickers.map(s => {
        const count = collection[s.id] || 0;
        return Math.min(35, count).toString(36);
      }).join('');
      
      // Trim trailing zeros to save space
      str = str.replace(/0+$/, '');
      
      if (!str) return '';
      
      // Add v2 header to distinguish from old format
      const newFormat = `v2|${str}`;
      return LZString.compressToEncodedURIComponent(newFormat);
    } catch {
      return '';
    }
  };
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateExportCode());
      setCopied(true);
      toast.success('Código copiado al portapapeles');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Error al copiar el código');
    }
  };
  
  const handleImport = (merge: boolean) => {
    try {
      if (!importCode.trim()) {
        toast.error('Pega un código primero');
        return;
      }
      
      let decoded = LZString.decompressFromEncodedURIComponent(importCode.trim());
      
      // Fallback for old base64 format
      if (!decoded) {
        try {
          decoded = atob(importCode.trim());
        } catch {
          throw new Error('Invalid format');
        }
      }
      
      if (!decoded) {
        throw new Error('Invalid format');
      }
      
      let parsed: Record<string, number> = {};
      
      if (decoded.startsWith('v2|')) {
        // Parse the new v2 format
        const str = decoded.substring(3); // Remove 'v2|'
        const allStickers = getAllStickers();
        for (let i = 0; i < str.length; i++) {
          if (i >= allStickers.length) break;
          const count = parseInt(str[i], 36);
          if (count > 0) {
            parsed[allStickers[i].id] = count;
          }
        }
      } else if (decoded.trim().startsWith('{')) {
        // Check if it's the old JSON format
        parsed = JSON.parse(decoded);
      } else {
        // Parse the old compressed format
        const parts = decoded.split(',');
        for (const p of parts) {
          if (!p) continue;
          const [id, countStr] = p.split(':');
          parsed[id] = countStr ? parseInt(countStr, 10) : 1;
        }
      }
      
      // Basic validation
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error('Invalid format');
      }
      
      onImport(parsed, merge);
      toast.success(merge ? 'Colección combinada con éxito' : 'Colección reemplazada con éxito');
      setIsOpen(false);
      setImportCode('');
    } catch (e) {
      toast.error('Código inválido o corrupto');
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 sm:gap-3 h-10 sm:h-11 text-[16px] sm:text-lg px-4 sm:px-6">
          <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Sincronizar Datos</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-[95vw] sm:w-full p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Sincronizar Colección
          </DialogTitle>
          <DialogDescription>
            Exporta o importa tu álbum mediante un código de texto.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="export" className="w-full mt-2">
          <TabsList className="grid w-full grid-cols-2 h-10 sm:h-12">
            <TabsTrigger value="export" className="gap-1 sm:gap-2 text-[16px] sm:text-lg px-2">
              <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
              Exportar
            </TabsTrigger>
            <TabsTrigger value="import" className="gap-1 sm:gap-2 text-[16px] sm:text-lg px-2">
              <Download className="h-4 w-4 sm:h-5 sm:w-5" />
              Importar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="export" className="space-y-4 pt-4">
            <p className="text-[16px] sm:text-lg text-muted-foreground">
              Copia este código y envíaselo a la persona con la que compartes el álbum.
            </p>
            <div className="relative">
              <Textarea 
                readOnly 
                value={generateExportCode()} 
                className="font-mono text-[16px] h-32 resize-none bg-muted/50 break-all"
              />
            </div>
            <Button onClick={handleCopy} className="w-full gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copiado' : 'Copiar Código'}
            </Button>
          </TabsContent>
          
          <TabsContent value="import" className="space-y-4 pt-4">
            <p className="text-[16px] sm:text-lg text-muted-foreground">
              Pega aquí el código que te compartieron para actualizar tu álbum.
            </p>
            <Textarea 
              placeholder="Pega el código aquí..." 
              value={importCode}
              onChange={(e) => setImportCode(e.target.value)}
              className="font-mono text-[16px] h-32 resize-none break-all"
            />
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleImport(false)}
                className="w-full text-[16px]"
              >
                Reemplazar todo
              </Button>
              <Button 
                onClick={() => handleImport(true)}
                className="w-full text-[16px]"
              >
                Combinar datos
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
