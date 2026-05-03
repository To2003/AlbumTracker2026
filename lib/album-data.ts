// World Cup 2026 Album Data — Panini Official
// 980 stickers total: 48 teams x 20 stickers + 9 Intro (FWC) + 11 FIFA Museum
// Sticker IDs use team code prefix (e.g. MEX1–MEX20), not sequential numbers
// Source: Checklist Insider / Football Cartophilic Info Exchange (verified April 2026)

export interface Team {
  id: string;
  name: string;
  code: string;
  confederation: string;
  group: string;      // A–L
  albumPage: number; // Página de inicio en el álbum físico
  flag: string;
  stickers: Sticker[];
}

export interface Sticker {
  id: string;         // e.g. "MEX1", "ARG15"
  stickerCode: string; // same, readable alias
  type: 'badge' | 'team-photo' | 'player';
  name: string;
  foil?: boolean;
}

export interface SpecialSection {
  id: string;
  name: string;
  stickers: Sticker[];
}

// Confederations
const CONMEBOL = 'CONMEBOL';
const UEFA = 'UEFA';
const CONCACAF = 'CONCACAF';
const CAF = 'CAF';
const AFC = 'AFC';
const OFC = 'OFC';

function makeStickers(
  code: string,
  players: string[], // 18 players
): Sticker[] {
  // Position 1 = badge (foil), position 13 = team photo, rest = players
  const stickers: Sticker[] = [];

  stickers.push({
    id: `${code}1`,
    stickerCode: `${code}-1`,
    type: 'badge',
    name: 'Emblem',
    foil: true,
  });

  // players 2–12 (11 players)
  for (let i = 0; i < 11; i++) {
    stickers.push({
      id: `${code}${i + 2}`,
      stickerCode: `${code}-${i + 2}`,
      type: 'player',
      name: players[i],
    });
  }

  stickers.push({
    id: `${code}13`,
    stickerCode: `${code}-13`,
    type: 'team-photo',
    name: 'Team Photo',
  });

  // players 14–20 (7 players)
  for (let i = 11; i < 18; i++) {
    stickers.push({
      id: `${code}${i + 3}`,
      stickerCode: `${code}-${i + 3}`,
      type: 'player',
      name: players[i],
    });
  }

  return stickers;
}

// ─── 48 TEAMS ───────────────────────────────────────────────────────────────

