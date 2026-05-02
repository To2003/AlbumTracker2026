'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { CollectionStats } from '@/lib/collection-store';
import { ALBUM_CONFIG } from '@/lib/album-data';

interface StatsCardsProps {
  stats: CollectionStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
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
    </div>
  );
}
