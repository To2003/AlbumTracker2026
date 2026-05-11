'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { MainStatsCards, SecondaryStatsCards } from '@/components/stats-cards';
import { TeamSelector } from '@/components/team-selector';
import { StickerGrid } from '@/components/sticker-grid';
import { TradeListDialog } from '@/components/trade-list-dialog';
import { ClearCollectionDialog } from '@/components/clear-collection-dialog';
import { SyncCollectionDialog } from '@/components/sync-collection-dialog';
import { useCollection } from '@/lib/collection-store';
import { Toaster } from '@/components/ui/sonner';
import { Spinner } from '@/components/ui/spinner';

export default function Home() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  
  const {
    collection,
    isLoaded,
    increment,
    decrement,
    toggle,
    clearAll,
    importCollection,
    stats,
    addPacks,
  } = useCollection();
  
  const handleSelectTeam = (teamId: string) => {
    setSelectedTeam(teamId);
    setSelectedSection(null);
  };
  
  const handleSelectSection = (sectionId: string) => {
    setSelectedSection(sectionId);
    setSelectedTeam(null);
  };
  
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Main Stats Section */}
        <section>
          <MainStatsCards stats={stats} />
        </section>
        
        {/* Actions Bar */}
        <section className="flex flex-wrap items-center gap-2 sm:gap-3">
          <TradeListDialog collection={collection} />
          <SyncCollectionDialog collection={collection} onImport={importCollection} />
          <div className="flex-1" />
          <ClearCollectionDialog onClear={clearAll} />
        </section>
        
        {/* Main Content - Stack on mobile and desktop */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Team Selector */}
          <aside className="w-full">
            <div className="bg-card rounded-lg border p-3 sm:p-4">
              <TeamSelector
                selectedTeam={selectedTeam}
                selectedSection={selectedSection}
                onSelectTeam={handleSelectTeam}
                onSelectSection={handleSelectSection}
                collection={collection}
              />
            </div>
          </aside>
          
          {/* Sticker Grid */}
          <section>
            <StickerGrid
              teamId={selectedTeam}
              sectionId={selectedSection}
              collection={collection}
              onIncrement={increment}
              onDecrement={decrement}
              onToggle={toggle}
            />
          </section>
        </div>

        {/* Secondary Stats Section */}
        <section>
          <SecondaryStatsCards stats={stats} onAddPacks={addPacks} />
        </section>
      </main>
      
      <Toaster />
    </div>
  );
}