export const teams: Team[] = [

  // ── GROUP A ──────────────────────────────────────────────────────────────
  {
    id: 'mexico', name: 'Mexico', code: 'MEX',
    confederation: CONCACAF, group: 'A', albumPage: 8,
    flag: '🇲🇽',
    stickers: makeStickers('MEX', [
      'Luis Malagón', 'Johan Vásquez', 'Jorge Sánchez', 'César Montes', 'Jesús Gallardo', 'Israel Reyes', 'Diego Laínez', 'Carlos Rodríguez', 'Edson Álvarez', 'Orbelín Pineda', 'Marcel Ruiz', 'Érick Sánchez', 'Hirving Lozano', 'Santiago Giménez', 'Raúl Jiménez', 'Alexis Vega', 'Roberto Alvarado', 'César Huerta'
    ]),
  },
  {
    id: 'south-africa', name: 'South Africa', code: 'RSA',
    confederation: CAF, group: 'A', albumPage: 10,
    flag: '🇿🇦',
    stickers: makeStickers('RSA', [
      'Ronwen Williams', 'Sipho Chaine', 'Aubrey Modiba', 'Samukele Kabini', 'Mbekezeli Mbokazi', 'Khulumani Ndamane', 'Siyabonga Ngezana', 'Khuliso Mudau', 'Nkosinathi Sibisi', 'Teboho Mokoena', 'Thalente Mbatha', 'Bathusi Aubaas', 'Yaya Sithole', 'Sipho Mbule', 'Lyle Foster', 'Iqraam Rayners', 'Mohau Nkota', 'Oswin Appollis'
    ]),
  },
  {
    id: 'south-korea', name: 'Korea Republic', code: 'KOR',
    confederation: AFC, group: 'A', albumPage: 12,
    flag: '🇰🇷',
    stickers: makeStickers('KOR', [
      'Hyeon-woo Jo (South Korea)', 'Seung-gyu Kim (South Korea)', 'Min-jae Kim (South Korea)', 'Yoo-min Cho (South Korea)', 'Young-woo Seol (South Korea)', 'Han-beom Lee (South Korea)', 'Tae-seok Lee (South Korea)', 'Myung-jae Lee (South Korea)', 'Jae-sung Lee (South Korea)', 'In-beom Hwang (South Korea)', 'Kang-in Lee (South Korea)', 'Seung-ho Paik (South Korea)', 'Jens Castrop (South Korea)', 'Dong-kyung Lee (South Korea)', 'Gue-sung Cho (South Korea)', 'Heung-min Son (South Korea)', 'Hee-chan Hwang (South Korea)', 'Hyeon-gyu Oh (South Korea)'
    ]),
  },
  {
    id: 'czechia', name: 'Czechia', code: 'CZE',
    confederation: UEFA, group: 'A', albumPage: 14,
    flag: '🇨🇿',
    stickers: makeStickers('CZE', [
      'Matěj Kovář', 'Jindřich Staněk', 'Ladislav Krejčí', 'Vladimír Coufal', 'Jaroslav Zelený', 'Tomáš Holeš', 'David Zima', 'Michal Sadílek', 'Lukáš Provod', 'Lukáš Červ', 'Tomáš Souček', 'Pavel Šulc', 'Matěj Vydra', 'Vasil Kušej', 'Tomáš Chorý', 'Václav Černý', 'Adam Hložek', 'Patrik Schick'
    ]),
  },

  // ── GROUP B ──────────────────────────────────────────────────────────────
  {
    id: 'canada', name: 'Canada', code: 'CAN',
    confederation: CONCACAF, group: 'B', albumPage: 16,
    flag: '🇨🇦',
    stickers: makeStickers('CAN', [
      'Dayne St. Clair', 'Alphonso Davies', 'Alistair Johnston', 'Samuel Adekugbe', 'Richie Laryea', 'Derek Cornelius', 'Moïse Bombito', 'Kamal Miller', 'Stephen Eustáquio', 'Ismaël Koné', 'Jonathan Osorio', 'Jacob Shaffelburg', 'Mathieu Choinière', 'Niko Sigur', 'Tajon Buchanan', 'Liam Millar', 'Cyle Larin', 'Jonathan David'
    ]),
  },
  {
    id: 'bosnia', name: 'Bosnia and Herzegovina', code: 'BIH',
    confederation: UEFA, group: 'B', albumPage: 18,
    flag: '🇧🇦',
    stickers: makeStickers('BIH', [
      'Nikola Vasilj', 'Amer Dedić', 'Sead Kolašinac', 'Tarik Muharemović', 'Nihad Mujakić', 'Nikola Katić', 'Amir Hadžiahmetović', 'Benjamin Tahirović', 'Armin Gigović', 'Ivan Šunjić', 'Ivan Bašić', 'Dženis Burnić', 'Esmir Bajraktarević', 'Amar Memić', 'Ermedin Demirović', 'Edin Džeko', 'Samed Baždar', 'Haris Tabaković'
    ]),
  },
  {
    id: 'qatar', name: 'Qatar', code: 'QAT',
    confederation: AFC, group: 'B', albumPage: 20,
    flag: '🇶🇦',
    stickers: makeStickers('QAT', [
      'Meshaal Barsham', 'Sultan Al Brake', 'Lucas Mendes', 'Homam Ahmed', 'Boualem Khoukhi', 'Pedro Miguel', 'Tarek Salman', 'Mohamed Al-Mannai', 'Karim Boudiaf', 'Assim Madibo', 'Ahmed Fatehi', 'Mohammed Waad', 'Abdulaziz Hatem', 'Hassan Al-Haydos', 'Edmilson Junior', 'Akram Afif', 'Ahmed Al Ganehi', 'Almoez Ali'
    ]),
  },
  {
    id: 'switzerland', name: 'Switzerland', code: 'SUI',
    confederation: UEFA, group: 'B', albumPage: 22,
    flag: '🇨🇭',
    stickers: makeStickers('SUI', [
      'Gregor Kobel', 'Yvon Mvogo', 'Manuel Akanji', 'Ricardo Rodríguez', 'Nico Elvedi', 'Aurèle Amenda', 'Silvan Widmer', 'Granit Xhaka', 'Denis Zakaria', 'Remo Freuler', 'Fabian Rieder', 'Ardon Jashari', 'Johan Manzambi', 'Michel Aebischer', 'Breel Embolo', 'Rubén Vargas', 'Dan Ndoye', 'Zeki Amdouni'
    ]),
  },

  // ── GROUP C ──────────────────────────────────────────────────────────────
  {
    id: 'brazil', name: 'Brazil', code: 'BRA',
    confederation: CONMEBOL, group: 'C', albumPage: 24,
    flag: '🇧🇷',
    stickers: makeStickers('BRA', [
      'Alisson', 'Bento', 'Marquinhos', 'Éder Militão', 'Gabriel Magalhães', 'Danilo', 'Wesley', 'Lucas Paquetá', 'Casemiro', 'Bruno Guimarães', 'Luiz Henrique', 'Vinícius Júnior', 'Rodrygo', 'João Pedro', 'Matheus Cunha', 'Gabriel Martinelli', 'Raphinha', 'Estêvão'
    ]),
  },
  {
    id: 'morocco', name: 'Morocco', code: 'MAR',
    confederation: CAF, group: 'C', albumPage: 26,
    flag: '🇲🇦',
    stickers: makeStickers('MAR', [
      'Yassine Bounou', 'Munir El Kajoui', 'Achraf Hakimi', 'Noussair Mazraoui', 'Nayef Aguerd', 'Romain Saïss', 'Jawad El Yamiq', 'Adam Masina', 'Sofyan Amrabat', 'Azzedine Ounahi', 'Eliesse Ben Seghir', 'Bilal El Khannouss', 'Ismael Saibari', 'Youssef En-Nesyri', 'Abde Ezzalzouli', 'Soufiane Rahimi', 'Brahim Díaz', 'Ayoub El Kaabi'
    ]),
  },
  {
    id: 'haiti', name: 'Haiti', code: 'HAI',
    confederation: CONCACAF, group: 'C', albumPage: 28,
    flag: '🇭🇹',
    stickers: makeStickers('HAI', [
      'Johny Placide', 'Carlens Arcus', 'Martin Expérience', 'Jean-Kévin Duverne', 'Ricardo Adé', 'Duke Lacroix', 'Garven Metusala', 'Hannes Delcroix', 'Leverton Pierre', 'Danley Jean Jacques', 'Jean-Ricner Bellegarde', 'Christopher Attys', 'Derrick Etienne Jr.', 'Josué Casimir', 'Rubén Providence', 'Duckens Nazon', 'Louicius Deedson', 'Frantzdy Pierrot'
    ]),
  },
  {
    id: 'scotland', name: 'Scotland', code: 'SCO',
    confederation: UEFA, group: 'C', albumPage: 30,
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    stickers: makeStickers('SCO', [
      'Angus Gunn', 'Jack Hendry', 'Kieran Tierney', 'Aaron Hickey', 'Andrew Robertson', 'Scott McKenna', 'John Souttar', 'Anthony Ralston', 'Grant Hanley', 'Scott McTominay', 'Billy Gilmour', 'Lewis Ferguson', 'Ryan Christie', 'Kenny McLean', 'John McGinn', 'Lyndon Dykes', 'Che Adams', 'Ben Doak'
    ]),
  },

  // ── GROUP D ──────────────────────────────────────────────────────────────
  {
    id: 'usa', name: 'United States', code: 'USA',
    confederation: CONCACAF, group: 'D', albumPage: 32,
    flag: '🇺🇸',
    stickers: makeStickers('USA', [
      'Matt Freese', 'Chris Richards', 'Tim Ream', 'Mark McKenzie', 'Alex Freeman', 'Antonee Robinson', 'Tyler Adams', 'Tanner Tessmann', 'Weston McKennie', 'Christian Roldan', 'Timothy Weah', 'Diego Luna', 'Malik Tillman', 'Christian Pulisic', 'Brenden Aaronson', 'Ricardo Pepi', 'Haji Wright', 'Folarin Balogun'
    ]),
  },
  {
    id: 'paraguay', name: 'Paraguay', code: 'PAR',
    confederation: CONMEBOL, group: 'D', albumPage: 34,
    flag: '🇵🇾',
    stickers: makeStickers('PAR', [
      'Roberto Fernández', 'Orlando Gill', 'Gustavo Gómez', 'Fabián Balbuena', 'Juan José Cáceres', 'Omar Alderete', 'Junior Alonso', 'Mathías Villasanti', 'Diego Gómez', 'Damián Bobadilla', 'Andrés Cubas', 'Matías Galarza Fonda', 'Julio Enciso', 'Alejandro Romero Gamarra', 'Miguel Almirón', 'Ramón Sosa', 'Ángel Romero', 'Antonio Sanabria'
    ]),
  },
  {
    id: 'australia', name: 'Australia', code: 'AUS',
    confederation: AFC, group: 'D', albumPage: 36,
    flag: '🇦🇺',
    stickers: makeStickers('AUS', [
      'Mathew Ryan', 'Joe Gauci', 'Harry Souttar', 'Alessandro Circati', 'Jordan Bos', 'Aziz Behich', 'Cameron Burgess', 'Lewis Miller', 'Milos Degenek', 'Jackson Irvine', 'Riley McGree', 'Aiden O\'Neill', 'Connor Metcalfe', 'Patrick Yazbek', 'Craig Goodwin', 'Kusini Yengi', 'Nestory Irankunda', 'Mohamed Touré'
    ]),
  },
  {
    id: 'turkey', name: 'Türkiye', code: 'TUR',
    confederation: UEFA, group: 'D', albumPage: 38,
    flag: '🇹🇷',
    stickers: makeStickers('TUR', [
      'Uğurcan Çakır', 'Mert Müldür', 'Zeki Çelik', 'Abdülkerim Bardakcı', 'Çağlar Söyüncü', 'Merih Demiral', 'Ferdi Kadıoğlu', 'Kaan Ayhan', 'İsmail Yüksek', 'Hakan Çalhanoğlu', 'Orkun Kökçü', 'Arda Güler', 'İrfan Can Kahveci', 'Yunus Akgün', 'Can Uzun', 'Barış Alper Yılmaz', 'Kerem Aktürkoğlu', 'Kenan Yıldız'
    ]),
  },

  // ── GROUP E ──────────────────────────────────────────────────────────────
  {
    id: 'germany', name: 'Germany', code: 'GER',
    confederation: UEFA, group: 'E', albumPage: 40,
    flag: '🇩🇪',
    stickers: makeStickers('GER', [
      'Marc-André ter Stegen', 'Jonathan Tah', 'David Raum', 'Nico Schlotterbeck', 'Antonio Rüdiger', 'Waldemar Anton', 'Ridle Baku', 'Maximilian Mittelstädt', 'Joshua Kimmich', 'Florian Wirtz', 'Felix Nmecha', 'Leon Goretzka', 'Jamal Musiala', 'Serge Gnabry', 'Kai Havertz', 'Leroy Sané', 'Karim Adeyemi', 'Nick Woltemade'
    ]),
  },
  {
    id: 'curaçao', name: 'Curaçao', code: 'CUW',
    confederation: CONCACAF, group: 'E', albumPage: 42,
    flag: '🇨🇼',
    stickers: makeStickers('CUW', [
      'Eloy Room', 'Armando Obispo', 'Sherel Floranus', 'Jurien Gaari', 'Joshua Brenet', 'Roshon van Eijma', 'Shurandy Sambo', 'Livano Comenencia', 'Godfried Roemeratoe', 'Juninho Bacuna', 'Leandro Bacuna', 'Tahith Chong', 'Kenji Gorré', 'Jearl Margaritha', 'Jürgen Locadia', 'Jeremy Antonisse', 'Gervane Kastaneer', 'Sontje Hansen'
    ]),
  },
  {
    id: 'ivory-coast', name: 'Ivory Coast', code: 'CIV',
    confederation: CAF, group: 'E', albumPage: 44,
    flag: '🇨🇮',
    stickers: makeStickers('CIV', [
      'Yahia Fofana', 'Ghislain Konan', 'Wilfried Singo', 'Odilon Kossounou', 'Evan Ndicka', 'Willy Boly', 'Emmanuel Agbadou', 'Ousmane Diomande', 'Franck Kessié', 'Seko Fofana', 'Ibrahim Sangaré', 'Jean-Philippe Gbamin', 'Amad Diallo', 'Sébastien Haller', 'Simon Adingra', 'Yan Diomandé', 'Evann Guessand', 'Oumar Diakité'
    ]),
  },
  {
    id: 'ecuador', name: 'Ecuador', code: 'ECU',
    confederation: CONMEBOL, group: 'E', albumPage: 46,
    flag: '🇪🇨',
    stickers: makeStickers('ECU', [
      'Hernán Galíndez', 'Gonzalo Valle', 'Piero Hincapié', 'Pervis Estupiñán', 'Willian Pacho', 'Ángelo Preciado', 'Joel Ordóñez', 'Moisés Caicedo', 'Alan Franco', 'Kendry Páez', 'Pedro Vite', 'John Yeboah', 'Leonardo Campana', 'Gonzalo Plata', 'Nilson Angulo', 'Alan Minda', 'Kevin Rodríguez', 'Enner Valencia'
    ]),
  },

  // ── GROUP F ──────────────────────────────────────────────────────────────
  {
    id: 'netherlands', name: 'Netherlands', code: 'NED',
    confederation: UEFA, group: 'F', albumPage: 48,
    flag: '🇳🇱',
    stickers: makeStickers('NED', [
      'Bart Verbruggen', 'Virgil van Dijk', 'Micky van de Ven', 'Jurrien Timber', 'Denzel Dumfries', 'Nathan Aké', 'Jeremie Frimpong', 'Jan Paul van Hecke', 'Tijjani Reijnders', 'Ryan Gravenberch', 'Teun Koopmeiners', 'Frenkie de Jong', 'Xavi Simons', 'Justin Kluivert', 'Memphis Depay', 'Donyell Malen', 'Wout Weghorst', 'Cody Gakpo'
    ]),
  },
  {
    id: 'japan', name: 'Japan', code: 'JPN',
    confederation: AFC, group: 'F', albumPage: 50,
    flag: '🇯🇵',
    stickers: makeStickers('JPN', [
      'Zion Suzuki', 'Henry Heroki Mochizuki', 'Ayumu Seko', 'Junnosuke Suzuki', 'Shogo Taniguchi', 'Tsuyoshi Watanabe', 'Kaishu Sano', 'Yuki Soma', 'Ao Tanaka', 'Daichi Kamada', 'Takefusa Kubo', 'Ritsu Dōan', 'Keito Nakamura', 'Takumi Minamino', 'Shuto Machino', 'Junya Ito', 'Koki Ogawa', 'Ayase Ueda'
    ]),
  },
  {
    id: 'sweden', name: 'Sweden', code: 'SWE',
    confederation: UEFA, group: 'F', albumPage: 52,
    flag: '🇸🇪',
    stickers: makeStickers('SWE', [
      'Victor Johansson', 'Isak Hien', 'Gabriel Gudmundsson', 'Emil Holm', 'Victor Nilsson Lindelöf', 'Gustaf Lagerbielke', 'Lucas Bergvall', 'Hugo Larsson', 'Jesper Karlström', 'Yasin Ayari', 'Mattias Svanberg', 'Daniel Svensson', 'Ken Sema', 'Roony Bardghji', 'Dejan Kulusevski', 'Anthony Elanga', 'Alexander Isak', 'Viktor Gyökeres'
    ]),
  },
  {
    id: 'tunisia', name: 'Tunisia', code: 'TUN',
    confederation: CAF, group: 'F', albumPage: 54,
    flag: '🇹🇳',
    stickers: makeStickers('TUN', [
      'Béchir Ben Saïd', 'Aymen Dahmen', 'Van Valery', 'Montassar Talbi', 'Yassine Meriah', 'Ali Abdi', 'Dylan Bronn', 'Ellyes Skhiri', 'Aïssa Laïdouni', 'Ferjani Sassi', 'Mohamed Ali Ben Romdhane', 'Hannibal Mejbri', 'Elias Achouri', 'Elias Saad', 'Hazem Mastouri', 'Ismaël Gharbi', 'Sayfallah Ltaief', 'Naïm Sliti'
    ]),
  },

  // ── GROUP G ──────────────────────────────────────────────────────────────
  {
    id: 'belgium', name: 'Belgium', code: 'BEL',
    confederation: UEFA, group: 'G', albumPage: 56,
    flag: '🇧🇪',
    stickers: makeStickers('BEL', [
      'Thibaut Courtois', 'Arthur Theate', 'Timothy Castagne', 'Zeno Debast', 'Brandon Mechele', 'Maxim De Cuyper', 'Thomas Meunier', 'Youri Tielemans', 'Amadou Onana', 'Nicolas Raskin', 'Alexis Saelemaekers', 'Hans Vanaken', 'Kevin De Bruyne', 'Jérémy Doku', 'Charles De Ketelaere', 'Leandro Trossard', 'Loïs Openda', 'Romelu Lukaku'
    ]),
  },
  {
    id: 'egypt', name: 'Egypt', code: 'EGY',
    confederation: CAF, group: 'G', albumPage: 58,
    flag: '🇪🇬',
    stickers: makeStickers('EGY', [
      'Mohamed El Shenawy', 'Mohamed Hany', 'Mohamed Hamdy', 'Yasser Ibrahim', 'Khaled Sobhi', 'Ramy Rabia', 'Hossam Abdelmaguid', 'Ahmed Fattouh', 'Marwan Attia', 'Zizo', 'Hamdy Fathy', 'Mohamed Magdy', 'Emam Ashour', 'Osama Faisal', 'Mohamed Salah', 'Mostafa Mohamed', 'Trézéguet', 'Omar Marmoush'
    ]),
  },
  {
    id: 'iran', name: 'Iran', code: 'IRN',
    confederation: AFC, group: 'G', albumPage: 60,
    flag: '🇮🇷',
    stickers: makeStickers('IRN', [
      'Alireza Beiranvand', 'Morteza Pouraliganji', 'Ehsan Hajsafi', 'Milad Mohammadi', 'Shojae Khalilzadeh', 'Ramin Rezaeian', 'Hossein Kanaani', 'Sadegh Moharrami', 'Saleh Hardani', 'Saeed Ezatolahi', 'Saman Ghoddos', 'Omid Noorafkan', 'Roozbeh Cheshmi', 'Mohammad Mohebi', 'Sardar Azmoun', 'Mehdi Taremi', 'Alireza Jahanbakhsh', 'Ali Gholizadeh'
    ]),
  },
  {
    id: 'new-zealand', name: 'New Zealand', code: 'NZL',
    confederation: OFC, group: 'G', albumPage: 62,
    flag: '🇳🇿',
    stickers: makeStickers('NZL', [
      'Max Crocombe', 'Alex Paulsen', 'Michael Boxall', 'Liberato Cacace', 'Tim Payne', 'Tyler Bindon', 'Francis de Vries', 'Finn Surman', 'Joe Bell', 'Sarpreet Singh', 'Ryan Thomas', 'Matthew Garbett', 'Marko Stamenić', 'Ben Old', 'Chris Wood', 'Elijah Just', 'Callum McCowatt', 'Kosta Barbarouses'
    ]),
  },

  // ── GROUP H ──────────────────────────────────────────────────────────────
  {
    id: 'spain', name: 'Spain', code: 'ESP',
    confederation: UEFA, group: 'H', albumPage: 64,
    flag: '🇪🇸',
    stickers: makeStickers('ESP', [
      'Unai Simón', 'Robin Le Normand', 'Aymeric Laporte', 'Dean Huijsen', 'Pedro Porro', 'Dani Carvajal', 'Marc Cucurella', 'Martín Zubimendi', 'Rodri', 'Pedri', 'Fabián Ruiz', 'Mikel Merino', 'Lamine Yamal', 'Dani Olmo', 'Nico Williams', 'Ferran Torres', 'Álvaro Morata', 'Mikel Oyarzabal'
    ]),
  },
  {
    id: 'cape-verde', name: 'Cape Verde', code: 'CPV',
    confederation: CAF, group: 'H', albumPage: 66,
    flag: '🇨🇻',
    stickers: makeStickers('CPV', [
      'Vozinha', 'Logan Costa', 'Pico', 'Diney', 'Steven Moreira', 'Wagner Pina', 'João Paulo', 'Yannick Semedo', 'Kevin Pina', 'Patrick Andrade', 'Jamiro Monteiro', 'Deroy Duarte', 'Garry Rodrigues', 'Jovane Cabral', 'Ryan Mendes', 'Dailon Livramento', 'Willy Semedo', 'Bebé'
    ]),
  },
  {
    id: 'saudi-arabia', name: 'Saudi Arabia', code: 'KSA',
    confederation: AFC, group: 'H', albumPage: 68,
    flag: '🇸🇦',
    stickers: makeStickers('KSA', [
      'Nawaf Alaqidi', 'Abdulrahman Al-Sanbi', 'Saud Abdulhamid', 'Nawaf Boushal', 'Jihad Thakri', 'Moteb Al-Harbi', 'Hassan Al-Tambakti', 'Musab Al-Juwayr', 'Ziyad Al-Johani', 'Abdullah Al-Khaibari', 'Nasser Al-Dawsari', 'Saleh Abu Al-Shamat', 'Marwan Al-Sahafi', 'Salem Al-Dawsari', 'Abdulrahman Al-Aboud', 'Firas Al-Buraikan', 'Saleh Al-Shehri', 'Abdullah Al-Hamdan'
    ]),
  },
  {
    id: 'uruguay', name: 'Uruguay', code: 'URU',
    confederation: CONMEBOL, group: 'H', albumPage: 70,
    flag: '🇺🇾',
    stickers: makeStickers('URU', [
      'Sergio Rochet', 'Santiago Mele', 'Ronald Araújo', 'José María Giménez', 'Sebastián Cáceres', 'Mathías Olivera', 'Guillermo Varela', 'Nahitan Nández', 'Federico Valverde', 'Giorgian De Arrascaeta', 'Rodrigo Bentancur', 'Manuel Ugarte', 'Nicolás de la Cruz', 'Maxi Araújo', 'Darwin Núñez', 'Federico Viñas', 'Rodrigo Aguirre', 'Facundo Pellistri'
    ]),
  },

  // ── GROUP I ──────────────────────────────────────────────────────────────
  {
    id: 'france', name: 'France', code: 'FRA',
    confederation: UEFA, group: 'I', albumPage: 72,
    flag: '🇫🇷',
    stickers: makeStickers('FRA', [
      'Mike Maignan', 'Theo Hernández', 'William Saliba', 'Jules Koundé', 'Ibrahima Konaté', 'Dayot Upamecano', 'Lucas Digne', 'Aurélien Tchouaméni', 'Eduardo Camavinga', 'Manu Koné', 'Adrien Rabiot', 'Michael Olise', 'Ousmane Dembélé', 'Bradley Barcola', 'Désiré Doué', 'Kingsley Coman', 'Hugo Ekitike', 'Kylian Mbappé'
    ]),
  },
  {
    id: 'senegal', name: 'Senegal', code: 'SEN',
    confederation: CAF, group: 'I', albumPage: 74,
    flag: '🇸🇳',
    stickers: makeStickers('SEN', [
      'Édouard Mendy', 'Yehvann Diouf', 'Moussa Niakhaté', 'Abdoulaye Seck', 'Ismaïl Jakobs', 'El Hadji Malick Diouf', 'Kalidou Koulibaly', 'Idrissa Gana Gueye', 'Pape Matar Sarr', 'Pape Gueye', 'Habib Diarra', 'Lamine Camara', 'Sadio Mané', 'Ismaïla Sarr', 'Boulaye Dia', 'Iliman Ndiaye', 'Nicolas Jackson', 'Krépin Diatta'
    ]),
  },
  {
    id: 'iraq', name: 'Iraq', code: 'IRQ',
    confederation: AFC, group: 'I', albumPage: 76,
    flag: '🇮🇶',
    stickers: makeStickers('IRQ', [
      'Jalal Hassan', 'Rebin Sulaka', 'Hussein Ali', 'Akam Hashim', 'Merchas Doski', 'Zaid Tahseen', 'Manaf Younis', 'Zidane Iqbal', 'Amir Al-Ammari', 'Ibrahim Bayesh', 'Ali Jasim', 'Youssef Amyn', 'Aimar Sher', 'Marko Farji', 'Osama Rashid', 'Ali Al-Hamadi', 'Aymen Hussein', 'Mohanad Ali'
    ]),
  },
  {
    id: 'norway', name: 'Norway', code: 'NOR',
    confederation: UEFA, group: 'I', albumPage: 78,
    flag: '🇳🇴',
    stickers: makeStickers('NOR', [
      'Ørjan Nyland', 'Julian Ryerson', 'Leo Østigård', 'Kristoffer Vassbakk Ajer', 'Marcus Holmgren Pedersen', 'David Møller Wolfe', 'Torbjørn Heggem', 'Morten Thorsby', 'Martin Ødegaard', 'Sander Berge', 'Andreas Schjelderup', 'Patrick Berg', 'Erling Haaland', 'Alexander Sørloth', 'Aron Dønnum', 'Jørgen Strand Larsen', 'Antonio Nusa', 'Oscar Bobb'
    ]),
  },

  // ── GROUP J ──────────────────────────────────────────────────────────────
  {
    id: 'argentina', name: 'Argentina', code: 'ARG',
    confederation: CONMEBOL, group: 'J', albumPage: 80,
    flag: '🇦🇷',
    stickers: makeStickers('ARG', [
      'Emiliano Martínez', 'Nahuel Molina', 'Cristian Romero', 'Nicolás Otamendi', 'Nicolás Tagliafico', 'Leonardo Balerdi', 'Enzo Fernández', 'Alexis Mac Allister', 'Rodrigo De Paul', 'Exequiel Palacios', 'Leandro Paredes', 'Nico Paz', 'Franco Mastantuono', 'Nico González', 'Lionel Messi', 'Lautaro Martínez', 'Julián Álvarez', 'Giuliano Simeone'
    ]),
  },
  {
    id: 'algeria', name: 'Algeria', code: 'ALG',
    confederation: CAF, group: 'J', albumPage: 82,
    flag: '🇩🇿',
    stickers: makeStickers('ALG', [
      'Alexis Guendouz', 'Ramy Bensebaini', 'Youcef Atal', 'Rayan Aït-Nouri', 'Mohamed Amine Tougai', 'Aïssa Mandi', 'Ismael Bennacer', 'Houssem Aouar', 'Hicham Boudaoui', 'Ramiz Zerrouki', 'Nabil Bentaleb', 'Farés Chaibi', 'Riyad Mahrez', 'Saïd Benrahma', 'Anis Hadj Moussa', 'Amine Gouiri', 'Baghdad Bounedjah', 'Mohammed Amoura'
    ]),
  },
  {
    id: 'austria', name: 'Austria', code: 'AUT',
    confederation: UEFA, group: 'J', albumPage: 84,
    flag: '🇦🇹',
    stickers: makeStickers('AUT', [
      'Alexander Schlager', 'Patrick Pentz', 'David Alaba', 'Kevin Danso', 'Philipp Lienhart', 'Stefan Posch', 'Philipp Mwene', 'Alexander Prass', 'Xaver Schlager', 'Marcel Sabitzer', 'Konrad Laimer', 'Florian Grillitsch', 'Nicolas Seiwald', 'Romano Schmid', 'Patrick Wimmer', 'Christoph Baumgartner', 'Michael Gregoritsch', 'Marko Arnautović'
    ]),
  },
  {
    id: 'jordan', name: 'Jordan', code: 'JOR',
    confederation: AFC, group: 'J', albumPage: 86,
    flag: '🇯🇴',
    stickers: makeStickers('JOR', [
      'Yazeed Abulaila', 'Ihsan Haddad', 'Mohammad Abu Hashish', 'Yazan Al-Arab', 'Abdallah Nasib', 'Saleem Obaid', 'Mohammad Abualnadi', 'Ibrahim Saadeh', 'Nizar Al-Rashdan', 'Noor Al-Rawabdeh', 'Mohannad Abu Taha', 'Amer Jamous', 'Mousa Al-Taamari', 'Yazan Al-Naimat', 'Mahmoud Al-Mardi', 'Ali Olwan', 'Mohammad Abu Zrayq', 'Ibrahim Sabra'
    ]),
  },

  // ── GROUP K ──────────────────────────────────────────────────────────────
  {
    id: 'portugal', name: 'Portugal', code: 'POR',
    confederation: UEFA, group: 'K', albumPage: 88,
    flag: '🇵🇹',
    stickers: makeStickers('POR', [
      'Diogo Costa', 'José Sá', 'Rúben Dias', 'João Cancelo', 'Diogo Dalot', 'Nuno Mendes', 'Gonçalo Inácio', 'Bernardo Silva', 'Bruno Fernandes', 'Rúben Neves', 'Vitinha', 'João Neves', 'Cristiano Ronaldo', 'Francisco Trincão', 'João Félix', 'Gonçalo Ramos', 'Pedro Neto', 'Rafael Leão'
    ]),
  },
  {
    id: 'congo-dr', name: 'Congo DR', code: 'COD',
    confederation: CAF, group: 'K', albumPage: 90,
    flag: '🇨🇩',
    stickers: makeStickers('COD', [
      'Lionel Mpasi', 'Aaron Wan-Bissaka', 'Axel Tuanzebe', 'Arthur Masuaku', 'Chancel Mbemba', 'Joris Kayembe', 'Charles Pickel', 'Ngal\'ayel Mukau', 'Edo Kayembe', 'Samuel Moutoussamy', 'Noah Sadiki', 'Théo Bongonda', 'Meschak Elia', 'Yoane Wissa', 'Brian Cipenga', 'Fiston Mayele', 'Cédric Bakambu', 'Nathanaël Mbuku'
    ]),
  },
  {
    id: 'uzbekistan', name: 'Uzbekistan', code: 'UZB',
    confederation: AFC, group: 'K', albumPage: 92,
    flag: '🇺🇿',
    stickers: makeStickers('UZB', [
      'Otkir Yusupov', 'Farrukh Sayfiev', 'Sherzod Nasrullaev', 'Otabek Shukurov', 'Husniddin Aliqulov', 'Rustamjon Ashurmatov', 'Khojiakbar Alijonov', 'Abdukodir Khusanov', 'Odiljon Hamrobekov', 'Otabek Shukurov', 'Jamshid Iskanderov', 'Azizbek Turgunboev', 'Khojimat Erkinov', 'Eldor Shomurodov', 'Oston Urunov', 'Jaloliddin Masharipov', 'Igor Sergeev', 'Abbosbek Fayzullaev'
    ]),
  },
  {
    id: 'colombia', name: 'Colombia', code: 'COL',
    confederation: CONMEBOL, group: 'K', albumPage: 94,
    flag: '🇨🇴',
    stickers: makeStickers('COL', [
      'Camilo Vargas', 'David Ospina', 'Dávinson Sánchez', 'Yerry Mina', 'Daniel Muñoz', 'Johan Mojica', 'Jhon Lucumí', 'Santiago Arias', 'Jefferson Lerma', 'Kevin Castaño', 'Richard Ríos', 'James Rodríguez', 'Juan Fernando Quintero', 'Jorge Carrascal', 'Jhon Arias', 'Jhon Córdoba', 'Luis Suárez', 'Luis Díaz'
    ]),
  },

  // ── GROUP L ──────────────────────────────────────────────────────────────
  {
    id: 'england', name: 'England', code: 'ENG',
    confederation: UEFA, group: 'L', albumPage: 96,
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    stickers: makeStickers('ENG', [
      'Jordan Pickford', 'John Stones', 'Marc Guéhi', 'Ezri Konsa', 'Trent Alexander-Arnold', 'Reece James', 'Dan Burn', 'Jordan Henderson', 'Declan Rice', 'Jude Bellingham', 'Cole Palmer', 'Morgan Rogers', 'Anthony Gordon', 'Phil Foden', 'Bukayo Saka', 'Harry Kane', 'Marcus Rashford', 'Ollie Watkins'
    ]),
  },
  {
    id: 'croatia', name: 'Croatia', code: 'CRO',
    confederation: UEFA, group: 'L', albumPage: 98,
    flag: '🇭🇷',
    stickers: makeStickers('CRO', [
      'Dominik Livaković', 'Duško Ćaleta-Car', 'Joško Gvardiol', 'Josip Stanišić', 'Luka Vušković', 'Josip Šutalo', 'Kristijan Jakić', 'Luka Modrić', 'Mateo Kovačić', 'Martin Baturina', 'Lovro Majer', 'Mario Pašalić', 'Petar Sučić', 'Ivan Perišić', 'Marco Pašalić', 'Ante Budimir', 'Andrej Kramarić', 'Franjo Ivanović'
    ]),
  },
  {
    id: 'ghana', name: 'Ghana', code: 'GHA',
    confederation: CAF, group: 'L', albumPage: 100,
    flag: '🇬🇭',
    stickers: makeStickers('GHA', [
      'Lawrence Ati-Zigi', 'Tariq Lamptey', 'Mohammed Salisu', 'Alidu Seidu', 'Alexander Djiku', 'Gideon Mensah', 'Caleb Yirenkyi', 'Abdul Fatawu Issahaku', 'Thomas Partey', 'Salis Abdul Samed', 'Kamaldeen Sulemana', 'Mohammed Kudus', 'Iñaki Williams', 'Jordan Ayew', 'André Ayew', 'Joseph Paintsil', 'Osman Bukari', 'Antoine Semenyo'
    ]),
  },
  {
    id: 'panama', name: 'Panama', code: 'PAN',
    confederation: CONCACAF, group: 'L', albumPage: 102,
    flag: '🇵🇦',
    stickers: makeStickers('PAN', [
      'Orlando Mosquera', 'Luis Mejía', 'Fidel Escobar', 'Andrés Andrade', 'Michael Amir Murillo', 'Eric Davis', 'José Córdoba', 'César Blackman', 'Cristian Martínez', 'Aníbal Godoy', 'Adalberto Carrasquilla', 'Édgar Bárcenas', 'Carlos Harvey', 'Ismael Díaz', 'José Fajardo', 'Cecilio Waterman', 'José Luis Rodríguez', 'Alberto Quintero'
    ]),
  },
];

