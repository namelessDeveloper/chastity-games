export type Action<Actions extends string, T = any> = {
  type: Actions;
  payload?: T;
}

export enum Mode {
  preview = 'preview',
  real = 'real',
}
