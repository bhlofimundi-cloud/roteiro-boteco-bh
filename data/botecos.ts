export interface Boteco {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviews: number;
  isOpen: boolean;
  hours: string;
  specialty: string;
  imageUrl: string;
  tags: string[];
  isHighlight?: boolean;
  isPartner?: boolean;
}

export const db: Boteco[] = [
  // BARES DO FESTIVAL BOTECAR
  { id: 'bar-do-kxote', name: 'Bar do Kxote (Vencedor)', address: 'R. José Faleiro, 219 - Santa Helena, Barreiro', latitude: -19.98333, longitude: -44.01345, rating: 4.9, reviews: 350, isOpen: true, hours: '17:00 - 23:30', specialty: 'Lombo Barroco', imageUrl: '/images/F_Botecar/kxote.png', tags: ['botecar-2024', 'vencedor', 'barreiro', 'tropeirao', 'torresmo-de-responsa'], isHighlight: true, },
  { id: 'the-bulltique-vino-bar', name: 'The Bulltique Vino Bar (2º lugar)', address: 'R. Maria Madalena Esteves, 159 - Minaslandia', latitude: -19.85113, longitude: -43.93170, rating: 4.8, reviews: 280, isOpen: true, hours: '18:00 - 00:00', specialty: 'Duo de língua do Bola', imageUrl: '/images/F_Botecar/bultique.png', tags: ['botecar-2024', 'finalista', 'norte', 'vinho', 'bom-pra-date'], isHighlight: true, },
  { id: 'bar-laminense', name: 'Bar Laminense (3º lugar)', address: 'R. Cocais, 728 - Esplanada, Leste', latitude: -19.90395, longitude: -43.89990, rating: 4.8, reviews: 310, isOpen: false, hours: '16:00 - 23:00', specialty: 'Jeitin de Vó', imageUrl: '/images/F_Botecar/laminense.png', tags: ['botecar-2024', 'finalista', 'leste', 'comida-di-buteco'], isHighlight: true, },
  { id: 'bistro-garagem-do-gunda', name: 'Bistrô Garagem do Gunda (4º lugar)', address: 'R. Alamanda, 170 - Lindéia, Barreiro', latitude: -19.97517, longitude: -44.05147, rating: 4.7, reviews: 260, isOpen: true, hours: '18:30 - 23:00', specialty: 'Segredos de Yara', imageUrl: '/images/F_Botecar/gunda.png', tags: ['botecar-2024', 'finalista', 'barreiro', 'bistro'], isHighlight: true, },
  { id: 'peixinho-da-ju', name: 'Peixinho da Ju (5º lugar)', address: 'Av. Saramenha, 765 - Guarani, Norte', latitude: -19.84009, longitude: -43.92535, rating: 4.7, reviews: 290, isOpen: true, hours: '17:00 - 23:00', specialty: 'Pastel de Rede', imageUrl: '/images/F_Botecar/peixinhoju.png', tags: ['botecar-2024', 'finalista', 'norte', 'frutos-do-mar'], isHighlight: true, },
  { id: 'aqui-tudo-e-bom-prado', name: 'Aqui Tudo É Bom Prado', address: 'R. Chopin, 22 - Prado, Oeste', latitude: -19.92496, longitude: -43.96414, rating: 4.6, reviews: 220, isOpen: true, hours: '11:00 - 22:00', specialty: 'Paletinha no Barro', imageUrl: '/images/F_Botecar/tudo-e-bom-prado.png', tags: ['botecar-2024', 'oeste', 'prado', 'bom-pra-date'], },
  { id: 'o-barba', name: 'O Barba', address: 'Av. Getulio Vargas, 216 - Funcionários', latitude: -19.93250, longitude: -43.92630, rating: 4.5, reviews: 240, isOpen: true, hours: '12:00 - 01:00', specialty: 'Costela do Capitão Makita', imageUrl: '/images/F_Botecar/barba.png', tags: ['botecar-2024', 'centro-sul', 'torresmo-de-responsa'], },
  { id: 'tudo-legal-silva-lobo', name: 'Tudo Legal Silva Lobo', address: 'Av. Silva Lobo, 2039 - Grajaú, Oeste', latitude: -19.94081, longitude: -43.96606, rating: 4.4, reviews: 180, isOpen: false, hours: '16:00 - 00:00', specialty: 'Costura na Costela', imageUrl: '/images/F_Botecar/tudo-legal-lobo.png', tags: ['botecar-2024', 'oeste', 'grajau'], },
  { id: 'verdinho', name: 'Verdinho', address: 'Av. Consul Antônio Cadar, 122 - São Bento', latitude: -19.95509, longitude: -43.95041, rating: 4.6, reviews: 210, isOpen: true, hours: '11:30 - 23:00', specialty: 'Lingua a Moda Murilo de Castro', imageUrl: '/images/F_Botecar/verdinho.png', tags: ['botecar-2024', 'centro-sul', 'sao-bento'], },
  { id: 'zezao-bar', name: 'Zezão Bar', address: 'R. José Alencar, 799 - Nova Suíça, Oeste', latitude: -19.93097, longitude: -43.97919, rating: 4.5, reviews: 190, isOpen: true, hours: '17:00 - 23:00', specialty: 'Fuxicando', imageUrl: '/images/F_Botecar/zezao.png', tags: ['botecar-2024', 'oeste', 'tradicional', 'torresmo-de-responsa'], },
  // BARES ANTERIORES
  { id: 'patorroco', name: 'Patorroco', address: 'R. Turquesa, 875 - Prado', latitude: -19.9238, longitude: -43.9605, rating: 4.8, reviews: 231, isOpen: true, hours: '17:00 - 00:00', specialty: 'Bolinho de feijoada', imageUrl: '/images/patorroco.jpg', tags: ['prado', 'premiado', 'comida-di-buteco'], },
  { id: 'barbazul-o-barba', name: 'Barbazul O Barba', address: 'Av. Getúlio Vargas, 216 - Funcionários', latitude: -19.932391, longitude: -43.926326, rating: 4.6, reviews: 450, isOpen: true, hours: '11:00 - 02:00', specialty: 'Torresmo de Barriga', imageUrl: '/images/barbazul-o-barba.jpg', tags: ['savassi', 'classico', 'comida-di-buteco', 'torresmo-de-responsa'], isPartner: true, },
];

export const getAllBotecos = (): Boteco[] => db;
export const getBotecoById = (id: string): Boteco | undefined => db.find(b => b.id === id);