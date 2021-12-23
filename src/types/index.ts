export type Action<Actions extends string, T = any> = {
  type: Actions;
  payload?: T;
}

export enum Mode {
  preview = 'preview',
  real = 'real',
}

export type ChastityGame = {
  sentence: number;
  mode: Mode;
  nextTurn: number;
  count: number;
  flavorText?: string;
  gameOver?: boolean;
}