// ─── SPECIAL SECTIONS ────────────────────────────────────────────────────────

export const introSection: SpecialSection = {
  id: 'intro',
  name: 'Introducción / FIFA World Cup',
  stickers: [
    { id: '00', stickerCode: '00', type: 'badge', name: 'Panini Logo', foil: true },
    { id: 'FWC1', stickerCode: 'FWC-1', type: 'badge', name: 'Official Emblem - Part 1', foil: true },
    { id: 'FWC2', stickerCode: 'FWC-2', type: 'badge', name: 'Official Emblem - Part 2', foil: true },
    { id: 'FWC3', stickerCode: 'FWC-3', type: 'badge', name: 'Official Mascots', foil: true },
    { id: 'FWC4', stickerCode: 'FWC-4', type: 'badge', name: 'Official Slogan', foil: true },
    { id: 'FWC5', stickerCode: 'FWC-5', type: 'badge', name: 'Official Ball', foil: true },
    { id: 'FWC6', stickerCode: 'FWC-6', type: 'badge', name: 'Canada (Host Country Emblem)', foil: true },
    { id: 'FWC7', stickerCode: 'FWC-7', type: 'badge', name: 'Mexico (Host Country Emblem)', foil: true },
    { id: 'FWC8', stickerCode: 'FWC-8', type: 'badge', name: 'USA (Host Country Emblem)', foil: true },
  ],
};

