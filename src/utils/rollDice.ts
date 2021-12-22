function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function flipCoin() {
  return Math.floor(Math.random() * 2)
}

export function coinToString(coin: number) {
  return coin ? 'heads' : 'tails'
}

export class Coin {
  value = random(0, 1);
  text = this.value ? 'heads' : 'tails'
}

export class Dice {
  constructor(private sides: number = 6) {}
  value: number = random(0, this.sides)
  text = this.value
}