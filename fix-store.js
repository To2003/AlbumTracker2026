const fs = require('fs');
let content = fs.readFileSync('lib/collection-store.ts', 'utf-8');

// Replace the useEffect save logic with synchronous saves inside the setters

// 1. Remove the second useEffect
content = content.replace(/\s*\/\/ Save to localStorage when collection changes[\s\S]*?\}, \[collection, isLoaded\]\);/g, '');

// 2. Modify setCount
content = content.replace(
  /const setCount = useCallback\(\(stickerId: string, count: number\) => \{\s*setCollection\(prev => \(\{\s*\.\.\.prev,\s*\[stickerId\]: Math\.max\(0, count\),\s*\}\)\);\s*\}, \[\]\);/g,
  `const setCount = useCallback((stickerId: string, count: number) => {
    setCollection(prev => {
      const next = { ...prev, [stickerId]: Math.max(0, count) };
      saveCollection(next);
      return next;
    });
  }, []);`
);

// 3. Modify increment
content = content.replace(
  /const increment = useCallback\(\(stickerId: string\) => \{\s*setCollection\(prev => \(\{\s*\.\.\.prev,\s*\[stickerId\]: \(prev\[stickerId\] \|\| 0\) \+ 1,\s*\}\)\);\s*\}, \[\]\);/g,
  `const increment = useCallback((stickerId: string) => {
    setCollection(prev => {
      const next = { ...prev, [stickerId]: (prev[stickerId] || 0) + 1 };
      saveCollection(next);
      return next;
    });
  }, []);`
);

// 4. Modify decrement
content = content.replace(
  /const decrement = useCallback\(\(stickerId: string\) => \{\s*setCollection\(prev => \(\{\s*\.\.\.prev,\s*\[stickerId\]: Math\.max\(0, \(prev\[stickerId\] \|\| 0\) - 1\),\s*\}\)\);\s*\}, \[\]\);/g,
  `const decrement = useCallback((stickerId: string) => {
    setCollection(prev => {
      const next = { ...prev, [stickerId]: Math.max(0, (prev[stickerId] || 0) - 1) };
      saveCollection(next);
      return next;
    });
  }, []);`
);

// 5. Modify toggle
content = content.replace(
  /const toggle = useCallback\(\(stickerId: string\) => \{\s*setCollection\(prev => \(\{\s*\.\.\.prev,\s*\[stickerId\]: prev\[stickerId\] \? 0 : 1,\s*\}\)\);\s*\}, \[\]\);/g,
  `const toggle = useCallback((stickerId: string) => {
    setCollection(prev => {
      const next = { ...prev, [stickerId]: prev[stickerId] ? 0 : 1 };
      saveCollection(next);
      return next;
    });
  }, []);`
);

// 6. Modify clearAll
content = content.replace(
  /const clearAll = useCallback\(\(\) => \{\s*setCollection\(\{\}\);\s*\}, \[\]\);/g,
  `const clearAll = useCallback(() => {
    setCollection({});
    saveCollection({});
  }, []);`
);

fs.writeFileSync('lib/collection-store.ts', content);
console.log('Fixed collection-store.ts');
