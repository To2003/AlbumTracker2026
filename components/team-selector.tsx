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
  
  // Calculate completion for a team
  const getTeamCompletion = (team: Team): { owned: number; total: number } => {
    const owned = team.stickers.filter(s => (collection[s.id] || 0) > 0).length;
    return { owned, total: team.stickers.length };
  };
  
  // Calculate completion for a section
  const getSectionCompletion = (sectionId: string): { owned: number; total: number } => {
    const section = specialSections.find(s => s.id === sectionId);
    if (!section) return { owned: 0, total: 0 };
    const owned = section.stickers.filter(s => (collection[s.id] || 0) > 0).length;
    return { owned, total: section.stickers.length };
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
          className="pl-10 h-9 sm:h-10 text-sm"
        />
      </div>
      
      {/* Group Filter */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-1.5 sm:gap-2 pb-2">
          <Button
            variant={selectedGroup === null ? 'default' : 'outline'}
            size="sm"
            className="h-7 sm:h-8 text-xs sm:text-sm px-2 sm:px-3"
            onClick={() => setSelectedGroup(null)}
          >
            Todos
          </Button>
          {groups.map(group => (
            <Button
              key={group}
              variant={selectedGroup === group ? 'default' : 'outline'}
              size="sm"
              className="h-7 sm:h-8 text-xs sm:text-sm px-2 sm:px-3"
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
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Secciones Especiales
        </h3>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {specialSections.map(section => {
            const completion = getSectionCompletion(section.id);
            const isComplete = completion.owned === completion.total;
            const isSelected = selectedSection === section.id;
            
            return (
              <Button
                key={section.id}
                variant={isSelected ? 'default' : 'outline'}
                className={cn(
                  "h-auto py-2 sm:py-3 px-2 sm:px-3 justify-start",
                  isComplete && !isSelected && "border-primary/50 bg-primary/10"
                )}
                onClick={() => onSelectSection(section.id)}
              >
                <div className="flex flex-col items-start gap-0.5 sm:gap-1">
                  <span className="font-medium text-[10px] sm:text-sm leading-tight">{section.name}</span>
                  <Badge 
                    variant={isComplete ? 'default' : 'secondary'} 
                    className={cn(
                      "text-[9px] sm:text-xs px-1 sm:px-2",
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
      </div>
      
      {/* Teams Grid */}
      <div className="space-y-2">
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">
          Selecciones ({filteredTeams.length})
        </h3>
        <ScrollArea className="h-[200px] sm:h-[280px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-1.5 sm:gap-2 pr-3 sm:pr-4">
            {filteredTeams.map(team => {
              const completion = getTeamCompletion(team);
              const isComplete = completion.owned === completion.total;
              const isSelected = selectedTeam === team.id;
              
              return (
                <Button
                  key={team.id}
                  variant={isSelected ? 'default' : 'outline'}
                  className={cn(
                    "h-auto py-2 sm:py-3 px-2 sm:px-3 flex-col items-start gap-0.5 sm:gap-1",
                    isComplete && !isSelected && "border-primary/50 bg-primary/10"
                  )}
                  onClick={() => onSelectTeam(team.id)}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 w-full">
                    <span className="text-base sm:text-lg">{team.flag}</span>
                    <span className="font-medium text-[11px] sm:text-sm truncate">{team.name}</span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <Badge variant="secondary" className="text-[9px] sm:text-xs px-1 sm:px-2">
                      {team.group}
                    </Badge>
                    <span className={cn(
                      "text-[10px] sm:text-xs tabular-nums",
                      isComplete ? "text-primary font-medium" : "text-muted-foreground"
                    )}>
                      {completion.owned}/{completion.total}
                    </span>
                  </div>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
