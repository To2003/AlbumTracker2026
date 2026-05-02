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
}

const STORAGE_KEY = 'album-mundial-2026-collection';

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
export function calculateStats(collection: Record<string, number>): CollectionStats {
  const allStickers = getAllStickers();
  const total = ALBUM_CONFIG.totalStickers;
  
  let owned = 0;
  let duplicates = 0;
  
  Object.entries(collection).forEach(([, count]) => {
    if (count > 0) {
      owned++;
      if (count > 1) {
        duplicates += count - 1;
      }
    }
  });
  
  const missing = total - owned;
  const completionPercentage = (owned / total) * 100;
  
  // Estimate packs needed using probability (simplified model)
  // As you collect more, probability of getting new stickers decreases
  const estimatedPacksNeeded = estimatePacksNeeded(owned, total);
  const estimatedCost = estimatedPacksNeeded * ALBUM_CONFIG.packPrice;
  
  return {
    total,
    owned,
    missing,
    duplicates,
    completionPercentage,
    estimatedCost,
    estimatedPacksNeeded,
  };
}

// Estimate packs needed to complete album using coupon collector problem
function estimatePacksNeeded(currentOwned: number, total: number): number {
  if (currentOwned >= total) return 0;
  
  const stickersPerPack = ALBUM_CONFIG.stickersPerPack;
  let expectedStickers = 0;
  
  // For each remaining sticker, calculate expected stickers needed
  for (let i = currentOwned; i < total; i++) {
    // Probability of getting a new sticker
    const probNew = (total - i) / total;
    // Expected stickers to get one new
    expectedStickers += 1 / probNew;
  }
  
  return Math.ceil(expectedStickers / stickersPerPack);
}

// Custom hook for collection management
export function useCollection() {
  const [collection, setCollection] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load from localStorage on mount
  useEffect(() => {
    setCollection(getStoredCollection());
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
    saveCollection({});
  }, []);
  
  const stats = calculateStats(collection);
  
  return {
    collection,
    isLoaded,
    getCount,
    setCount,
    increment,
    decrement,
    toggle,
    clearAll,
    stats,
  };
}

// Generate trade list
export function generateTradeList(collection: Record<string, number>): {
  have: Array<{ stickerId: string; number: number; name: string; count: number }>;
  need: Array<{ stickerId: string; number: number; name: string }>;
} {
  const allStickers = getAllStickers();
  const have: Array<{ stickerId: string; number: number; name: string; count: number }> = [];
  const need: Array<{ stickerId: string; number: number; name: string }> = [];
  
  allStickers.forEach(sticker => {
    const count = collection[sticker.id] || 0;
    
    if (count === 0) {
      need.push({
        stickerId: sticker.id,
        number: sticker.number,
        name: sticker.name,
      });
    } else if (count > 1) {
      have.push({
        stickerId: sticker.id,
        number: sticker.number,
        name: sticker.name,
        count: count - 1, // Keep one, offer the rest
      });
    }
  });
  
  // Sort by sticker number
  have.sort((a, b) => a.number - b.number);
  need.sort((a, b) => a.number - b.number);
  
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
      text += `#${item.number} - ${item.name} (x${item.count})\n`;
    });
  }
  
  text += '\n🔍 NECESITO:\n';
  if (need.length === 0) {
    text += 'Album completo!\n';
  } else {
    need.forEach(item => {
      text += `#${item.number} - ${item.name}\n`;
    });
  }
  
  text += `\n📊 Resumen: Tengo ${ALBUM_CONFIG.totalStickers - need.length}/${ALBUM_CONFIG.totalStickers} (${((ALBUM_CONFIG.totalStickers - need.length) / ALBUM_CONFIG.totalStickers * 100).toFixed(1)}%)`;
  
  return text;
}
