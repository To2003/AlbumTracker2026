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

export function SyncCollectionDialog({ collection, onImport }: SyncCollectionDialogProps) {
  const [copied, setCopied] = useState(false);
  const [importCode, setImportCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  // Generate a compressed base64 string from the collection
  const generateExportCode = () => {
    try {
      // Only export stickers we actually have
      const activeStickers = Object.entries(collection)
        .filter(([_, count]) => count > 0);
        
      if (activeStickers.length === 0) return '';
      
      // Format: ID or ID:count (e.g. MEX1,MEX2:2,ARG1)
      const compressed = activeStickers
        .map(([id, count]) => count === 1 ? id : `${id}:${count}`)
        .join(',');
        
      return btoa(compressed);
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
      
      const decoded = atob(importCode.trim());
      
      let parsed: Record<string, number> = {};
      
      // Check if it's the old JSON format
      if (decoded.trim().startsWith('{')) {
        parsed = JSON.parse(decoded);
      } else {
        // Parse the compressed format
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
        <Button variant="outline" className="gap-1.5 sm:gap-2 h-8 sm:h-9 text-xs sm:text-sm px-2.5 sm:px-4">
          <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Sincronizar</span>
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
          <TabsList className="grid w-full grid-cols-2 h-9 sm:h-10">
            <TabsTrigger value="export" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2">
              <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
              Exportar
            </TabsTrigger>
            <TabsTrigger value="import" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              Importar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="export" className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">
              Copia este código y envíaselo a la persona con la que compartes el álbum.
            </p>
            <div className="relative">
              <Textarea 
                readOnly 
                value={generateExportCode()} 
                className="font-mono text-xs h-32 resize-none bg-muted/50 break-all"
              />
            </div>
            <Button onClick={handleCopy} className="w-full gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copiado' : 'Copiar Código'}
            </Button>
          </TabsContent>
          
          <TabsContent value="import" className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">
              Pega aquí el código que te compartieron para actualizar tu álbum.
            </p>
            <Textarea 
              placeholder="Pega el código aquí..." 
              value={importCode}
              onChange={(e) => setImportCode(e.target.value)}
              className="font-mono text-xs h-32 resize-none break-all"
            />
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleImport(false)}
                className="w-full text-xs"
              >
                Reemplazar todo
              </Button>
              <Button 
                onClick={() => handleImport(true)}
                className="w-full text-xs"
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
