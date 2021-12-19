export function loadGame<S = {}>(key: string, fallback: S) {
  // @ts-ignore
  return JSON.parse(window.localStorage.getItem(key) || null) || fallback
}

export function saveGame(key: string, data: any) {
  return window.localStorage.setItem(key, JSON.stringify(data))
}