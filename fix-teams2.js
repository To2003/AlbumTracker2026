const fs = require('fs');

const content = fs.readFileSync('lib/album-data.ts', 'utf-8');

// The file has a syntax error around Uzbekistan and Colombia, so we can't just `require` it.
// Let's fix the syntax error first in the string.
let fixedContent = content.replace(/\{\s*\{\s*id:\s*'uzbekistan'/g, "  {\n    id: 'uzbekistan'");
fixedContent = fixedContent.replace(/\},\s*id:\s*'colombia'/g, "  },\n  {\n    id: 'colombia'");

const startIdx = fixedContent.indexOf('export const teams: Team[] = [');
const endIdx = fixedContent.indexOf('];\n\n// ─── SPECIAL SECTIONS');

let teamsStr = fixedContent.substring(startIdx + 'export const teams: Team[] = ['.length, endIdx);

// Let's save the cleaned teamsStr to evaluate it
fs.writeFileSync('temp-teams2.js', `
function makeStickers(code, players) { return players; }
const CONMEBOL = 'CONMEBOL';
const UEFA = 'UEFA';
const CONCACAF = 'CONCACAF';
const CAF = 'CAF';
const AFC = 'AFC';
const OFC = 'OFC';

const teams = [${teamsStr}];
module.exports = teams;
`);

const teams = require('./temp-teams2.js');

// Verify we have 48 teams
if (teams.length !== 48) {
  console.error('Error: Found ' + teams.length + ' teams, expected 48');
  process.exit(1);
}

// Group letters mapping for sorting
// We should check if the groups assigned in the file make sense for 48 teams.
// The user says: "busca que esten todos los jugadores con su respectivo numero de figurita en su respectivo equipo y Grupo"
// Let's sort teams by group, then by their current albumPage to maintain relative order within groups
teams.sort((a, b) => {
  if (a.group < b.group) return -1;
  if (a.group > b.group) return 1;
  return a.albumPage - b.albumPage;
});

// Reassign albumPage linearly starting from 8
let currentPage = 8;
teams.forEach(team => {
  team.albumPage = currentPage;
  currentPage += 2;
});

// Now rebuild the teams array source code
let finalTeamsStr = '\n';
let currentGroup = '';

teams.forEach(team => {
  if (team.group !== currentGroup) {
    currentGroup = team.group;
    finalTeamsStr += `\n  // ── GROUP ${currentGroup} ──────────────────────────────────────────────────────────────\n`;
  }
  
  // Create a nice formatting for the players array
  const players = team.stickers; // we mocked makeStickers to return the players array
  let playersStr = '';
  for (let i = 0; i < players.length; i += 4) {
    const chunk = players.slice(i, i + 4);
    playersStr += `      ` + chunk.map(p => `'${p}'`).join(', ') + (i + 4 < players.length || chunk.length === 4 ? ',' : '') + '\n';
  }

  // We need the unquoted variable name for confederation.
  // In our mock we used string values. We should output the constant name.
  // Luckily, the value equals the constant name ('UEFA', 'CONMEBOL', etc).

  const teamChunk = `  {
    id: '${team.id}', name: '${team.name}', code: '${team.code}',
    confederation: ${team.confederation}, group: '${team.group}', albumPage: ${team.albumPage},
    flag: '${team.flag}',
    stickers: makeStickers('${team.code}', [
${playersStr}    ]),
  },
`;
  finalTeamsStr += teamChunk;
});

// Now replace in the full file
let newContent = fixedContent.substring(0, startIdx + 'export const teams: Team[] = ['.length) + 
                 finalTeamsStr + 
                 fixedContent.substring(endIdx);

// Also fix the duplicate ALBUM_CONFIG at the end
const finalConfig = `
// ─── ALBUM CONFIG ─────────────────────────────────────────────────────────────

export const ALBUM_CONFIG = {
  totalStickers: 980,        // 48 teams × 20 + 9 intro (FWC) + 11 FIFA Museum = 980
  teamsCount: 48,
  stickersPerTeam: 20,       // 1 badge (foil) + 18 players + 1 team photo
  stickersPerPack: 7,
  specialStickers: 20,       // 9 intro + 11 FIFA Museum
  cocaColaStickers: 12,      // exclusive, found in Coke bottles
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

// Album stats
`;

const configStart = newContent.indexOf('// ─── ALBUM CONFIG ─────────────────────────────────────────────────────────────');
if (configStart !== -1) {
  newContent = newContent.substring(0, configStart) + finalConfig;
}

fs.writeFileSync('lib/album-data.ts', newContent);
console.log('Fixed album-data.ts!');
