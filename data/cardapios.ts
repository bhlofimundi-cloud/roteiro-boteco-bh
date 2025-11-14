interface CardapioItem { name: string; description: string; price: string; thumbnailUrl: string; videoUrl?: string; }
interface Cardapio { botecoId: string; categories: { title: string; items: CardapioItem[]; }[]; }
interface CardapioTheme { botecoId: string; logoUrl: string; backgroundUrl: string; }

export const cardapiosDB: Cardapio[] = [
  { botecoId: 'barbazul-o-barba', categories: [ { title: 'Tira-gostos', items: [ { name: 'Torresmo de Barriga', description: 'Crocante por fora, macio por dentro.', price: 'R$ 45,90', thumbnailUrl: '/images/cardapio/barbazul/torresmo_barriga.png', videoUrl: '/videos/cardapio/barbazul/v_t_barriga_ofi.mp4', }, { name: 'Feijão Tropeiro', description: 'O clássico mineiro, completo e bem servido.', price: 'R$ 55,00', thumbnailUrl: '/images/cardapio/barbazul/tropeiro.png', videoUrl: '/videos/cardapio/barbazul/v_tropeiro_ofi.mp4', }, { name: 'Rabada com Agrião', description: 'Cozida lentamente, desmanchando. Acompanha angu.', price: 'R$ 62,00', thumbnailUrl: '/images/cardapio/barbazul/rabada.png', videoUrl: '/videos/cardapio/barbazul/v_rabada_ofi.mp4', }, ], }, { title: 'Bebidas & Drinks', items: [ { name: 'Caipirinha', description: 'A clássica, com cachaça da casa.', price: 'R$ 18,00', thumbnailUrl: '/images/cardapio/barbazul/caipirinha.png', videoUrl: '/videos/cardapio/barbazul/v_caipirinha.mp4', }, { name: 'Drink Barbazul', description: 'Nosso drink secreto, gin com frutas cítricas.', price: 'R$ 28,00', thumbnailUrl: '/images/cardapio/barbazul/drink_barbazul.png', videoUrl: '/videos/cardapio/barbazul/v_drink_barbazul.mp4', }, ], }, ], },
];

export const themesDB: CardapioTheme[] = [
  { botecoId: 'barbazul-o-barba', logoUrl: '/images/cardapio/barbazul/logo.png', backgroundUrl: '/images/cardapio/barbazul/fundo.jpg', },
];

export const getCardapioByBotecoId = (id: string) => cardapiosDB.find(c => c.botecoId === id);
export const getThemeByBotecoId = (id: string) => themesDB.find(t => t.botecoId === id);