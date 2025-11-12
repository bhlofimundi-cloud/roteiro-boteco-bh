// data/cardapios.ts

interface CardapioItem {
  name: string;
  description: string;
  price: string;
  thumbnailUrl: string;
  videoUrl?: string;
}

interface Cardapio {
  botecoId: string;
  categories: {
    title: string;
    items: CardapioItem[];
  }[];
}

interface CardapioTheme {
  botecoId: string;
  logoUrl: string;
  backgroundUrl: string;
}

export const cardapiosDB: Cardapio[] = [
  {
    botecoId: 'barbazul-o-barba',
    categories: [
      {
        title: 'Tira-gostos',
        items: [
          {
            name: 'Torresmo de Barriga',
            description: 'Nossa especialidade: crocante por fora, macio por dentro.',
            price: 'R$ 45,90',
            thumbnailUrl: '/images/cardapio/barbazul/torresmo_barriga.png',
            videoUrl: '/videos/cardapio/barbazul/v_t_barriga_ofi.mp4',
          },
          {
            name: 'Feijão Tropeiro',
            description: 'O clássico mineiro, completo e bem servido.',
            price: 'R$ 55,00',
            thumbnailUrl: '/images/cardapio/barbazul/tropeiro.png',
            videoUrl: '/videos/cardapio/barbazul/v_tropeiro_ofi.mp4',
          },
          {
            name: 'Rabada com Agrião',
            description: 'Cozida lentamente, desmanchando. Acompanha angu.',
            price: 'R$ 62,00',
            thumbnailUrl: '/images/cardapio/barbazul/rabada.png',
            videoUrl: '/videos/cardapio/barbazul/v_rabada_ofi.mp4',
          },
          {
            name: 'Filé com Fritas',
            description: 'Iscas de filé acebolado com fritas sequinhas.',
            price: 'R$ 68,00',
            thumbnailUrl: '/images/cardapio/barbazul/file_fritas.png',
            videoUrl: '/videos/cardapio/barbazul/v_file_fritas_ofi.mp4',
          },
          {
            name: 'Batata QB (Queijo, Bacon, Requeijão)',
            description: 'Batatas fritas cobertas com muito queijo, bacon e requeijão cremoso.',
            price: 'R$ 48,00',
            thumbnailUrl: '/images/cardapio/barbazul/batataQB_B_R.png',
            videoUrl: '/videos/cardapio/barbazul/v_batata_QB_ofi.mp4',
          },
        ],
      },
      {
        title: 'Bebidas & Drinks',
        items: [
          {
            name: 'Caipirinha',
            description: 'A clássica, feita com cachaça da casa e limão fresco.',
            price: 'R$ 18,00',
            thumbnailUrl: '/images/cardapio/barbazul/caipirinha.png',
            videoUrl: '/videos/cardapio/barbazul/v_caipirinha.mp4',
          },
          {
            name: 'Caipixi',
            description: 'Uma releitura com abacaxi e um toque de hortelã.',
            price: 'R$ 22,00',
            thumbnailUrl: '/images/cardapio/barbazul/caipixi.png',
            videoUrl: '/videos/cardapio/barbazul/v_caipixi.mp4',
          },
          {
            name: 'Drink Barbazul',
            description: 'Nosso drink secreto, uma mistura de gin com frutas cítricas.',
            price: 'R$ 28,00',
            thumbnailUrl: '/images/cardapio/barbazul/drink_barbazul.png',
            videoUrl: '/videos/cardapio/barbazul/v_drink_barbazul.mp4',
          },
        ],
      },
    ],
  },
];

export const themesDB: CardapioTheme[] = [
  {
    botecoId: 'barbazul-o-barba',
    logoUrl: '/images/cardapio/barbazul/logo.png',
    backgroundUrl: '/images/cardapio/barbazul/fundo.jpg',
  },
];

export const getCardapioByBotecoId = (botecoId: string) => cardapiosDB.find(c => c.botecoId === botecoId);
export const getThemeByBotecoId = (botecoId: string) => themesDB.find(t => t.botecoId === botecoId);