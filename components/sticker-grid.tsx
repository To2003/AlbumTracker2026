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

function getStickerIcon(type: Sticker['type'], className?: string) {
  const iconClass = className || "h-5 w-5";
  switch (type) {
    case 'badge':
      return <Shield className={iconClass} />;
    case 'team-photo':
      return <Users className={iconClass} />;
    case 'player':
      return <User className={iconClass} />;
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
        "group relative rounded-xl border p-2.5 sm:p-3 transition-all cursor-pointer flex flex-col h-full min-h-[220px]",
        hasSticker
          ? "bg-primary/5 border-primary/40 dark:bg-primary/10 shadow-sm"
          : "bg-card border-border hover:border-primary/50 hover:bg-muted/50"
      )}
      onClick={onToggle}
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between mb-2">
        <Badge 
          variant={hasSticker ? "default" : "secondary"} 
          className={cn(
            "text-[16px] sm:text-lg font-mono px-2 py-0.5",
            hasSticker && "bg-primary text-primary-foreground shadow-sm"
          )}
        >
          #{sticker.stickerCode}
        </Badge>
        <div className="flex gap-1.5 items-center">
          {hasDuplicates && (
            <Badge 
              className="text-[16px] sm:text-lg px-2 bg-warning text-warning-foreground border-warning shadow-sm"
            >
              x{count}
            </Badge>
          )}
          {hasSticker && (
            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
      </div>
      
      {/* Card Image Placeholder */}
      <div className={cn(
        "w-full aspect-[3/4] rounded-lg flex items-center justify-center mb-3 border-2 transition-all duration-300",
        hasSticker 
          ? "bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30" 
          : "bg-muted border-border/50 grayscale opacity-60"
      )}>
         <div className={cn(
           "flex items-center justify-center rounded-full p-3 sm:p-4 transition-all duration-300",
           hasSticker ? "bg-background/80 shadow-md text-primary" : "bg-background/40 text-muted-foreground"
         )}>
           {getStickerIcon(sticker.type, "h-8 w-8 sm:h-10 sm:w-10")}
         </div>
      </div>
      
      {/* Sticker Info */}
      <div className="flex-1 flex flex-col items-center text-center justify-between gap-2">
        <div className="flex flex-col items-center w-full">
          <p className={cn(
            "text-[16px] sm:text-lg font-medium leading-tight line-clamp-2 w-full",
            hasSticker ? "text-foreground" : "text-muted-foreground"
          )}
          title={sticker.name}
          >
            {sticker.name}
          </p>
          <p className="text-[14px] sm:text-[16px] text-muted-foreground capitalize mt-0.5">
            {sticker.type === 'team-photo' ? 'Foto Equipo' : sticker.type === 'badge' ? 'Escudo' : 'Jugador'}
          </p>
        </div>
        
        {/* Counter Controls */}
        <div 
          className="flex items-center justify-center gap-2 mt-auto pt-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant={hasSticker ? "default" : "outline"}
            size="icon"
            className={cn("h-9 w-9 sm:h-10 sm:w-10 rounded-full", hasSticker ? "bg-primary/20 text-primary hover:bg-primary/30 border-none shadow-none" : "")}
            onClick={onDecrement}
            disabled={count === 0}
          >
            <Minus className="h-5 w-5" />
          </Button>
          <span className="text-[16px] sm:text-lg font-bold w-6 sm:w-8 text-center text-foreground">{count}</span>
          <Button
            variant={hasSticker ? "default" : "outline"}
            size="icon"
            className={cn("h-9 w-9 sm:h-10 sm:w-10 rounded-full", hasSticker ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" : "")}
            onClick={onIncrement}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
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
          <p className="text-[16px] sm:text-lg text-muted-foreground">
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
            <CardTitle className="text-xl sm:text-2xl">{title}</CardTitle>
            <p className="text-[16px] sm:text-base text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
            <p className="text-xl sm:text-2xl font-bold tabular-nums text-foreground">
              {ownedCount}/{totalCount}
            </p>
            <p className={cn(
              "text-[16px] sm:text-base font-medium",
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
