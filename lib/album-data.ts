// World Cup 2026 Album Data
// 980 stickers total, 48 teams, 20 stickers per team + special sections

export interface Team {
  id: string;
  name: string;
  code: string;
  confederation: string;
  group: string;
  flag: string;
  stickers: Sticker[];
}

export interface Sticker {
  id: string;
  number: number;
  type: 'badge' | 'team-photo' | 'player';
  name: string;
  position?: string;
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

// Generate stickers for a team (20 stickers: 1 badge, 1 team photo, 18 players)
function generateTeamStickers(teamId: string, startNumber: number, players: string[]): Sticker[] {
  const stickers: Sticker[] = [
    { id: `${teamId}-badge`, number: startNumber, type: 'badge', name: 'Escudo' },
    { id: `${teamId}-photo`, number: startNumber + 1, type: 'team-photo', name: 'Foto del Equipo' },
  ];
  
  players.forEach((player, index) => {
    stickers.push({
      id: `${teamId}-player-${index + 1}`,
      number: startNumber + 2 + index,
      type: 'player',
      name: player,
    });
  });
  
  return stickers;
}

// Teams data organized by group
export const teams: Team[] = [
  // Group A - USA, Mexico, Canada + 1
  {
    id: 'usa',
    name: 'Estados Unidos',
    code: 'USA',
    confederation: CONCACAF,
    group: 'A',
    flag: '🇺🇸',
    stickers: generateTeamStickers('usa', 1, [
      'Matt Turner', 'Sergino Dest', 'Chris Richards', 'Tim Ream', 'Antonee Robinson',
      'Tyler Adams', 'Weston McKennie', 'Yunus Musah', 'Giovanni Reyna', 'Brenden Aaronson',
      'Christian Pulisic', 'Timothy Weah', 'Josh Sargent', 'Ricardo Pepi', 'Folarin Balogun',
      'Malik Tillman', 'Johnny Cardoso', 'Joe Scally'
    ])
  },
  {
    id: 'mexico',
    name: 'Mexico',
    code: 'MEX',
    confederation: CONCACAF,
    group: 'A',
    flag: '🇲🇽',
    stickers: generateTeamStickers('mexico', 21, [
      'Guillermo Ochoa', 'Jorge Sanchez', 'Cesar Montes', 'Johan Vasquez', 'Jesus Gallardo',
      'Edson Alvarez', 'Luis Chavez', 'Carlos Rodriguez', 'Hirving Lozano', 'Alexis Vega',
      'Raul Jimenez', 'Henry Martin', 'Santiago Gimenez', 'Uriel Antuna', 'Diego Lainez',
      'Orbelin Pineda', 'Luis Romo', 'Erick Gutierrez'
    ])
  },
  {
    id: 'canada',
    name: 'Canada',
    code: 'CAN',
    confederation: CONCACAF,
    group: 'A',
    flag: '🇨🇦',
    stickers: generateTeamStickers('canada', 41, [
      'Milan Borjan', 'Alistair Johnston', 'Kamal Miller', 'Steven Vitoria', 'Alphonso Davies',
      'Stephen Eustaquio', 'Jonathan Osorio', 'Ismael Kone', 'Tajon Buchanan', 'Jonathan David',
      'Cyle Larin', 'Junior Hoilett', 'Richie Laryea', 'Mark-Anthony Kaye', 'Atiba Hutchinson',
      'Liam Millar', 'Theo Corbeanu', 'Jacob Shaffelburg'
    ])
  },
  {
    id: 'jamaica',
    name: 'Jamaica',
    code: 'JAM',
    confederation: CONCACAF,
    group: 'A',
    flag: '🇯🇲',
    stickers: generateTeamStickers('jamaica', 61, [
      'Andre Blake', 'Damion Lowe', 'Kemar Lawrence', 'Adrian Mariappa', 'Michail Antonio',
      'Leon Bailey', 'Bobby Reid', 'Ravel Morrison', 'Daniel Johnson', 'Shamar Nicholson',
      'Kemar Roofe', 'Demarai Gray', 'Ethan Pinnock', 'Joel Latibeaudiere', 'Isaac Hayden',
      'Kasey Palmer', 'Andre Gray', 'Di Shon Bernard'
    ])
  },
  
  // Group B
  {
    id: 'argentina',
    name: 'Argentina',
    code: 'ARG',
    confederation: CONMEBOL,
    group: 'B',
    flag: '🇦🇷',
    stickers: generateTeamStickers('argentina', 81, [
      'Emiliano Martinez', 'Nahuel Molina', 'Cristian Romero', 'Nicolas Otamendi', 'Nicolas Tagliafico',
      'Rodrigo De Paul', 'Enzo Fernandez', 'Alexis Mac Allister', 'Angel Di Maria', 'Lionel Messi',
      'Julian Alvarez', 'Lautaro Martinez', 'Paulo Dybala', 'Leandro Paredes', 'Giovani Lo Celso',
      'Lisandro Martinez', 'Alejandro Garnacho', 'Nicolas Gonzalez'
    ])
  },
  {
    id: 'brazil',
    name: 'Brasil',
    code: 'BRA',
    confederation: CONMEBOL,
    group: 'B',
    flag: '🇧🇷',
    stickers: generateTeamStickers('brazil', 101, [
      'Alisson', 'Danilo', 'Marquinhos', 'Eder Militao', 'Alex Sandro',
      'Casemiro', 'Lucas Paqueta', 'Bruno Guimaraes', 'Raphinha', 'Vinicius Jr',
      'Rodrygo', 'Richarlison', 'Endrick', 'Neymar Jr', 'Gabriel Jesus',
      'Antony', 'Gabriel Martinelli', 'Bremer'
    ])
  },
  {
    id: 'colombia',
    name: 'Colombia',
    code: 'COL',
    confederation: CONMEBOL,
    group: 'B',
    flag: '🇨🇴',
    stickers: generateTeamStickers('colombia', 121, [
      'David Ospina', 'Daniel Munoz', 'Davinson Sanchez', 'Yerry Mina', 'Johan Mojica',
      'Wilmar Barrios', 'Jefferson Lerma', 'Juan Cuadrado', 'James Rodriguez', 'Luis Diaz',
      'Rafael Santos Borre', 'Luis Muriel', 'Miguel Borja', 'Jhon Arias', 'Jorge Carrascal',
      'Mateus Uribe', 'Gustavo Puerta', 'Kevin Castaño'
    ])
  },
  {
    id: 'paraguay',
    name: 'Paraguay',
    code: 'PAR',
    confederation: CONMEBOL,
    group: 'B',
    flag: '🇵🇾',
    stickers: generateTeamStickers('paraguay', 141, [
      'Antony Silva', 'Robert Rojas', 'Gustavo Gomez', 'Omar Alderete', 'Junior Alonso',
      'Richard Sanchez', 'Mathias Villasanti', 'Miguel Almiron', 'Gabriel Avalos', 'Adam Bareiro',
      'Alex Arce', 'Julio Enciso', 'Ramon Sosa', 'Andres Cubas', 'Matias Rojas',
      'Angel Romero', 'Derlis Gonzalez', 'Ivan Ramirez'
    ])
  },
  
  // Group C
  {
    id: 'france',
    name: 'Francia',
    code: 'FRA',
    confederation: UEFA,
    group: 'C',
    flag: '🇫🇷',
    stickers: generateTeamStickers('france', 161, [
      'Hugo Lloris', 'Benjamin Pavard', 'Dayot Upamecano', 'William Saliba', 'Theo Hernandez',
      'N\'Golo Kante', 'Aurelien Tchouameni', 'Eduardo Camavinga', 'Ousmane Dembele', 'Kylian Mbappe',
      'Antoine Griezmann', 'Olivier Giroud', 'Marcus Thuram', 'Randal Kolo Muani', 'Christopher Nkunku',
      'Kingsley Coman', 'Warren Zaire-Emery', 'Jules Kounde'
    ])
  },
  {
    id: 'england',
    name: 'Inglaterra',
    code: 'ENG',
    confederation: UEFA,
    group: 'C',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    stickers: generateTeamStickers('england', 181, [
      'Jordan Pickford', 'Kyle Walker', 'Harry Maguire', 'John Stones', 'Luke Shaw',
      'Declan Rice', 'Jude Bellingham', 'Mason Mount', 'Bukayo Saka', 'Harry Kane',
      'Phil Foden', 'Raheem Sterling', 'Marcus Rashford', 'Jack Grealish', 'Trent Alexander-Arnold',
      'Cole Palmer', 'Kobbie Mainoo', 'Marc Guehi'
    ])
  },
  {
    id: 'germany',
    name: 'Alemania',
    code: 'GER',
    confederation: UEFA,
    group: 'C',
    flag: '🇩🇪',
    stickers: generateTeamStickers('germany', 201, [
      'Manuel Neuer', 'Joshua Kimmich', 'Antonio Rudiger', 'Nico Schlotterbeck', 'David Raum',
      'Ilkay Gundogan', 'Leon Goretzka', 'Jamal Musiala', 'Leroy Sane', 'Kai Havertz',
      'Thomas Muller', 'Niclas Fullkrug', 'Florian Wirtz', 'Serge Gnabry', 'Robin Gosens',
      'Marc-Andre ter Stegen', 'Jonathan Tah', 'Chris Fuhrich'
    ])
  },
  {
    id: 'austria',
    name: 'Austria',
    code: 'AUT',
    confederation: UEFA,
    group: 'C',
    flag: '🇦🇹',
    stickers: generateTeamStickers('austria', 221, [
      'Patrick Pentz', 'Stefan Posch', 'Kevin Danso', 'Maximilian Wober', 'Philipp Mwene',
      'Nicolas Seiwald', 'Konrad Laimer', 'Marcel Sabitzer', 'Christoph Baumgartner', 'David Alaba',
      'Michael Gregoritsch', 'Marko Arnautovic', 'Patrick Wimmer', 'Florian Kainz', 'Romano Schmid',
      'Alexander Prass', 'Phillipp Lienhart', 'Flavius Daniliuc'
    ])
  },
  
  // Group D
  {
    id: 'spain',
    name: 'Espana',
    code: 'ESP',
    confederation: UEFA,
    group: 'D',
    flag: '🇪🇸',
    stickers: generateTeamStickers('spain', 241, [
      'Unai Simon', 'Dani Carvajal', 'Aymeric Laporte', 'Pau Torres', 'Alejandro Grimaldo',
      'Rodri', 'Pedri', 'Gavi', 'Lamine Yamal', 'Alvaro Morata',
      'Nico Williams', 'Ferran Torres', 'Mikel Oyarzabal', 'Dani Olmo', 'Fabian Ruiz',
      'Yeremy Pino', 'Marc Cucurella', 'Pau Cubarsi'
    ])
  },
  {
    id: 'portugal',
    name: 'Portugal',
    code: 'POR',
    confederation: UEFA,
    group: 'D',
    flag: '🇵🇹',
    stickers: generateTeamStickers('portugal', 261, [
      'Diogo Costa', 'Joao Cancelo', 'Ruben Dias', 'Pepe', 'Nuno Mendes',
      'Ruben Neves', 'Vitinha', 'Bruno Fernandes', 'Bernardo Silva', 'Cristiano Ronaldo',
      'Rafael Leao', 'Goncalo Ramos', 'Joao Felix', 'Francisco Conceicao', 'Diogo Jota',
      'Antonio Silva', 'Nelson Semedo', 'Pedro Neto'
    ])
  },
  {
    id: 'italy',
    name: 'Italia',
    code: 'ITA',
    confederation: UEFA,
    group: 'D',
    flag: '🇮🇹',
    stickers: generateTeamStickers('italy', 281, [
      'Gianluigi Donnarumma', 'Giovanni Di Lorenzo', 'Alessandro Bastoni', 'Riccardo Calafiori', 'Federico Dimarco',
      'Nicolo Barella', 'Jorginho', 'Lorenzo Pellegrini', 'Federico Chiesa', 'Gianluca Scamacca',
      'Mateo Retegui', 'Giacomo Raspadori', 'Davide Frattesi', 'Sandro Tonali', 'Bryan Cristante',
      'Stephan El Shaarawy', 'Andrea Cambiaso', 'Destiny Udogie'
    ])
  },
  {
    id: 'croatia',
    name: 'Croacia',
    code: 'CRO',
    confederation: UEFA,
    group: 'D',
    flag: '🇭🇷',
    stickers: generateTeamStickers('croatia', 301, [
      'Dominik Livakovic', 'Josip Stanisic', 'Josko Gvardiol', 'Duje Caleta-Car', 'Borna Sosa',
      'Mateo Kovacic', 'Luka Modric', 'Marcelo Brozovic', 'Mario Pasalic', 'Andrej Kramaric',
      'Ivan Perisic', 'Bruno Petkovic', 'Lovro Majer', 'Josip Sutalo', 'Kristijan Jakic',
      'Martin Baturina', 'Ante Budimir', 'Mislav Orsic'
    ])
  },
  
  // Group E
  {
    id: 'netherlands',
    name: 'Paises Bajos',
    code: 'NED',
    confederation: UEFA,
    group: 'E',
    flag: '🇳🇱',
    stickers: generateTeamStickers('netherlands', 321, [
      'Bart Verbruggen', 'Denzel Dumfries', 'Virgil van Dijk', 'Nathan Ake', 'Daley Blind',
      'Frenkie de Jong', 'Teun Koopmeiners', 'Xavi Simons', 'Cody Gakpo', 'Memphis Depay',
      'Wout Weghorst', 'Donyell Malen', 'Steven Bergwijn', 'Brian Brobbey', 'Jeremie Frimpong',
      'Matthijs de Ligt', 'Ryan Gravenberch', 'Micky van de Ven'
    ])
  },
  {
    id: 'belgium',
    name: 'Belgica',
    code: 'BEL',
    confederation: UEFA,
    group: 'E',
    flag: '🇧🇪',
    stickers: generateTeamStickers('belgium', 341, [
      'Thibaut Courtois', 'Timothy Castagne', 'Jan Vertonghen', 'Wout Faes', 'Arthur Theate',
      'Kevin De Bruyne', 'Youri Tielemans', 'Amadou Onana', 'Jeremy Doku', 'Romelu Lukaku',
      'Leandro Trossard', 'Lois Openda', 'Charles De Ketelaere', 'Dodi Lukebakio', 'Orel Mangala',
      'Axel Witsel', 'Thomas Meunier', 'Arne Engels'
    ])
  },
  {
    id: 'denmark',
    name: 'Dinamarca',
    code: 'DEN',
    confederation: UEFA,
    group: 'E',
    flag: '🇩🇰',
    stickers: generateTeamStickers('denmark', 361, [
      'Kasper Schmeichel', 'Joachim Andersen', 'Andreas Christensen', 'Simon Kjaer', 'Joakim Maehle',
      'Pierre-Emile Hojbjerg', 'Christian Eriksen', 'Morten Hjulmand', 'Mikkel Damsgaard', 'Rasmus Hojlund',
      'Jonas Wind', 'Martin Braithwaite', 'Andreas Skov Olsen', 'Yussuf Poulsen', 'Thomas Delaney',
      'Victor Nelsson', 'Alexander Bah', 'Jacob Bruun Larsen'
    ])
  },
  {
    id: 'switzerland',
    name: 'Suiza',
    code: 'SUI',
    confederation: UEFA,
    group: 'E',
    flag: '🇨🇭',
    stickers: generateTeamStickers('switzerland', 381, [
      'Yann Sommer', 'Silvan Widmer', 'Manuel Akanji', 'Nico Elvedi', 'Ricardo Rodriguez',
      'Granit Xhaka', 'Denis Zakaria', 'Remo Freuler', 'Xherdan Shaqiri', 'Breel Embolo',
      'Ruben Vargas', 'Noah Okafor', 'Dan Ndoye', 'Fabian Rieder', 'Vincent Sierro',
      'Michel Aebischer', 'Zeki Amdouni', 'Leonidas Stergiou'
    ])
  },
  
  // Group F
  {
    id: 'japan',
    name: 'Japon',
    code: 'JPN',
    confederation: AFC,
    group: 'F',
    flag: '🇯🇵',
    stickers: generateTeamStickers('japan', 401, [
      'Shuichi Gonda', 'Hiroki Sakai', 'Maya Yoshida', 'Takehiro Tomiyasu', 'Yuto Nagatomo',
      'Wataru Endo', 'Hidemasa Morita', 'Kaoru Mitoma', 'Takumi Minamino', 'Takefusa Kubo',
      'Daichi Kamada', 'Junya Ito', 'Kyogo Furuhashi', 'Ritsu Doan', 'Ao Tanaka',
      'Keito Nakamura', 'Daizen Maeda', 'Ko Itakura'
    ])
  },
  {
    id: 'korea',
    name: 'Corea del Sur',
    code: 'KOR',
    confederation: AFC,
    group: 'F',
    flag: '🇰🇷',
    stickers: generateTeamStickers('korea', 421, [
      'Kim Seung-gyu', 'Kim Min-jae', 'Kim Young-gwon', 'Kim Jin-su', 'Lee Ki-je',
      'Jung Woo-young', 'Hwang In-beom', 'Lee Jae-sung', 'Hwang Hee-chan', 'Son Heung-min',
      'Cho Gue-sung', 'Lee Kang-in', 'Hwang Ui-jo', 'Na Sang-ho', 'Song Min-kyu',
      'Park Yong-woo', 'Jeong Sang-bin', 'Hong Chul'
    ])
  },
  {
    id: 'australia',
    name: 'Australia',
    code: 'AUS',
    confederation: AFC,
    group: 'F',
    flag: '🇦🇺',
    stickers: generateTeamStickers('australia', 441, [
      'Mat Ryan', 'Nathaniel Atkinson', 'Harry Souttar', 'Kye Rowles', 'Aziz Behich',
      'Jackson Irvine', 'Aaron Mooy', 'Ajdin Hrustic', 'Mathew Leckie', 'Mitchell Duke',
      'Jamie Maclaren', 'Craig Goodwin', 'Martin Boyle', 'Keanu Baccus', 'Cameron Devlin',
      'Riley McGree', 'Garang Kuol', 'Connor Metcalfe'
    ])
  },
  {
    id: 'iran',
    name: 'Iran',
    code: 'IRN',
    confederation: AFC,
    group: 'F',
    flag: '🇮🇷',
    stickers: generateTeamStickers('iran', 461, [
      'Alireza Beiranvand', 'Sadegh Moharrami', 'Morteza Pouraliganji', 'Hossein Kanaani', 'Milad Mohammadi',
      'Saeid Ezatolahi', 'Ahmad Nourollahi', 'Saman Ghoddos', 'Alireza Jahanbakhsh', 'Sardar Azmoun',
      'Mehdi Taremi', 'Karim Ansarifard', 'Ali Gholizadeh', 'Vahid Amiri', 'Mehdi Torabi',
      'Shoja Khalilzadeh', 'Allahyar Sayyadmanesh', 'Ramin Rezaeian'
    ])
  },
  
  // Group G
  {
    id: 'morocco',
    name: 'Marruecos',
    code: 'MAR',
    confederation: CAF,
    group: 'G',
    flag: '🇲🇦',
    stickers: generateTeamStickers('morocco', 481, [
      'Yassine Bounou', 'Achraf Hakimi', 'Nayef Aguerd', 'Romain Saiss', 'Noussair Mazraoui',
      'Sofyan Amrabat', 'Azzedine Ounahi', 'Hakim Ziyech', 'Sofiane Boufal', 'Youssef En-Nesyri',
      'Abderrazak Hamdallah', 'Bilal El Khannouss', 'Ibrahim Diaz', 'Ilias Akhomach', 'Selim Amallah',
      'Jawad El Yamiq', 'Yahia Attiyat Allah', 'Munir El Haddadi'
    ])
  },
  {
    id: 'senegal',
    name: 'Senegal',
    code: 'SEN',
    confederation: CAF,
    group: 'G',
    flag: '🇸🇳',
    stickers: generateTeamStickers('senegal', 501, [
      'Edouard Mendy', 'Kalidou Koulibaly', 'Abdou Diallo', 'Pape Abou Cisse', 'Youssouf Sabaly',
      'Idrissa Gueye', 'Nampalys Mendy', 'Pape Matar Sarr', 'Ismaila Sarr', 'Sadio Mane',
      'Boulaye Dia', 'Habib Diallo', 'Iliman Ndiaye', 'Krepin Diatta', 'Nicolas Jackson',
      'Famara Diedhiou', 'Cheikhou Kouyate', 'Formose Mendy'
    ])
  },
  {
    id: 'nigeria',
    name: 'Nigeria',
    code: 'NGA',
    confederation: CAF,
    group: 'G',
    flag: '🇳🇬',
    stickers: generateTeamStickers('nigeria', 521, [
      'Francis Uzoho', 'Calvin Bassey', 'William Troost-Ekong', 'Kenneth Omeruo', 'Zaidu Sanusi',
      'Wilfred Ndidi', 'Alex Iwobi', 'Joe Aribo', 'Ademola Lookman', 'Victor Osimhen',
      'Samuel Chukwueze', 'Kelechi Iheanacho', 'Taiwo Awoniyi', 'Moses Simon', 'Terem Moffi',
      'Bright Osayi-Samuel', 'Raphael Onyedika', 'Ola Aina'
    ])
  },
  {
    id: 'cameroon',
    name: 'Camerun',
    code: 'CMR',
    confederation: CAF,
    group: 'G',
    flag: '🇨🇲',
    stickers: generateTeamStickers('cameroon', 541, [
      'Andre Onana', 'Collins Fai', 'Nicolas Nkoulou', 'Jean-Charles Castelletto', 'Nouhou Tolo',
      'Andre-Frank Zambo Anguissa', 'Martin Hongla', 'Pierre Kunde', 'Bryan Mbeumo', 'Eric Maxim Choupo-Moting',
      'Karl Toko Ekambi', 'Vincent Aboubakar', 'Christian Bassogog', 'Georges-Kevin Nkoudou', 'Moumi Ngamaleu',
      'Olivier Ntcham', 'Jerome Onguene', 'Michael Ngadeu-Ngadjui'
    ])
  },
  
  // Group H
  {
    id: 'uruguay',
    name: 'Uruguay',
    code: 'URU',
    confederation: CONMEBOL,
    group: 'H',
    flag: '🇺🇾',
    stickers: generateTeamStickers('uruguay', 561, [
      'Sergio Rochet', 'Ronald Araujo', 'Jose Maria Gimenez', 'Sebastian Coates', 'Mathias Olivera',
      'Federico Valverde', 'Rodrigo Bentancur', 'Manuel Ugarte', 'Facundo Pellistri', 'Darwin Nunez',
      'Luis Suarez', 'Giorgian De Arrascaeta', 'Nicolas de la Cruz', 'Maximiliano Gomez', 'Agustin Canobbio',
      'Matias Vina', 'Lucas Torreira', 'Agustin Alvarez Martinez'
    ])
  },
  {
    id: 'chile',
    name: 'Chile',
    code: 'CHI',
    confederation: CONMEBOL,
    group: 'H',
    flag: '🇨🇱',
    stickers: generateTeamStickers('chile', 581, [
      'Claudio Bravo', 'Mauricio Isla', 'Gary Medel', 'Guillermo Maripan', 'Gabriel Suazo',
      'Arturo Vidal', 'Charles Aranguiz', 'Erick Pulgar', 'Alexis Sanchez', 'Ben Brereton Diaz',
      'Eduardo Vargas', 'Diego Valencia', 'Darío Osorio', 'Marcelino Nunez', 'Victor Davila',
      'Carlos Palacios', 'Paulo Diaz', 'Bastian Yañez'
    ])
  },
  {
    id: 'ecuador',
    name: 'Ecuador',
    code: 'ECU',
    confederation: CONMEBOL,
    group: 'H',
    flag: '🇪🇨',
    stickers: generateTeamStickers('ecuador', 601, [
      'Hernan Galindez', 'Angelo Preciado', 'Felix Torres', 'Piero Hincapie', 'Pervis Estupinan',
      'Carlos Gruezo', 'Moises Caicedo', 'Jeremy Sarmiento', 'Gonzalo Plata', 'Enner Valencia',
      'Michael Estrada', 'Kevin Rodriguez', 'Kendry Paez', 'Alan Franco', 'Jose Cifuentes',
      'John Yeboah', 'Willian Pacho', 'Diego Palacios'
    ])
  },
  {
    id: 'venezuela',
    name: 'Venezuela',
    code: 'VEN',
    confederation: CONMEBOL,
    group: 'H',
    flag: '🇻🇪',
    stickers: generateTeamStickers('venezuela', 621, [
      'Rafael Romo', 'Alexander Gonzalez', 'Yordan Osorio', 'Wilker Angel', 'Miguel Navarro',
      'Tomas Rincon', 'Yangel Herrera', 'Jefferson Savarino', 'Eduard Bello', 'Salomon Rondon',
      'Josef Martinez', 'Darwin Machis', 'Jhon Murillo', 'Eric Ramirez', 'Yeferson Soteldo',
      'Jon Aramburu', 'Cristian Casseres Jr', 'Telasco Segovia'
    ])
  },
  
  // Group I
  {
    id: 'poland',
    name: 'Polonia',
    code: 'POL',
    confederation: UEFA,
    group: 'I',
    flag: '🇵🇱',
    stickers: generateTeamStickers('poland', 641, [
      'Wojciech Szczesny', 'Matty Cash', 'Jan Bednarek', 'Jakub Kiwior', 'Bartosz Bereszynski',
      'Grzegorz Krychowiak', 'Piotr Zielinski', 'Sebastian Szymanski', 'Przemyslaw Frankowski', 'Robert Lewandowski',
      'Arkadiusz Milik', 'Krzysztof Piatek', 'Adam Buksa', 'Karol Swiderski', 'Nicola Zalewski',
      'Kamil Grosicki', 'Jakub Moder', 'Bartosz Slisz'
    ])
  },
  {
    id: 'ukraine',
    name: 'Ucrania',
    code: 'UKR',
    confederation: UEFA,
    group: 'I',
    flag: '🇺🇦',
    stickers: generateTeamStickers('ukraine', 661, [
      'Andriy Lunin', 'Vitalii Mykolenko', 'Mykola Matviyenko', 'Illia Zabarnyi', 'Oleksandr Zinchenko',
      'Taras Stepanenko', 'Ruslan Malinovskyi', 'Oleksandr Tymchyk', 'Mykhailo Mudryk', 'Artem Dovbyk',
      'Roman Yaremchuk', 'Viktor Tsygankov', 'Andriy Yarmolenko', 'Serhiy Sydorchuk', 'Georgiy Sudakov',
      'Eduard Sobol', 'Oleksandr Karavaev', 'Heorhii Tsitaishvili'
    ])
  },
  {
    id: 'serbia',
    name: 'Serbia',
    code: 'SRB',
    confederation: UEFA,
    group: 'I',
    flag: '🇷🇸',
    stickers: generateTeamStickers('serbia', 681, [
      'Vanja Milinkovic-Savic', 'Nikola Milenkovic', 'Strahinja Pavlovic', 'Milos Veljkovic', 'Filip Mladenovic',
      'Nemanja Gudelj', 'Sergej Milinkovic-Savic', 'Sasa Lukic', 'Filip Kostic', 'Aleksandar Mitrovic',
      'Dusan Vlahovic', 'Dusan Tadic', 'Luka Jovic', 'Andrija Zivkovic', 'Filip Djuricic',
      'Nemanja Radonjic', 'Veljko Birmancevic', 'Ivan Ilic'
    ])
  },
  {
    id: 'wales',
    name: 'Gales',
    code: 'WAL',
    confederation: UEFA,
    group: 'I',
    flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    stickers: generateTeamStickers('wales', 701, [
      'Wayne Hennessey', 'Chris Mepham', 'Joe Rodon', 'Ben Davies', 'Neco Williams',
      'Joe Allen', 'Aaron Ramsey', 'Harry Wilson', 'Daniel James', 'Gareth Bale',
      'Kieffer Moore', 'Brennan Johnson', 'David Brooks', 'Ethan Ampadu', 'Dylan Levitt',
      'Connor Roberts', 'Sorba Thomas', 'Rubin Colwill'
    ])
  },
  
  // Group J
  {
    id: 'costa-rica',
    name: 'Costa Rica',
    code: 'CRC',
    confederation: CONCACAF,
    group: 'J',
    flag: '🇨🇷',
    stickers: generateTeamStickers('costa-rica', 721, [
      'Keylor Navas', 'Keysher Fuller', 'Francisco Calvo', 'Oscar Duarte', 'Bryan Oviedo',
      'Celso Borges', 'Yeltsin Tejeda', 'Gerson Torres', 'Joel Campbell', 'Anthony Contreras',
      'Johan Venegas', 'Jewison Bennette', 'Manfred Ugalde', 'Brandon Aguilera', 'Carlos Martinez',
      'Kendall Waston', 'Daniel Chacon', 'Juan Pablo Vargas'
    ])
  },
  {
    id: 'honduras',
    name: 'Honduras',
    code: 'HON',
    confederation: CONCACAF,
    group: 'J',
    flag: '🇭🇳',
    stickers: generateTeamStickers('honduras', 741, [
      'Luis Lopez', 'Andy Najar', 'Maynor Figueroa', 'Denil Maldonado', 'Diego Rodriguez',
      'Kervin Arriaga', 'Deybi Flores', 'Edwin Rodriguez', 'Alberth Elis', 'Romell Quioto',
      'Jerry Bengtson', 'Antony Lozano', 'Bryan Acosta', 'Alex Lopez', 'Jonathan Rubio',
      'Joseph Rosales', 'Choco Lozano', 'Brayan Moya'
    ])
  },
  {
    id: 'panama',
    name: 'Panama',
    code: 'PAN',
    confederation: CONCACAF,
    group: 'J',
    flag: '🇵🇦',
    stickers: generateTeamStickers('panama', 761, [
      'Luis Mejia', 'Michael Murillo', 'Fidel Escobar', 'Eric Davis', 'Harold Cummings',
      'Adalberto Carrasquilla', 'Jose Luis Rodriguez', 'Anibal Godoy', 'Eric Davis Jr', 'Gabriel Torres',
      'Jose Fajardo', 'Freddy Gondola', 'Alberto Quintero', 'Edgar Barcenas', 'Cesar Yanis',
      'Rolando Blackburn', 'Ivan Anderson', 'Abdiel Ayarza'
    ])
  },
  {
    id: 'peru',
    name: 'Peru',
    code: 'PER',
    confederation: CONMEBOL,
    group: 'J',
    flag: '🇵🇪',
    stickers: generateTeamStickers('peru', 781, [
      'Pedro Gallese', 'Luis Advincula', 'Alexander Callens', 'Carlos Zambrano', 'Miguel Trauco',
      'Renato Tapia', 'Yoshimar Yotun', 'Sergio Peña', 'Andre Carrillo', 'Gianluca Lapadula',
      'Bryan Reyna', 'Alex Valera', 'Edison Flores', 'Andy Polo', 'Christofer Gonzales',
      'Piero Quispe', 'Marcos Lopez', 'Paolo Guerrero'
    ])
  },
  
  // Group K
  {
    id: 'saudi-arabia',
    name: 'Arabia Saudita',
    code: 'KSA',
    confederation: AFC,
    group: 'K',
    flag: '🇸🇦',
    stickers: generateTeamStickers('saudi-arabia', 801, [
      'Mohammed Al-Owais', 'Hassan Tambakti', 'Abdulelah Al-Amri', 'Ali Al-Bulaihi', 'Yasser Al-Shahrani',
      'Mohamed Kanno', 'Abdulelah Al-Malki', 'Saud Abdulhamid', 'Salem Al-Dawsari', 'Firas Al-Buraikan',
      'Saleh Al-Shehri', 'Fahad Al-Muwallad', 'Nasser Al-Dawsari', 'Hattan Bahebri', 'Abdullah Madu',
      'Nawaf Al-Abed', 'Abdullah Otayf', 'Ali Al-Hassan'
    ])
  },
  {
    id: 'qatar',
    name: 'Qatar',
    code: 'QAT',
    confederation: AFC,
    group: 'K',
    flag: '🇶🇦',
    stickers: generateTeamStickers('qatar', 821, [
      'Saad Al Sheeb', 'Pedro Miguel', 'Bassam Al Rawi', 'Abdelkarim Hassan', 'Homam Ahmed',
      'Karim Boudiaf', 'Abdulaziz Hatem', 'Assim Madibo', 'Akram Afif', 'Almoez Ali',
      'Mohammed Muntari', 'Hassan Al Haydos', 'Ahmed Alaaeldin', 'Yusuf Abdurisag', 'Ismail Mohamad',
      'Meshaal Barsham', 'Musaab Khidir', 'Jassem Gaber'
    ])
  },
  {
    id: 'uae',
    name: 'Emiratos Arabes',
    code: 'UAE',
    confederation: AFC,
    group: 'K',
    flag: '🇦🇪',
    stickers: generateTeamStickers('uae', 841, [
      'Khalid Eisa', 'Bandar Al-Ahbabi', 'Shaheen Abdulrahman', 'Walid Abbas', 'Ali Mabkhout',
      'Abdulrahman Al-Abed', 'Majed Hassan', 'Ali Salmeen', 'Caio Canedo', 'Fabio Lima',
      'Harib Abdullah', 'Sebastian Tagliabue', 'Khalfan Mubarak', 'Ismail Al-Hammadi', 'Khalil Ibrahim',
      'Yahia Nader', 'Mohammed Barghash', 'Tahnoon Al Zaabi'
    ])
  },
  {
    id: 'uzbekistan',
    name: 'Uzbekistan',
    code: 'UZB',
    confederation: AFC,
    group: 'K',
    flag: '🇺🇿',
    stickers: generateTeamStickers('uzbekistan', 861, [
      'Eldor Shomurodov', 'Akmal Shorakhmedov', 'Davron Khashimov', 'Oston Urunov', 'Abbosbek Fayzullaev',
      'Jaloliddin Masharipov', 'Dostonbek Khamdamov', 'Otabek Shukurov', 'Odiljon Hamrobekov', 'Sardor Rashidov',
      'Islom Kobilov', 'Khojiakbar Alijonov', 'Javohir Sidikov', 'Nurillo Tukhtasinov', 'Azizjon Ganiev',
      'Khusain Norchaev', 'Bobir Abdikhlilov', 'Ikrom Alibaev'
    ])
  },
  
  // Group L
  {
    id: 'ghana',
    name: 'Ghana',
    code: 'GHA',
    confederation: CAF,
    group: 'L',
    flag: '🇬🇭',
    stickers: generateTeamStickers('ghana', 881, [
      'Lawrence Ati-Zigi', 'Tariq Lamptey', 'Daniel Amartey', 'Alexander Djiku', 'Abdul-Rahman Baba',
      'Thomas Partey', 'Mohammed Kudus', 'Daniel-Kofi Kyereh', 'Jordan Ayew', 'Andre Ayew',
      'Inaki Williams', 'Antoine Semenyo', 'Osman Bukari', 'Abdul Fatawu Issahaku', 'Kamaldeen Sulemana',
      'Mohammed Salisu', 'Ibrahim Osman', 'Ernest Nuamah'
    ])
  },
  {
    id: 'south-africa',
    name: 'Sudafrica',
    code: 'RSA',
    confederation: CAF,
    group: 'L',
    flag: '🇿🇦',
    stickers: generateTeamStickers('south-africa', 901, [
      'Ronwen Williams', 'Khuliso Mudau', 'Siyanda Xulu', 'Grant Kekana', 'Terrence Mashego',
      'Teboho Mokoena', 'Mothobi Mvala', 'Themba Zwane', 'Percy Tau', 'Lebo Mothiba',
      'Evidence Makgopa', 'Bongokuhle Hlongwane', 'Keagan Dolly', 'Thulani Serero', 'Sphephelo Sithole',
      'Mihlali Mayambela', 'Oswin Appollis', 'Elias Mokwana'
    ])
  },
  {
    id: 'tunisia',
    name: 'Tunez',
    code: 'TUN',
    confederation: CAF,
    group: 'L',
    flag: '🇹🇳',
    stickers: generateTeamStickers('tunisia', 921, [
      'Aymen Dahmen', 'Mohamed Drager', 'Yassine Meriah', 'Montassar Talbi', 'Ali Abdi',
      'Aissa Laidouni', 'Ellyes Skhiri', 'Hannibal Mejbri', 'Naim Sliti', 'Youssef Msakni',
      'Seifeddine Jaziri', 'Wahbi Khazri', 'Issam Jebali', 'Mohamed Ali Ben Romdhane', 'Ferjani Sassi',
      'Ali Maaloul', 'Hamza Rafiaa', 'Elyesse Saïdani'
    ])
  },
  {
    id: 'new-zealand',
    name: 'Nueva Zelanda',
    code: 'NZL',
    confederation: OFC,
    group: 'L',
    flag: '🇳🇿',
    stickers: generateTeamStickers('new-zealand', 941, [
      'Stefan Marinovic', 'Tim Payne', 'Michael Boxall', 'Winston Reid', 'Liberato Cacace',
      'Joe Bell', 'Marko Stamenic', 'Matt Garbett', 'Chris Wood', 'Kosta Barbarouses',
      'Andre De Jong', 'Ben Waine', 'Elijah Just', 'Callum McCowatt', 'Alex Greive',
      'Sarpreet Singh', 'Dane Ingham', 'Nando Pijnaker'
    ])
  }
];

// Special sections
export const specialSections: SpecialSection[] = [
  {
    id: 'intro',
    name: 'Introduccion',
    stickers: Array.from({ length: 8 }, (_, i) => ({
      id: `intro-${i + 1}`,
      number: 961 + i,
      type: 'badge' as const,
      name: i < 4 ? `Logo FIFA ${i + 1}` : `Trofeo ${i - 3}`,
    })),
  },
  {
    id: 'stadiums',
    name: 'Estadios',
    stickers: Array.from({ length: 16 }, (_, i) => ({
      id: `stadium-${i + 1}`,
      number: 969 + i,
      type: 'badge' as const,
      name: [
        'MetLife Stadium', 'Rose Bowl', 'AT&T Stadium', 'SoFi Stadium',
        'Hard Rock Stadium', 'Mercedes-Benz Stadium', 'NRG Stadium', 'Lumen Field',
        'Azteca Stadium', 'Estadio BBVA', 'Estadio Akron', 'BC Place',
        'BMO Field', 'Gillette Stadium', 'Levi\'s Stadium', 'Lincoln Financial Field'
      ][i],
    })),
  },
  {
    id: 'coca-cola',
    name: 'Coca-Cola Collection',
    stickers: Array.from({ length: 12 }, (_, i) => ({
      id: `coca-cola-${i + 1}`,
      number: 985 + i,
      type: 'player' as const,
      name: [
        'Alphonso Davies', 'Harry Kane', 'Joshua Kimmich', 'Lautaro Martinez',
        'Vinicius Jr', 'Jude Bellingham', 'Kylian Mbappe', 'Erling Haaland',
        'Mohamed Salah', 'Kevin De Bruyne', 'Rodri', 'Florian Wirtz'
      ][i],
    })),
  }
];

// Album stats
// 48 teams x 20 stickers = 960 + intro(8) + stadiums(16) + coca-cola(12) = 996
export const ALBUM_CONFIG = {
  totalStickers: 996,
  teamsCount: 48,
  stickersPerTeam: 20,
  stickersPerPack: 7,
  packPrice: 1500, // ARS
  specialStickers: 36, // intro + stadiums + coca-cola
  parallelVariants: ['Blue', 'Red', 'Purple', 'Green', 'Black'],
};

// Get all stickers flat
export function getAllStickers(): Sticker[] {
  const teamStickers = teams.flatMap(team => team.stickers);
  const specialStickers = specialSections.flatMap(section => section.stickers);
  return [...teamStickers, ...specialStickers];
}

// Get team by ID
export function getTeamById(id: string): Team | undefined {
  return teams.find(team => team.id === id);
}

// Get teams by group
export function getTeamsByGroup(group: string): Team[] {
  return teams.filter(team => team.group === group);
}

// Get unique groups
export function getGroups(): string[] {
  return [...new Set(teams.map(team => team.group))].sort();
}
