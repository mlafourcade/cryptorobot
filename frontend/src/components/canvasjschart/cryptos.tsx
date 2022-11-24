export type CandleY = [number, number, number, number];

export type DataChart = {
  x: Date;
  y: CandleY;
};

export type DataLineChart = {
  x: Date;
  y: number;
};

export type DataChartArray = {
  dataPoints: DataChart[];
  dataPointsV: DataLineChart[];
  dataPointsMA: DataLineChart[];
  dataPointsBolU: DataLineChart[];
  dataPointsBolD: DataLineChart[];
};

export class Candle {
  x: Date;
  y: CandleY;
  v: number;
  constructor(
    openTime: Date,
    open: string,
    high: string,
    low: string,
    close: string,
    volume: string
  ) {
    this.x = new Date(openTime);
    this.y = [
      parseFloat(open),
      parseFloat(high),
      parseFloat(low),
      parseFloat(close),
    ];
    this.v = parseInt(volume);
  }
}
