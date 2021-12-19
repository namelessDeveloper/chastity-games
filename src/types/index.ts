export type Action<Actions extends string, T = any> = {
  type: Actions;
  payload?: T;
}