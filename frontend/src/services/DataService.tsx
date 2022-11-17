import axios from "axios";

export async function getCandles(
  candleSymbol: string,
  candleInterval: string,
  candleLimit: number
): Promise<string> {
  const url = `http://localhost:3001/cryptos`;

  let ret: any = "Retorno da Função";

  await axios
    .post(url, {
      symbol: candleSymbol,
      interval: candleInterval,
      limit: candleLimit,
    })
    .then(function (response) {
      //console.log(response.data);
      ret = response.data;
    })
    .catch(function (error) {
      console.log(error);
      ret = error;
    });

  return ret;
}
