export function flipCoin() {
  return Math.floor(Math.random() * 2)
}

export function coinToString(coin: number) {
  return coin ? 'heads' : 'tails'
}