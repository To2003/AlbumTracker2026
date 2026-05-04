'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Check } from 'lucide-react';
import type { CollectionStats } from '@/lib/collection-store';
import { ALBUM_CONFIG } from '@/lib/album-data';

interface StatsCardsProps {
  stats: CollectionStats;
  onAddPacks?: (amount: number) => void;
}

export function StatsCards({ stats, onAddPacks }: StatsCardsProps) {
  const [packsToAdd, setPacksToAdd] = useState<number | string>(0);

  const handleConfirmPacks = () => {
    const num = typeof packsToAdd === 'string' ? parseInt(packsToAdd, 10) : packsToAdd;
    if (!isNaN(num) && num !== 0 && onAddPacks) {
      onAddPacks(num);
      setPacksToAdd(0);
    }
  };

  const handleAdjustPacks = (delta: number) => {
    setPacksToAdd(prev => {
      const current = typeof prev === 'string' ? parseInt(prev, 10) || 0 : prev;
      return current + delta;
    });
  };

  return (
    <div className="grid gap-2 sm:gap-4 grid-cols-2 lg:grid-cols-4">
      {/* Progress Card */}
      <Card className="col-span-2">
        <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
            Progreso del Album
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="flex items-end gap-1 sm:gap-2">
            <span className="text-2xl sm:text-3xl font-bold tabular-nums text-foreground">
              {stats.owned}
            </span>
            <span className="text-muted-foreground mb-0.5 sm:mb-1 text-sm sm:text-base">
              / {stats.total}
            </span>
          </div>
          <Progress 
            value={stats.completionPercentage} 
            className="mt-2 sm:mt-3 h-1.5 sm:h-2"
          />
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
            {stats.completionPercentage.toFixed(1)}% completado
          </p>
        </CardContent>
      </Card>

      {/* Missing Card */}
      <Card>
        <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
            Te faltan
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0 sm:gap-1">
            <span className="text-2xl sm:text-3xl font-bold tabular-nums text-destructive">
              {stats.missing}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">figuritas</span>
          </div>
        </CardContent>
      </Card>

      {/* Duplicates Card */}
      <Card>
        <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
            Repetidas
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0 sm:gap-1">
            <span className="text-2xl sm:text-3xl font-bold tabular-nums text-warning dark:text-warning">
              {stats.duplicates}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">para cambiar</span>
          </div>
        </CardContent>
      </Card>

      {/* Estimated Cost Card */}
      <Card>
        <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
            Costo mínimo estimado
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0 sm:gap-1">
            <span className="text-2xl sm:text-3xl font-bold tabular-nums text-foreground">
              ${stats.estimatedCost.toFixed(0)}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">ARS</span>
          </div>
          <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-muted-foreground">
            ~{stats.estimatedPacksNeeded} sobres
          </p>
        </CardContent>
      </Card>

      {/* Packs Needed Card */}
      <Card>
        <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
            Mínimo de sobres
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0 sm:gap-1">
            <span className="text-2xl sm:text-3xl font-bold tabular-nums text-foreground">
              {stats.estimatedPacksNeeded}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">sobres</span>
          </div>
          <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-muted-foreground">
            Asumiendo 0 repetidas (perfecta suerte)
          </p>
        </CardContent>
      </Card>

      {/* Opened Packs Card */}
      <Card className="col-span-2 flex flex-col justify-between">
        <CardHeader className="pb-0 px-4 sm:px-6 pt-4 sm:pt-6">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Sobres abiertos
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            
            {/* Left side: Total & Rate */}
            <div>
              <div className="flex items-baseline gap-1 sm:gap-2">
                <span className="text-3xl sm:text-4xl font-bold tabular-nums text-foreground tracking-tight">
                  {stats.openedPacks}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground">en total</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {stats.openedPacks > 0 
                  ? <span className="font-medium text-primary/80">{`${(stats.duplicates / stats.openedPacks).toFixed(2)} repetidas / sobre`}</span>
                  : "Sin datos de tasa"
                }
              </p>
            </div>

            {/* Right side: Controls */}
            <div className="flex items-center gap-1 p-1 bg-muted/40 rounded-xl border border-border/50 shadow-sm w-full sm:w-auto">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-background hover:shadow-sm rounded-lg shrink-0 transition-all" 
                onClick={() => handleAdjustPacks(-1)}
                disabled={!onAddPacks}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                className="h-8 sm:h-9 text-center font-bold text-base w-16 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none px-0 tabular-nums"
                value={packsToAdd}
                onChange={(e) => setPacksToAdd(e.target.value)}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-background hover:shadow-sm rounded-lg shrink-0 transition-all" 
                onClick={() => handleAdjustPacks(1)}
                disabled={!onAddPacks}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <div className="w-[1px] h-6 bg-border/60 mx-1"></div>
              <Button 
                size="sm" 
                className="h-8 sm:h-9 px-3 rounded-lg shrink-0 font-medium"
                onClick={handleConfirmPacks}
                disabled={!onAddPacks || packsToAdd === '' || parseInt(packsToAdd.toString(), 10) === 0}
              >
                Aplicar
              </Button>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
