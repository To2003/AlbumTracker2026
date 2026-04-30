'use client';

import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ALBUM_CONFIG } from '@/lib/album-data';
import type { CollectionStats } from '@/lib/collection-store';
import { Calculator, DollarSign, Package, TrendingUp } from 'lucide-react';

interface CalculatorDialogProps {
  stats: CollectionStats;
}

export function CalculatorDialog({ stats }: CalculatorDialogProps) {
  const [packPrice, setPackPrice] = useState(ALBUM_CONFIG.packPrice);
  const [tradeRate, setTradeRate] = useState(50); // % of duplicates you can trade
  
  const calculations = useMemo(() => {
    const { missing, duplicates, owned, total } = stats;
    
    // Stickers per pack
    const stickersPerPack = ALBUM_CONFIG.stickersPerPack;
    
    // Calculate expected packs needed without trading
    let expectedStickersNeeded = 0;
    for (let i = owned; i < total; i++) {
      const probNew = (total - i) / total;
      expectedStickersNeeded += 1 / probNew;
    }
    const packsWithoutTrading = Math.ceil(expectedStickersNeeded / stickersPerPack);
    
    // Calculate with trading (simplified model)
    const tradableStickers = Math.floor(duplicates * (tradeRate / 100));
    const effectiveMissing = Math.max(0, missing - tradableStickers);
    
    // Recalculate for effective missing
    let effectiveStickersNeeded = 0;
    const effectiveOwned = total - effectiveMissing;
    for (let i = effectiveOwned; i < total; i++) {
      const probNew = (total - i) / total;
      effectiveStickersNeeded += 1 / probNew;
    }
    const packsWithTrading = Math.ceil(effectiveStickersNeeded / stickersPerPack);
    
    return {
      packsWithoutTrading,
      packsWithTrading,
      costWithoutTrading: packsWithoutTrading * packPrice,
      costWithTrading: packsWithTrading * packPrice,
      savings: (packsWithoutTrading - packsWithTrading) * packPrice,
      tradableStickers,
    };
  }, [stats, packPrice, tradeRate]);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Calculator className="h-4 w-4" />
          Calculadora
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculadora de Sobres
          </DialogTitle>
          <DialogDescription>
            Estima cuanto te costaria completar el album
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Price Input */}
          <div className="space-y-2">
            <Label htmlFor="pack-price" className="text-sm font-medium">
              Precio por sobre (USD)
            </Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="pack-price"
                type="number"
                min="0"
                step="0.1"
                value={packPrice}
                onChange={(e) => setPackPrice(Number(e.target.value))}
                className="w-24"
              />
            </div>
          </div>
          
          {/* Trade Rate Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                Tasa de intercambio exitoso
              </Label>
              <span className="text-sm text-muted-foreground">{tradeRate}%</span>
            </div>
            <Slider
              value={[tradeRate]}
              onValueChange={([value]) => setTradeRate(value)}
              min={0}
              max={100}
              step={5}
            />
            <p className="text-xs text-muted-foreground">
              Porcentaje de tus repetidas que logras intercambiar por figuritas que te faltan
            </p>
          </div>
          
          {/* Results */}
          <div className="grid gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-full bg-muted p-2">
                    <Package className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Sin intercambiar</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold">{calculations.packsWithoutTrading}</p>
                    <p className="text-xs text-muted-foreground">sobres necesarios</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">${calculations.costWithoutTrading.toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">costo total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-success/50 bg-success/5">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-full bg-success/20 p-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                  <span className="font-medium">Con intercambio</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold">{calculations.packsWithTrading}</p>
                    <p className="text-xs text-muted-foreground">sobres necesarios</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">${calculations.costWithTrading.toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">costo total</p>
                  </div>
                </div>
                {calculations.savings > 0 && (
                  <p className="mt-3 text-sm text-success font-medium">
                    Ahorras ${calculations.savings.toFixed(0)} intercambiando {calculations.tradableStickers} figuritas
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            * Estimacion basada en probabilidades. Los resultados reales pueden variar.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
