export type GameConfig = {
  slug: string;
  name: string;
  description: string;
  compatibility: Array<'pc' | 'cell'>;
};

export const games: GameConfig[] = [
  {
    slug: 'jogo-exemplo',
    name: 'Jogo Exemplo',
    description: 'Jogo de demonstracao para validar a estrutura.',
    compatibility: ['pc'],
  },
  {
    slug: 'pixel-duel',
    name: 'Pixel Duel',
    description: 'Joguinho de luta feito em JavaScript e HTML.',
    compatibility: ['pc'],
  },
];
