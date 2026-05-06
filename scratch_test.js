const LZString = require('lz-string');

// Create a dummy collection (e.g. 500 random stickers with 1, some with 2)
const counts = Array.from({length: 992}, () => {
    const r = Math.random();
    if (r < 0.5) return 0;
    if (r < 0.9) return 1;
    return 2;
});

// Old method
const ids = Array.from({length: 992}, (_, i) => `ID${i}`);
const oldStr = ids.map((id, i) => counts[i] > 0 ? (counts[i] === 1 ? id : `${id}:${counts[i]}`) : null).filter(Boolean).join(',');
const oldComp = LZString.compressToEncodedURIComponent(oldStr);

// New method 1: Character map + LZString
const newStr1 = counts.map(c => Math.min(35, c).toString(36)).join('').replace(/0+$/, '');
const newComp1 = LZString.compressToEncodedURIComponent(newStr1);

// New method 2: RLE + Base36 + LZString?
// For simplicity, let's just test new method 1
console.log('Old length:', oldComp.length);
console.log('New length 1:', newComp1.length);
