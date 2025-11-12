// data/botecos.ts

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
}

export const db: Boteco[] = [
  // DADOS ANTERIORES (JÁ ESTAVAM NO CÓDIGO)
  {
    id: 'patorroco',
    name: 'Patorroco',
    address: 'R. Turquesa, 875 - Prado, Belo Horizonte',
    latitude: -19.9365,
    longitude: -43.9310,
    rating: 4.8,
    reviews: 231,
    isOpen: true,
    hours: '17:00 - 00:00',
    specialty: 'Bolinho de feijoada e cervejas artesanais.',
    imageUrl: '/images/patorroco.jpg',
    tags: ['prado', 'premiado', 'comida-di-buteco'],
  },
  {
    id: 'bar-do-zeze',
    name: 'Bar do Zezé',
    address: 'R. Pinheiro Chagas, 442 - Barreiro, Belo Horizonte',
    latitude: -19.9328,
    longitude: -43.9333,
    rating: 4.7,
    reviews: 198,
    isOpen: false,
    hours: '18:00 - 23:00',
    specialty: 'Joelho de porco.',
    imageUrl: '/images/bar-do-zeze.jpg',
    tags: ['barreiro', 'tradicional'],
  },
  
  // DADOS NOVOS (ORGANIZADOS A PARTIR DA SUA COLETA)
  {
    id: 'cantina-do-lucas',
    name: 'Cantina do Lucas',
    address: 'Av. Augusto de Lima, 233 - Loja 18/19 - Centro, Belo Horizonte - MG, 30190-001',
    latitude: -19.921345,
    longitude: -43.939512,
    rating: 4.5, // Mantendo os dados originais
    reviews: 312, // Mantendo os dados originais
    isOpen: true,
    hours: '11:30 - 01:00',
    specialty: 'Comida tradicional mineira e italiana',
    imageUrl: '/images/cantina-do-lucas.jpg',
    tags: ['centro', 'classico', 'maletta', 'italiana', 'mineira'],
  },
  {
    id: 'redentor-bar',
    name: 'Redentor Bar',
    address: 'R. Fernandes Tourinho, 500 - Savassi, Belo Horizonte - MG, 30112-000',
    latitude: -19.935321,
    longitude: -43.933845,
    rating: 4.4, // Estimado
    reviews: 250, // Estimado
    isOpen: true,
    hours: '17:00 - 01:00',
    specialty: 'Chopp e petiscos',
    imageUrl: '/images/redentor-bar.jpg',
    tags: ['savassi', 'chopp', 'petiscos', 'happy-hour'],
  },
  {
    id: 'wals-gastropub',
    name: 'Wäls Gastropub',
    address: 'R. Levindo Lopes, 358 - Savassi, Belo Horizonte - MG, 30140-100',
    latitude: -19.93671,
    longitude: -43.93254,
    rating: 4.6, // Estimado
    reviews: 300, // Estimado
    isOpen: true,
    hours: '18:00 - 00:00',
    specialty: 'Cervejas artesanais',
    imageUrl: '/images/wals-gastropub.jpg',
    tags: ['savassi', 'cerveja-artesanal', 'gastropub'],
  },
  {
    id: 'glouton',
    name: 'Glouton',
    address: 'R. Bárbara Heliodora, 59 - Lourdes, Belo Horizonte - MG, 30180-230',
    latitude: -19.930433,
    longitude: -43.945812,
    rating: 4.7, // Estimado
    reviews: 400, // Estimado
    isOpen: true,
    hours: '19:00 - 00:00',
    specialty: 'Cozinha contemporânea',
    imageUrl: '/images/glouton.jpg',
    tags: ['lourdes', 'contemporaneo', 'sofisticado'],
  },
  {
    id: 'baiana-do-acaraje',
    name: 'Baiana do Acarajé',
    address: 'Av. Cristóvão Colombo, 962 - Savassi, Belo Horizonte - MG, 30140-140',
    latitude: -19.9373,
    longitude: -43.9359,
    rating: 4.5, // Estimado
    reviews: 180, // Estimado
    isOpen: true,
    hours: '18:00 - 23:00',
    specialty: 'Comida baiana',
    imageUrl: '/images/baiana-do-acaraje.jpg',
    tags: ['savassi', 'comida-baiana', 'acaraje'],
  },
  {
    id: 'dartagnan-bistro',
    name: 'D\'Artagnan Bistrô',
    address: 'R. Tomás Gonzaga, 607 - Lourdes, Belo Horizonte - MG, 30180-140',
    latitude: -19.93121,
    longitude: -43.94723,
    rating: 4.8, // Estimado
    reviews: 350, // Estimado
    isOpen: false,
    hours: '19:00 - 00:00',
    specialty: 'Comida francesa',
    imageUrl: '/images/dartagnan-bistro.jpg',
    tags: ['lourdes', 'frances', 'bistro', 'romantico'],
  },
  {
    id: 'o-linguiceiro',
    name: 'O LInguíceiro',
    address: 'R. Curitiba, 2220 - Lourdes, Belo Horizonte - MG, 30170-128',
    latitude: -19.93225,
    longitude: -43.94851,
    rating: 4.6, // Estimado
    reviews: 280, // Estimado
    isOpen: true,
    hours: '12:00 - 23:00',
    specialty: 'Linguiças artesanais',
    imageUrl: '/images/o-linguiceiro.jpg',
    tags: ['lourdes', 'linguica', 'artesanal'],
  },
  {
    id: 'stadt-jever',
    name: 'Stadt Jever',
    address: 'Av. do Contorno, 5771 - Savassi, Belo Horizonte - MG, 30110-035',
    latitude: -19.93333,
    longitude: -43.93275,
    rating: 4.3, // Estimado
    reviews: 200, // Estimado
    isOpen: false,
    hours: '18:00 - 01:00',
    specialty: 'Comida alemã',
    imageUrl: '/images/stadt-jever.jpg',
    tags: ['savassi', 'alemao', 'cerveja'],
  },
  {
    id: 'dona-lucinha',
    name: 'Dona Lucinha',
    address: 'R. Padre Odorico, 38 - Savassi, Belo Horizonte - MG, 30110-020',
    latitude: -19.937011,
    longitude: -43.935123,
    rating: 4.6, // Estimado
    reviews: 320, // Estimado
    isOpen: true,
    hours: '12:00 - 15:00, 19:00 - 23:00',
    specialty: 'Comida mineira',
    imageUrl: '/images/dona-lucinha.jpg',
    tags: ['savassi', 'comida-mineira', 'tradicional'],
  },
  {
    id: 'olegario-savassi',
    name: 'Olegário Savassi',
    address: 'R. Pernambuco, 1041 - Savassi, Belo Horizonte - MG, 30130-151',
    latitude: -19.933827,
    longitude: -43.937215,
    rating: 4.5, // Estimado
    reviews: 290, // Estimado
    isOpen: true,
    hours: '18:00 - 00:00',
    specialty: 'Pizzaria',
    imageUrl: '/images/olegario-savassi.jpg',
    tags: ['savassi', 'pizza', 'pizzaria'],
  },
  {
    id: 'lullo-gelato',
    name: 'Lullo Gelato',
    address: 'R. Antônio de Albuquerque, 617 - Savassi, Belo Horizonte - MG, 30112-010',
    latitude: -19.934842,
    longitude: -43.935736,
    rating: 4.9, // Estimado
    reviews: 500, // Estimado
    isOpen: true,
    hours: '12:00 - 22:00',
    specialty: 'Sorvete artesanal',
    imageUrl: '/images/lullo-gelato.jpg',
    tags: ['savassi', 'sorvete', 'gelato', 'sobremesa'],
  },
  {
    id: 'ah-bon-pao-de-queijo',
    name: 'Ah! Bon - Pão de Queijo',
    address: 'R. Fernandes Tourinho, 805 - Savassi, Belo Horizonte - MG, 30112-001',
    latitude: -19.931211,
    longitude: -43.936643,
    rating: 4.7, // Estimado
    reviews: 150, // Estimado
    isOpen: false,
    hours: '07:30 - 19:30',
    specialty: 'Pão de queijo e café',
    imageUrl: '/images/ah-bon-pao-de-queijo.jpg',
    tags: ['savassi', 'cafe', 'pao-de-queijo', 'lanche'],
  },
  {
    id: 'barbazul-o-barba',
    name: 'Barbazul O Barba',
    address: 'Av. Getúlio Vargas, 216 - Funcionários, Belo Horizonte',
    latitude: -19.932391,
    longitude: -43.926326,
    rating: 4.6,
    reviews: 450,
    isOpen: true,
    hours: '11:00 - 02:00',
    specialty: 'Torresmo de Barriga.',
    imageUrl: '/images/barbazul-o-barba.jpg',
    tags: ['savassi', 'funcionarios', 'classico', 'comida-mineira', 'comida-di-buteco', 'botecar'],
  },
  {
    id: 'oratorio',
    name: 'Oratório',
    address: 'Av. Brasil, 161 - Santa Efigênia, Belo Horizonte',
    latitude: -19.923471,
    longitude: -43.921947,
    rating: 4.6,
    reviews: 450,
    isOpen: true,
    hours: '11:00 - 00:00',
    specialty: 'Costela Embriagada.',
    imageUrl: '/images/oratorio.jpg',
    tags: ['santa-efigenia', 'classico', 'comida-mineira', 'comida-di-buteco'],
  },
  {
    id: 'buteco-do-maranhao',
    name: 'Buteco do Maranhão',
    address: 'R. Bernardo Guimarães, 1874 - Lourdes, Belo Horizonte - MG',
    latitude: -19.928424,
    longitude: -43.941862,
    rating: 4.6,
    reviews: 450,
    isOpen: true,
    hours: '09:00 - 00:00',
    specialty: 'Rabo do Coração.',
    imageUrl: '/images/buteco-do-maranhao.jpg',
    tags: ['lourdes', 'classico', 'comida-mineira', 'comida-di-buteco'],
  },
];

// ... (o resto do arquivo, com as funções, continua o mesmo)
export const getAllBotecos = (): Boteco[] => {
  return db;
};

export const getBotecoById = (id: string): Boteco | undefined => {
  return db.find(boteco => boteco.id === id);
};

export const getSuggestedRoutes = () => {
  return [
    {
      name: 'Rota da Savassi',
      botecos: db.filter(b => b.tags.includes('savassi')),
    },
    {
      name: 'Clássicos da Cidade',
      botecos: db.filter(b => b.tags.includes('classico')),
    },
    {
      name: 'Premiados do Comida di Buteco',
      botecos: db.filter(b => b.tags.includes('comida-di-buteco')),
    },
  ];
};