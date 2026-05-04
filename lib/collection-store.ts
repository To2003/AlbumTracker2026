'use client';

import { useEffect, useState, useCallback } from 'react';
import { ALBUM_CONFIG, getAllStickers } from './album-data';

export interface CollectionItem {
  stickerId: string;
  count: number; // 0 = don't have, 1 = have one, 2+ = have duplicates
}

export interface CollectionStats {
  total: number;
  owned: number;
  missing: number;
  duplicates: number;
  completionPercentage: number;
  estimatedCost: number;
  estimatedPacksNeeded: number;
  openedPacks: number;
}

const STORAGE_KEY = 'album-mundial-2026-collection';
const PACKS_STORAGE_KEY = 'album-mundial-2026-opened-packs';

// Get opened packs from localStorage
export function getStoredPacks(): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const stored = localStorage.getItem(PACKS_STORAGE_KEY);
    return stored ? parseInt(stored, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

// Save opened packs to localStorage
export function savePacks(packs: number): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(PACKS_STORAGE_KEY, packs.toString());
  } catch (error) {
    console.error('Failed to save packs:', error);
  }
}

// Get collection from localStorage
export function getStoredCollection(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Save collection to localStorage
export function saveCollection(collection: Record<string, number>): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
  } catch (error) {
    console.error('Failed to save collection:', error);
  }
}

// Calculate stats from collection
export function calculateStats(collection: Record<string, number>, openedPacks: number = 0): CollectionStats {
  const allStickers = getAllStickers();
  const total = ALBUM_CONFIG.totalStickers;
  
  let owned = 0;
  let duplicates = 0;
  
  Object.entries(collection).forEach(([id, count]) => {
    if (count > 0) {
      // Only count main stickers (not Coca-Cola extras) for the 980 total
      if (!id.startsWith('CC')) {
        owned++;
      }
      if (count > 1) {
        duplicates += count - 1;
      }
    }
  });
  
  const missing = total - owned;
  const completionPercentage = (owned / total) * 100;
  
  // Calculate minimum packs needed assuming no duplicates
  const estimatedPacksNeeded = Math.ceil(missing / ALBUM_CONFIG.stickersPerPack);
  const estimatedCost = estimatedPacksNeeded * ALBUM_CONFIG.packPrice;
  
  return {
    total,
    owned,
    missing,
    duplicates,
    completionPercentage,
    estimatedCost,
    estimatedPacksNeeded,
    openedPacks,
  };
}

// Custom hook for collection management
export function useCollection() {
  const [collection, setCollection] = useState<Record<string, number>>({});
  const [openedPacks, setOpenedPacks] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load from localStorage on mount
  useEffect(() => {
    setCollection(getStoredCollection());
    setOpenedPacks(getStoredPacks());
    setIsLoaded(true);
  }, []);
  
  const getCount = useCallback((stickerId: string): number => {
    return collection[stickerId] || 0;
  }, [collection]);
  
  const setCount = useCallback((stickerId: string, count: number) => {
    setCollection(prev => {
      const next = { ...prev, [stickerId]: Math.max(0, count) };
      saveCollection(next);
      return next;
    });
  }, []);
  
  const increment = useCallback((stickerId: string) => {
    setCollection(prev => {
      const next = { ...prev, [stickerId]: (prev[stickerId] || 0) + 1 };
      saveCollection(next);
      return next;
    });
  }, []);
  
  const decrement = useCallback((stickerId: string) => {
    setCollection(prev => {
      const next = { ...prev, [stickerId]: Math.max(0, (prev[stickerId] || 0) - 1) };
      saveCollection(next);
      return next;
    });
  }, []);
  
  const toggle = useCallback((stickerId: string) => {
    setCollection(prev => {
      const next = { ...prev, [stickerId]: prev[stickerId] ? 0 : 1 };
      saveCollection(next);
      return next;
    });
  }, []);
  
  const clearAll = useCallback(() => {
    setCollection({});
    setOpenedPacks(0);
    saveCollection({});
    savePacks(0);
  }, []);
  
  const importCollection = useCallback((newCollection: Record<string, number>, merge: boolean) => {
    setCollection(prev => {
      let next: Record<string, number>;
      if (merge) {
        next = { ...prev };
        for (const [id, count] of Object.entries(newCollection)) {
          if (typeof count === 'number' && count > 0) {
            next[id] = Math.max(next[id] || 0, count);
          }
        }
      } else {
        next = { ...newCollection };
      }
      saveCollection(next);
      return next;
    });
  }, []);
  
  const addPacks = useCallback((amount: number) => {
    setOpenedPacks(prev => {
      const next = Math.max(0, prev + amount);
      savePacks(next);
      return next;
    });
  }, []);
  
  const stats = calculateStats(collection, openedPacks);
  
  return {
    collection,
    isLoaded,
    getCount,
    setCount,
    increment,
    decrement,
    toggle,
    clearAll,
    importCollection,
    stats,
    addPacks,
  };
}

// Generate trade list
export function generateTradeList(collection: Record<string, number>): {
  have: Array<{ stickerId: string; stickerCode: string; name: string; count: number }>;
  need: Array<{ stickerId: string; stickerCode: string; name: string }>;
} {
  const allStickers = getAllStickers();
  const have: Array<{ stickerId: string; stickerCode: string; name: string; count: number }> = [];
  const need: Array<{ stickerId: string; stickerCode: string; name: string }> = [];
  
  allStickers.forEach(sticker => {
    const count = collection[sticker.id] || 0;
    
    if (count === 0) {
      // Don't add Coca-Cola to "need" list for the main album
      if (!sticker.id.startsWith('CC')) {
        need.push({
          stickerId: sticker.id,
          stickerCode: sticker.stickerCode,
          name: sticker.name,
        });
      }
    } else if (count > 1) {
      have.push({
        stickerId: sticker.id,
        stickerCode: sticker.stickerCode,
        name: sticker.name,
        count: count - 1, // Keep one, offer the rest
      });
    }
  });
  
  return { have, need };
}

// Format trade list as text
export function formatTradeListAsText(collection: Record<string, number>): string {
  const { have, need } = generateTradeList(collection);
  
  let text = '=== ALBUM MUNDIAL 2026 - LISTA DE INTERCAMBIO ===\n\n';
  
  text += '📦 TENGO PARA INTERCAMBIAR:\n';
  if (have.length === 0) {
    text += 'No tengo repetidas\n';
  } else {
    have.forEach(item => {
      text += `#${item.stickerCode} - ${item.name} (x${item.count})\n`;
    });
  }
  
  text += '\n🔍 NECESITO:\n';
  if (need.length === 0) {
    text += 'Album completo!\n';
  } else {
    need.forEach(item => {
      text += `#${item.stickerCode} - ${item.name}\n`;
    });
  }
  
  text += `\n📊 Resumen: Tengo ${ALBUM_CONFIG.totalStickers - need.length}/${ALBUM_CONFIG.totalStickers} (${((ALBUM_CONFIG.totalStickers - need.length) / ALBUM_CONFIG.totalStickers * 100).toFixed(1)}%)`;
  
  return text;
}