export const fifaMuseumSection: SpecialSection = {
  id: 'fifa-museum',
  name: 'FIFA Museum — World Cup Champions',
  stickers: [
    { id: 'FWC9', stickerCode: 'FWC-9', type: 'team-photo', name: 'Team Photo (Italy 1934) - FIFA World Cup Italy 1934' },
    { id: 'FWC10', stickerCode: 'FWC-10', type: 'team-photo', name: 'Team Photo (Uruguay 1950) - FIFA World Cup Brazil 1950' },
    { id: 'FWC11', stickerCode: 'FWC-11', type: 'team-photo', name: 'Team Photo (West Germany 1954) - FIFA World Cup Switzerland 1954' },
    { id: 'FWC12', stickerCode: 'FWC-12', type: 'team-photo', name: 'Team Photo (Brazil 1962) - FIFA World Cup Chile 1962' },
    { id: 'FWC13', stickerCode: 'FWC-13', type: 'team-photo', name: 'Team Photo (West Germany 1974) - FIFA World Cup 1974' },
    { id: 'FWC14', stickerCode: 'FWC-14', type: 'team-photo', name: 'Team Photo (Argentina 1986) - FIFA World Cup Mexico 1986' },
    { id: 'FWC15', stickerCode: 'FWC-15', type: 'team-photo', name: 'Team Photo (Brazil 1994) - FIFA World Cup USA 1994' },
    { id: 'FWC16', stickerCode: 'FWC-16', type: 'team-photo', name: 'Team Photo (Brazil 2002) - FIFA World Cup Korea/Japan 2002' },
    { id: 'FWC17', stickerCode: 'FWC-17', type: 'team-photo', name: 'Team Photo (Italy 2006) - FIFA World Cup Germany 2006' },
    { id: 'FWC18', stickerCode: 'FWC-18', type: 'team-photo', name: 'Team Photo (Germany 2014) - FIFA World Cup Brazil 2014' },
    { id: 'FWC19', stickerCode: 'FWC-19', type: 'team-photo', name: 'Team Photo (Argentina 2022) - FIFA World Cup Qatar 2022' },
  ],
};

