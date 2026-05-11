'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { teams, getGroups, specialSections, type Team } from '@/lib/album-data';
import { Search, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamSelectorProps {
  selectedTeam: string | null;
  selectedSection: string | null;
  onSelectTeam: (teamId: string) => void;
  onSelectSection: (sectionId: string) => void;
  collection: Record<string, number>;
}

export function TeamSelector({
  selectedTeam,
  selectedSection,
  onSelectTeam,
  onSelectSection,
  collection,
}: TeamSelectorProps) {
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  
  const groups = getGroups();
  
  // Filter teams based on search and group
  const filteredTeams = useMemo(() => {
    let result = teams;
    
    if (selectedGroup) {
      result = result.filter(team => team.group === selectedGroup);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(team => 
        team.name.toLowerCase().includes(searchLower) ||
        team.code.toLowerCase().includes(searchLower)
      );
    }
    
    return result;
  }, [selectedGroup, search]);
  
  // Calculate completion for stickers
  const getCompletion = (stickers: { id: string }[]): { owned: number; total: number } => {
    const owned = stickers.filter(s => (collection[s.id] || 0) > 0).length;
    return { owned, total: stickers.length };
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar equipo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-10 sm:h-11 text-[16px]"
        />
      </div>
      
      {/* Group Filter */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-1.5 sm:gap-2 pb-2">
          <Button
            variant={selectedGroup === null ? 'default' : 'outline'}
            size="sm"
            className="h-9 sm:h-10 text-[16px] sm:text-base px-3 sm:px-4"
            onClick={() => setSelectedGroup(null)}
          >
            Todos
          </Button>
          {groups.map(group => (
            <Button
              key={group}
              variant={selectedGroup === group ? 'default' : 'outline'}
              size="sm"
              className="h-9 sm:h-10 text-[16px] sm:text-base px-3 sm:px-4"
              onClick={() => setSelectedGroup(group)}
            >
              {group}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      
      {/* Special Sections */}
      <div className="space-y-2">
        <h3 className="text-[16px] sm:text-base font-medium text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
          Secciones Especiales
        </h3>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-1.5 sm:gap-2 pb-2">
            {specialSections.map(section => {
              const completion = getCompletion(section.stickers);
              const isComplete = completion.owned === completion.total;
              const isSelected = selectedSection === section.id;
              
              return (
                <Button
                  key={section.id}
                  variant={isSelected ? 'default' : 'outline'}
                  className={cn(
                    "h-auto py-2 sm:py-3 px-2 sm:px-3 justify-start shrink-0 min-w-[140px] sm:min-w-[180px]",
                    isComplete && !isSelected && "border-primary/50 bg-primary/10"
                  )}
                  onClick={() => onSelectSection(section.id)}
                >
                  <div className="flex flex-col items-start gap-1 w-full">
                    <span className="font-medium text-base sm:text-lg leading-tight truncate w-full text-left">{section.name}</span>
                    <Badge 
                      variant={isComplete ? 'default' : 'secondary'} 
                      className={cn(
                        "text-[16px] sm:text-base px-2",
                        isComplete && "bg-primary text-primary-foreground"
                      )}
                    >
                      {completion.owned}/{completion.total}
                    </Badge>
                  </div>
                </Button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      
      {/* Teams Grid */}
      <div className="space-y-2">
        <h3 className="text-[16px] sm:text-base font-medium text-muted-foreground">
          Selecciones ({filteredTeams.length})
        </h3>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-1.5 sm:gap-2 pb-2">
            {filteredTeams.map(team => {
              const completion = getCompletion(team.stickers);
              const isComplete = completion.owned === completion.total;
              const isSelected = selectedTeam === team.id;
              
              return (
                <Button
                  key={team.id}
                  variant={isSelected ? 'default' : 'outline'}
                  className={cn(
                    "h-auto py-2 sm:py-3 px-2 sm:px-3 flex-col items-start gap-0.5 sm:gap-1 shrink-0 min-w-[150px] sm:min-w-[180px]",
                    isComplete && !isSelected && "border-primary/50 bg-primary/10"
                  )}
                  onClick={() => onSelectTeam(team.id)}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 w-full">
                    <span className="text-xl sm:text-2xl">{team.flag}</span>
                    <span className="font-medium text-[16px] sm:text-lg truncate">{team.name}</span>
                  </div>
                  <div className="flex items-center justify-between w-full mt-1">
                    <Badge variant="secondary" className="text-[16px] px-2">
                      {team.group}
                    </Badge>
                    <span className={cn(
                      "text-[16px] sm:text-lg tabular-nums",
                      isComplete ? "text-primary font-medium" : "text-muted-foreground"
                    )}>
                      {completion.owned}/{completion.total}
                    </span>
                  </div>
                </Button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
