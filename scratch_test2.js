const LZString = require('lz-string');

// Create a dummy collection (e.g. 500 random stickers with 1, some with 2)
const counts = Array.from({length: 992}, () => {
    const r = Math.random();
    if (r < 0.5) return 0;
    if (r < 0.9) return 1;
    return 2;
});

const newStr1 = "v2|" + counts.map(c => Math.min(35, c).toString(36)).join('').replace(/0+$/, '');
const newComp1 = LZString.compressToEncodedURIComponent(newStr1);

console.log('New length v2:', newComp1.length);
