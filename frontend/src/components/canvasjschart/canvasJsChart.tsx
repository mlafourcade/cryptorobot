import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getCandles } from "../../services/DataService";
import { AChart } from "../apexcharts";
import { useContextChart } from "./canvasJsWindow";
import useWebSocket from "react-use-websocket";
import { Candle, dataChart } from "./cryptos";

type BinanceFormat = {
  E: number;
  e: string;
  k: {
    B: string;
    L: number;
    Q: string;
    T: number;
    V: string;
    c: string;
    f: number;
    h: string;
    i: string;
    l: string;
    n: number;
    o: string;
    q: string;
    s: string;
    t: number;
    v: string;
    x: boolean;
  };
  s: string;
};

export const CanvasJsWindowChartArea = () => {
  const { symbol } = useContextChart();
  const { interval } = useContextChart();
  const { limit } = useContextChart();

  const dataProps: dataChart[] = [];

  const [data, setData] = useState(dataProps);

  useEffect(() => {
    console.log("useEfect");
    getCandles(symbol, interval, limit)
      .then((value: any) => setData(value))
      .catch((err) => alert(err.response ? err.response.data : err.message));
  }, [symbol, interval, limit]);

  const { lastJsonMessage } = useWebSocket(
    `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`,
    {
      onOpen: () => console.log(`Connected to App WS`),
      onMessage: () => {
        if (lastJsonMessage) {
          const DataBinance = lastJsonMessage as BinanceFormat;
          const CurrentlyDate = new Date(DataBinance.k.t);
          const newCandle = new Candle(
            CurrentlyDate,
            DataBinance.k.o,
            DataBinance.k.h,
            DataBinance.k.l,
            DataBinance.k.c
          );
          console.log("newCandle = ", newCandle);
          const newData = [...data];
          if (DataBinance.k.x === false) {
            //candle incompleto
            newData[newData.length - 1] = newCandle; //substitui último candle pela versão atualizada
          } else {
            //remove candle primeiro candle e adiciona o novo último
            newData.splice(0, 1);
            newData.push(newCandle);
          }
          setData(newData);
        }
      },
      onError: (event: any) => console.error(event),
      shouldReconnect: (closeEvent) => true,
      reconnectInterval: 3000,
    }
  );

  return (
    <Grid container height="75.4vh" width="74.9vw">
      <Box
        width="100%"
        height="100%"
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        <AChart data={data} />
      </Box>
    </Grid>
  );
};
