import { Candle, Cryptos } from './cryptos';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptosService {
  constructor(private readonly httpService: HttpService) {}

  getHelloFront(): string {
    console.log('Get Data received');
    return 'Hello Frontend!';
  }

  async getCryptoData(cryptos: Cryptos) {
    const url = `https://api.binance.com/api/v3/klines?symbol=${cryptos.symbol.toUpperCase()}&interval=${
      cryptos.interval
    }&limit=${cryptos.limit}`;
    console.log(url);

    const result = await this.httpService.get(url).toPromise();
    console.log(result.status);
    console.log(JSON.stringify(result.data));

    const candles = result.data.map((k: any) => {
      return new Candle(k[0], k[1], k[2], k[3], k[4]);
    });

    return candles;
  }
}