// Coca-Cola exclusive stickers (found in Coke bottles, not regular packs)
export const cocaColaSection: SpecialSection = {
  id: 'coca-cola',
  name: 'Coca-Cola Collection (exclusivo botellas)',
  stickers: [
    { id: 'CC1', stickerCode: 'CC-1', type: 'player', name: 'Lamine Yamal (España)' },
    { id: 'CC2', stickerCode: 'CC-2', type: 'player', name: 'Joshua Kimmich (Alemania)' },
    { id: 'CC3', stickerCode: 'CC-3', type: 'player', name: 'Harry Kane (Inglaterra)' },
    { id: 'CC4', stickerCode: 'CC-4', type: 'player', name: 'Santiago Giménez (México)' },
    { id: 'CC5', stickerCode: 'CC-5', type: 'player', name: 'Antonee Robinson (USA)' },
    { id: 'CC6', stickerCode: 'CC-6', type: 'player', name: 'Jefferson Lerma (Colombia)' },
    { id: 'CC7', stickerCode: 'CC-7', type: 'player', name: 'Edson Álvarez (México)' },
    { id: 'CC8', stickerCode: 'CC-8', type: 'player', name: 'Virgil van Dijk (Países Bajos)' },
    { id: 'CC9', stickerCode: 'CC-9', type: 'player', name: 'Alphonso Davies (Canadá)' },
    { id: 'CC10', stickerCode: 'CC-10', type: 'player', name: 'Weston McKennie (USA)' },
    { id: 'CC11', stickerCode: 'CC-11', type: 'player', name: 'Lautaro Martínez (Argentina)' },
    { id: 'CC12', stickerCode: 'CC-12', type: 'player', name: 'Gabriel Magalhães (Brasil)' },
  ],
};

export const specialSections: SpecialSection[] = [
  introSection,
  fifaMuseumSection,
  cocaColaSection,
];


// ─── ALBUM CONFIG ─────────────────────────────────────────────────────────────

export const ALBUM_CONFIG = {
  totalStickers: 980,        // 48 teams × 20 + 9 intro (FWC) + 11 FIFA Museum = 980
  teamsCount: 48,
  stickersPerTeam: 20,       // 1 badge (foil) + 18 players + 1 team photo
  stickersPerPack: 7,
  packPrice: 1500,           // ARS
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
