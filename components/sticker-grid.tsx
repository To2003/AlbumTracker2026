'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { teams, specialSections, type Sticker, type Team } from '@/lib/album-data';
import { cn } from '@/lib/utils';
import { Check, Minus, Plus, Shield, Users, User } from 'lucide-react';

interface StickerGridProps {
  teamId?: string | null;
  sectionId?: string | null;
  collection: Record<string, number>;
  onIncrement: (stickerId: string) => void;
  onDecrement: (stickerId: string) => void;
  onToggle: (stickerId: string) => void;
}

function getStickerIcon(type: Sticker['type']) {
  switch (type) {
    case 'badge':
      return <Shield className="h-4 w-4" />;
    case 'team-photo':
      return <Users className="h-4 w-4" />;
    case 'player':
      return <User className="h-4 w-4" />;
    default:
      return null;
  }
}

function StickerCard({
  sticker,
  count,
  onIncrement,
  onDecrement,
  onToggle,
}: {
  sticker: Sticker;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onToggle: () => void;
}) {
  const hasSticker = count > 0;
  const hasDuplicates = count > 1;
  
  return (
    <div
      className={cn(
        "group relative rounded-lg border p-2 sm:p-3 transition-all cursor-pointer",
        hasSticker
          ? "bg-primary/10 border-primary/50 dark:bg-primary/20"
          : "bg-card border-border hover:border-primary/50 hover:bg-muted/50"
      )}
      onClick={onToggle}
    >
      {/* Sticker Number */}
      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
        <Badge 
          variant={hasSticker ? "default" : "secondary"} 
          className={cn(
            "text-[10px] sm:text-xs font-mono px-1.5 sm:px-2",
            hasSticker && "bg-primary text-primary-foreground"
          )}
        >
          #{sticker.stickerCode}
        </Badge>
        {hasDuplicates && (
          <Badge 
            className="text-[10px] sm:text-xs px-1.5 sm:px-2 bg-warning text-warning-foreground border-warning"
          >
            x{count}
          </Badge>
        )}
      </div>
      
      {/* Sticker Info */}
      <div className="flex items-start gap-1.5 sm:gap-2">
        <div className={cn(
          "flex-shrink-0 rounded-md p-1 sm:p-1.5",
          hasSticker ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
        )}>
          {getStickerIcon(sticker.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn(
            "text-xs sm:text-sm font-medium truncate",
            hasSticker ? "text-foreground" : "text-muted-foreground"
          )}>
            {sticker.name}
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground capitalize hidden sm:block">
            {sticker.type === 'team-photo' ? 'Foto Equipo' : sticker.type === 'badge' ? 'Escudo' : 'Jugador'}
          </p>
        </div>
        {hasSticker && (
          <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
        )}
      </div>
      
      {/* Counter Controls - Always visible on mobile */}
      <div 
        className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 sm:h-7 sm:w-7"
          onClick={onDecrement}
          disabled={count === 0}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="text-xs sm:text-sm font-medium w-5 sm:w-6 text-center text-foreground">{count}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 sm:h-7 sm:w-7"
          onClick={onIncrement}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

export function StickerGrid({
  teamId,
  sectionId,
  collection,
  onIncrement,
  onDecrement,
  onToggle,
}: StickerGridProps) {
  // Get stickers based on selection
  let stickers: Sticker[] = [];
  let title = '';
  let subtitle = '';
  
  if (teamId) {
    const team = teams.find(t => t.id === teamId);
    if (team) {
      stickers = team.stickers;
      title = `${team.flag} ${team.name}`;
      subtitle = `Grupo ${team.group} - ${team.confederation}`;
    }
  } else if (sectionId) {
    const section = specialSections.find(s => s.id === sectionId);
    if (section) {
      stickers = section.stickers;
      title = section.name;
      subtitle = `${section.stickers.length} figuritas especiales`;
    }
  }
  
  if (stickers.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            Selecciona un equipo o seccion para ver sus figuritas
          </p>
        </CardContent>
      </Card>
    );
  }
  
  const ownedCount = stickers.filter(s => (collection[s.id] || 0) > 0).length;
  const totalCount = stickers.length;
  const completionPercent = (ownedCount / totalCount) * 100;
  
  return (
    <Card>
      <CardHeader className="pb-2 sm:pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
            <p className="text-xl sm:text-2xl font-bold tabular-nums text-foreground">
              {ownedCount}/{totalCount}
            </p>
            <p className={cn(
              "text-xs sm:text-sm font-medium",
              completionPercent === 100 ? "text-primary" : "text-muted-foreground"
            )}>
              {completionPercent.toFixed(0)}% completo
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          {stickers.map(sticker => (
            <StickerCard
              key={sticker.id}
              sticker={sticker}
              count={collection[sticker.id] || 0}
              onIncrement={() => onIncrement(sticker.id)}
              onDecrement={() => onDecrement(sticker.id)}
              onToggle={() => onToggle(sticker.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
