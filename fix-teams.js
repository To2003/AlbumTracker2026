const fs = require('fs');
const content = fs.readFileSync('lib/album-data.ts', 'utf-8');

// The file has a syntax error around Uzbekistan and Colombia, so we can't just `require` it.
// Let's fix the syntax error first in the string.

let fixedContent = content.replace(/\{\s*\{\s*id:\s*'uzbekistan'/g, "  {\n    id: 'uzbekistan'");
fixedContent = fixedContent.replace(/\},\s*id:\s*'colombia'/g, "  },\n  {\n    id: 'colombia'");

// We want to extract the teams array.
// Instead of a full AST parser, we can use a trick: 
// we cut the file at `export const teams: Team[] = [` and `];\n\n// ─── SPECIAL SECTIONS`

const startIdx = fixedContent.indexOf('export const teams: Team[] = [');
const endIdx = fixedContent.indexOf('];\n\n// ─── SPECIAL SECTIONS');

let teamsStr = fixedContent.substring(startIdx + 'export const teams: Team[] = ['.length, endIdx);

// Let's save the cleaned teamsStr to evaluate it
fs.writeFileSync('temp-teams.js', `
function makeStickers(code, players) { return []; }
const CONMEBOL = 'CONMEBOL';
const UEFA = 'UEFA';
const CONCACAF = 'CONCACAF';
const CAF = 'CAF';
const AFC = 'AFC';
const OFC = 'OFC';

const teams = [${teamsStr}];
module.exports = teams;
`);

const teams = require('./temp-teams.js');

// Now we have the teams as JS objects.
// Let's sort them by group, then by their internal albumPage ordering
teams.sort((a, b) => {
  if (a.group < b.group) return -1;
  if (a.group > b.group) return 1;
  return a.albumPage - b.albumPage;
});

// Now update the albumPages to be perfectly sequential
let currentPage = 8;
teams.forEach(team => {
  team.albumPage = currentPage;
  currentPage += 2;
});

// We need the original strings for each team (to keep the `makeStickers` call and the flag emoji, and the players array).
// So let's extract the team source code chunks using regex.

const teamChunks = {};
const regex = /\{\s*id:\s*'([^']+)',[\s\S]*?\}\s*(?=,\s*\{|\s*$)/g;
let match;
while ((match = regex.exec(teamsStr)) !== null) {
  teamChunks[match[1]] = match[0];
}

// Rebuild the teams array string
let finalTeamsStr = '\n';
let currentGroup = '';

teams.forEach(team => {
  if (team.group !== currentGroup) {
    currentGroup = team.group;
    finalTeamsStr += `\n  // ── GROUP ${currentGroup} ──────────────────────────────────────────────────────────────\n`;
  }
  
  let chunk = teamChunks[team.id];
  // We need to update the albumPage in the chunk!
  chunk = chunk.replace(/albumPage:\s*\d+,/, `albumPage: ${team.albumPage},`);
  // And the group if it was wrong in the chunk (it shouldn't be, we sorted by the evaluated object's group)
  // Oh wait, did the user assign the right group in the object?
  // Let's rely on the object's group.
  chunk = chunk.replace(/group:\s*'[^']+',/, `group: '${team.group}',`);
  
  finalTeamsStr += `  ${chunk},\n`;
});

// Now replace in the full file
let newContent = fixedContent.substring(0, startIdx + 'export const teams: Team[] = ['.length) + 
                 finalTeamsStr + 
                 fixedContent.substring(endIdx);

// Let's also fix the duplicate ALBUM_CONFIG at the end
// We will just truncate everything after `// Album stats` and append the correct config.
// Wait, the file has two sections: `// ─── ALBUM CONFIG ───` at 753, and `export const ALBUM_CONFIG` again at 802.
// Let's replace everything from `// ─── ALBUM CONFIG ───` to the end.

const finalConfig = `
// ─── ALBUM CONFIG ─────────────────────────────────────────────────────────────

export const ALBUM_CONFIG = {
  totalStickers: 996,        // 48 teams × 20 + 9 intro (FWC) + 11 FIFA Museum + 16 stadiums (to be added) + 12 coca-cola = 996
  teamsCount: 48,
  stickersPerTeam: 20,       // 1 badge (foil) + 18 players + 1 team photo
  stickersPerPack: 7,
  packPrice: 1500, // ARS
  specialStickers: 36,       // 9 intro + 11 FIFA Museum + 16 stadiums
  cocaColaStickers: 12,      // exclusive, found in Coke bottles
  parallelVariants: ['Blue', 'Red', 'Purple', 'Green', 'Black'],
  parallels: {
    usa: ['Orange (Amazon exclusive)', 'Blue (1:2)', 'Red (1:25)', 'Purple (1:200)', 'Green (1:1400)', 'Black (1/1)'],
    iCollect: ['Gold Flood Crumple (6/pack)', 'Blue Crumple (1:2)', 'Red Crumple (1:26)', 'Purple Crumple (1:204)', 'Green Crumple (1:1529)', 'Black Crumple (1/1)'],
  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function getAllTeamStickers(): Sticker[] {
  return teams.flatMap(team => team.stickers);
}

export function getAllStickers(): Sticker[] {
  const teamStickers = getAllTeamStickers();
  const special = specialSections.flatMap(s => s.stickers);
  return [...teamStickers, ...special];
}

export function getTeamById(id: string): Team | undefined {
  return teams.find(t => t.id === id);
}

export function getTeamByCode(code: string): Team | undefined {
  return teams.find(t => t.code === code);
}

export function getTeamsByGroup(group: string): Team[] {
  return teams.filter(t => t.group === group);
}

export function getGroups(): string[] {
  return [...new Set(teams.map(t => t.group))].sort();
}
`;

const configStart = newContent.indexOf('// ─── ALBUM CONFIG ───');
if (configStart !== -1) {
  newContent = newContent.substring(0, configStart) + finalConfig;
}

fs.writeFileSync('lib/album-data.ts', newContent);
console.log('Fixed album-data.ts!');
