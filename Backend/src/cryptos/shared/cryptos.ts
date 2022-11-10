export class Cryptos {
  symbol: string;
  interval: string;
  limit: number;
}

export class Candle {
  x: Date;
  y: [number, number, number, number];
  constructor(
    openTime: Date,
    open: string,
    high: string,
    low: string,
    close: string,
  ) {
    this.x = new Date(openTime);
    this.y = [
      parseFloat(open),
      parseFloat(high),
      parseFloat(low),
      parseFloat(close),
    ];
  }
}
