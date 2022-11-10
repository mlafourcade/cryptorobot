import { Injectable } from '@nestjs/common';
import { Klines } from './klines';

@Injectable()
export class KlinesService {
  getKlines(): string {
    return 'Get Klines!';
  }
  getData(parameters: string): string {
    return parameters;
  }
  async KlineData(kline: Klines) {
    const url = `https://api.binance.com/api/v3/klines?symbol=${kline.symbol}&interval=${kline.interval}&limit=60`;
    console.log(url);

    //this.httpService.get(url);

    // fetch(url).then((response) => {
    //   if (!response.ok) {
    //     throw new Error(response.statusText);
    //   }
    //   return response.json();
    // });

    // fetch(url, { method: 'GET', mode: 'no-cors' })
    //   .then((T) => T.json())
    //   .then((data) => {
    //     console.log(data);
    //   });

    /*const request : Request = (
      {
        url: load_url,
        json: true,
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) resolve(body);
        else reject(error);
      }
    ) => {};*/

    //const response = await axios.get(url);
    //console.log(response);
    return kline;
  }
}
