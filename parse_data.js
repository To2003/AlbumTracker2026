const fs = require('fs');
const rawData = fs.readFileSync('user_raw_data.txt', 'utf8').split('\n').map(l => l.trim()).filter(Boolean);

let teamsData = {};
let currentTeam = null;

// The raw data has teams starting with their name, followed by ID, then player name...
// We can just look for the pattern: TEAM_NAME, CODE-1, Emblem (TEAM_NAME)
let i = 0;
while (i < rawData.length) {
    let line = rawData[i];
    
    // We are looking for team headers, which are followed by CODE-1
    if (i + 1 < rawData.length && rawData[i+1].endsWith('-1')) {
        let code = rawData[i+1].split('-')[0];
        if (code !== 'FWC') {
            let teamName = line;
            let players = [];
            // Parse the 20 stickers for this team
            for (let j = 0; j < 20; j++) {
                let idLine = rawData[i + 1 + (j*2)];
                let nameLine = rawData[i + 2 + (j*2)];
                if (idLine === `${code}-${j+1}`) {
                    // Extract name without the " (TeamName)" suffix
                    let cleanName = nameLine.replace(new RegExp(` \\(${teamName}\\)$`, 'i'), '').trim();
                    players.push(cleanName);
                }
            }
            if (players.length === 20) {
                // Remove Emblem (index 0) and Team Photo (index 12)
                let actualPlayers = [];
                for(let k=1; k<12; k++) actualPlayers.push(players[k]);
                for(let k=13; k<20; k++) actualPlayers.push(players[k]);
                
                teamsData[code] = {
                    name: teamName,
                    players: actualPlayers
                };
            }
            i += 40; // skip the 20 stickers (40 lines)
            continue;
        }
    }
    i++;
}

// Now we need to modify lib/album-data.ts
let tsCode = fs.readFileSync('lib/album-data.ts', 'utf8');

// We will use a regex to replace the stickers array for each team.
// The structure in tsCode is:
// stickers: makeStickers('MEX', [ 'name1', 'name2', ... ])
for (const [code, data] of Object.entries(teamsData)) {
    const regex = new RegExp(`stickers:\\s*makeStickers\\('${code}',\\s*\\[([^\\]]*)\\]\\)`, 'g');
    
    // Format the new players array
    let playersStr = data.players.map(p => `'${p.replace(/'/g, "\\'")}'`).join(', ');
    
    // If it spans multiple lines, we can break it up, or just put it on one line
    tsCode = tsCode.replace(regex, `stickers: makeStickers('${code}', [
      ${playersStr}
    ])`);
    
    // Also try to update the team name if it was changed
    // id: 'mexico', name: 'Mexico', code: 'MEX'
    const nameRegex = new RegExp(`name:\\s*'[^']*',\\s*code:\\s*'${code}'`, 'g');
    tsCode = tsCode.replace(nameRegex, `name: '${data.name.replace(/'/g, "\\'")}', code: '${code}'`);
}

fs.writeFileSync('lib/album-data.ts', tsCode);
console.log('Successfully updated lib/album-data.ts');
