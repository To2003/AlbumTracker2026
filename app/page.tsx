'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { StatsCards } from '@/components/stats-cards';
import { TeamSelector } from '@/components/team-selector';
import { StickerGrid } from '@/components/sticker-grid';
import { TradeListDialog } from '@/components/trade-list-dialog';
import { CalculatorDialog } from '@/components/calculator-dialog';
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
      
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-7xl">
        {/* Stats Section */}
        <section>
          <StatsCards stats={stats} />
        </section>
        
        {/* Actions Bar */}
        <section className="flex flex-wrap items-center gap-2 sm:gap-3">
          <TradeListDialog collection={collection} />
          <CalculatorDialog stats={stats} />
          <SyncCollectionDialog collection={collection} onImport={importCollection} />
          <div className="flex-1" />
          <ClearCollectionDialog onClear={clearAll} />
        </section>
        
        {/* Main Content - Stack on mobile, side by side on desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-[320px_1fr] gap-4 sm:gap-6">
          {/* Team Selector */}
          <aside className="lg:sticky lg:top-4 lg:self-start">
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
      </main>
      
      <Toaster />
    </div>
  );
}
