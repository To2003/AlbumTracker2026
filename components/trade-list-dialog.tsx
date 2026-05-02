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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { generateTradeList, formatTradeListAsText } from '@/lib/collection-store';
import { ArrowLeftRight, Copy, Check, Package, Search } from 'lucide-react';
import { toast } from 'sonner';

interface TradeListDialogProps {
  collection: Record<string, number>;
}

export function TradeListDialog({ collection }: TradeListDialogProps) {
  const [copied, setCopied] = useState(false);
  const { have, need } = generateTradeList(collection);
  
  const handleCopy = async () => {
    try {
      const text = formatTradeListAsText(collection);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Lista copiada al portapapeles');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Error al copiar');
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1.5 sm:gap-2 h-8 sm:h-9 text-xs sm:text-sm px-2.5 sm:px-4">
          <ArrowLeftRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Lista de</span> Intercambio
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] w-[95vw] sm:w-full p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5" />
            Lista de Intercambio
          </DialogTitle>
          <DialogDescription>
            Genera una lista para compartir con otros coleccionistas
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-end">
          <Button onClick={handleCopy} variant="outline" size="sm" className="gap-2">
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copiar Lista
              </>
            )}
          </Button>
        </div>
        
        <Tabs defaultValue="have" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-9 sm:h-10">
            <TabsTrigger value="have" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2">
              <Package className="h-3 w-3 sm:h-4 sm:w-4" />
              Tengo ({have.length})
            </TabsTrigger>
            <TabsTrigger value="need" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2">
              <Search className="h-3 w-3 sm:h-4 sm:w-4" />
              Necesito ({need.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="have">
            <ScrollArea className="h-[300px] sm:h-[400px] rounded-md border p-2 sm:p-4">
              {have.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 text-sm">
                  No tenes figuritas repetidas para intercambiar
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {have.map(item => (
                    <div
                      key={item.stickerId}
                      className="flex items-center justify-between rounded-lg border bg-primary/5 border-primary/20 p-2 sm:p-3"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <Badge variant="outline" className="font-mono text-xs shrink-0">
                          #{item.stickerCode}
                        </Badge>
                        <span className="text-xs sm:text-sm truncate text-foreground">{item.name}</span>
                      </div>
                      <Badge className="bg-warning text-warning-foreground shrink-0 ml-2">
                        x{item.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="need">
            <ScrollArea className="h-[300px] sm:h-[400px] rounded-md border p-2 sm:p-4">
              {need.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 text-sm">
                  Album completo! No necesitas ninguna figurita
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {need.map(item => (
                    <div
                      key={item.stickerId}
                      className="flex items-center gap-2 sm:gap-3 rounded-lg border p-2 sm:p-3"
                    >
                      <Badge variant="secondary" className="font-mono text-xs shrink-0">
                        #{item.stickerCode}
                      </Badge>
                      <span className="text-xs sm:text-sm truncate text-muted-foreground">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
