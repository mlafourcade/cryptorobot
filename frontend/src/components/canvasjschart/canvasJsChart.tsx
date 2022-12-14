import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getCandles } from "../../services/DataService";
import { AChart } from "../apexcharts";
import useWebSocket from "react-use-websocket";
import { Candle, DataChartArray, DataLineChart } from "./cryptos";
import { useCryptoContext } from "../../contexts";

let ws: WebSocket;

let AuxMAdataPoints: DataLineChart[] = [];
let update: number = 0;

async function delayMA(time: number) {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      resolve("End Delay");
    }, time);
  });
}

async function MAcalcule(
  date: Date,
  ClosePrice: number,
  index: number,
  vmedia: number
): Promise<DataLineChart> {
  return new Promise(async (resolve, reject) => {
    AuxMAdataPoints.push({
      x: date,
      y: ClosePrice,
    });

    // console.log("AuxMAdataPoints.length ", AuxMAdataPoints.length);
    // console.log("AuxMAdataPoints ", AuxMAdataPoints);

    if (index >= vmedia) {
      var sum = 0;
      for (var icnt = 0; icnt < vmedia; icnt++) {
        sum = sum + AuxMAdataPoints[icnt + 1].y;
        // console.log(
        //   "AuxMAdataPoints[" + icnt + "].y = ",
        //   AuxMAdataPoints[icnt].y
        // );
      }
      var CalcMedia = sum / vmedia;

      let CalcMAValue: DataLineChart = {
        x: date,
        y: parseFloat(CalcMedia.toFixed(6)),
      };

      // await delayMA(5000)
      //   .then((result) => {
      //     console.log(result);
      //   })
      //   .catch(() => {});

      resolve(CalcMAValue);
    } else {
      reject();
    }
  });
}

async function SDcalcule(vmedia: number, CalcMedia: number): Promise<number> {
  return new Promise((resolve, reject) => {
    var SDsum = 0;
    for (var icnt = 0; icnt < vmedia; icnt++) {
      var fsum = AuxMAdataPoints[icnt].y - CalcMedia;
      var Potdata = Math.pow(fsum, 2);
      SDsum = SDsum + Potdata;
    }

    let MediaDesvioPadrao = SDsum / vmedia;
    let CalcDesvioPadrao = Math.pow(MediaDesvioPadrao, 0.5);

    AuxMAdataPoints.shift();

    //console.log("AuxMAdataPoints.shift ", AuxMAdataPoints.length);

    resolve(CalcDesvioPadrao);
  });
}

function BollingerUpCalcule(
  axisX: Date,
  madata: number,
  sddata: number
): Promise<DataLineChart> {
  return new Promise((resolve, reject) => {
    let cal1 = sddata * 2;
    let calculeup = madata + cal1;

    let CalcSDValue: DataLineChart = {
      x: axisX,
      y: parseFloat(calculeup.toFixed(5)),
    };

    resolve(CalcSDValue);
  });
}

function BollingerDownCalcule(
  axisX: Date,
  madata: number,
  sddata: number
): Promise<DataLineChart> {
  return new Promise((resolve, reject) => {
    let cal1 = sddata * 2;
    let calculedown = madata - cal1;

    let CalcSDValue: DataLineChart = {
      x: axisX,
      y: parseFloat(calculedown.toFixed(5)),
    };

    resolve(CalcSDValue);
  });
}

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

const initialDataState: DataChartArray = {
  dataPoints: [],
  dataPointsV: [],
  dataPointsMA: [],
  dataPointsBolU: [],
  dataPointsBolD: [],
};

export const CanvasJsWindowChartArea = () => {
  const { symbol, interval, limit, handleCrypto, toggleColorPrice } =
    useCryptoContext();
  const [data, setData] = useState(initialDataState);
  const [chartUpdate, setchartUpdate] = useState(0);

  useEffect(() => {
    console.log("Load New Chart instance");
    getCandles(symbol, interval, limit)
      .then(async (value: any) => {
        const dataPointsArray: DataChartArray = {
          dataPoints: value,
          dataPointsV: [],
          dataPointsMA: [],
          dataPointsBolU: [],
          dataPointsBolD: [],
        };

        AuxMAdataPoints.length = 0;
        dataPointsArray.dataPointsBolU.length = 0;
        dataPointsArray.dataPointsBolD.length = 0;

        dataPointsArray.dataPointsV.length = 0;
        for (let i = 0; i < value.length; i++) {
          dataPointsArray.dataPointsV.push({
            x: value[i].x,
            y: value[i].v,
          });
          await MAcalcule(value[i].x, value[i].y[3], i, 20)
            .then(async (maresult) => {
              dataPointsArray.dataPointsMA.push(maresult);
              // console.log("value[" + i + "].y[3]", value[i].y[3]);
              // console.log(maresult);
              //console.log("MA index = ", i);
              await SDcalcule(20, maresult.y)
                .then(async (sdresult) => {
                  //console.log("SD result = ", sdresult);
                  //console.log("SD index = ", i);
                  await BollingerUpCalcule(value[i].x, maresult.y, sdresult)
                    .then(async (buresult) => {
                      //console.log("dataPointsBolU = ", buresult);
                      dataPointsArray.dataPointsBolU.push(buresult);
                    })
                    .catch(() => {});
                  await BollingerDownCalcule(value[i].x, maresult.y, sdresult)
                    .then(async (bdresult) => {
                      //console.log("dataPointsBolD = ", bdresult);
                      dataPointsArray.dataPointsBolD.push(bdresult);
                    })
                    .catch(() => {});
                })

                .catch(() => {});
            })
            .catch(() => {});
        }
        setData(dataPointsArray);
      })
      .catch((err) => alert(err.response ? err.response.data : err.message));
  }, [symbol, interval, limit, chartUpdate]);

  useEffect(() => {
    WebSocketInit()
      .then((res) => {
        console.log("WebSocket update === ", update);
        setchartUpdate(update++);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [symbol, interval, limit]);

  const WebSocketInit = () => {
    return new Promise((resolve, reject) => {
      if (ws) {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        } else {
          console.log("readyState = ", ws.readyState);
        }
        reject("websocket error");
      } else {
        ws = new WebSocket("wss://stream.binance.com:9443/ws");

        ws.addEventListener("open", socketOpenListener);
        ws.addEventListener("message", socketMessageListener);
        ws.addEventListener("close", socketCloseListener);
        ws.addEventListener("ping", socketPingListener);
        ws.addEventListener("error", socketErrorListener);
        ws.addEventListener("onopen", socketonopenListener);
        ws.addEventListener("onclose", socketoncloseListener);
        ws.addEventListener("onerror", socketonerrorListener);
        resolve("Loaded Websocket List");
      }
    });
  };

  const socketMessageListener = async (event: MessageEvent<any>) => {
    let myArr = JSON.parse(event.data);

    if (myArr.k) {
      if (myArr.k.x === true) {
        console.log("update === ", update);
        setchartUpdate(update++);
      } else {
        let JsonData = myArr.k;
        console.log("Inside JsonValue.c = ", JsonData.c);
        const CurrentlyDate = new Date(myArr.k.t);

        if (JsonData.i === "5m") {
          const newCandle = new Candle(
            CurrentlyDate,
            JsonData.o,
            JsonData.h,
            JsonData.l,
            JsonData.c,
            JsonData.v
          );

          const newDataArray: DataChartArray = {
            dataPoints: [...data.dataPoints],
            dataPointsBolD: [...data.dataPointsBolD],
            dataPointsBolU: [...data.dataPointsBolU],
            dataPointsMA: [...data.dataPointsMA],
            dataPointsV: [...data.dataPointsV],
          };

          // //substitui ??ltimo candle pela vers??o atualizada
          // newDataArray.dataPoints[newDataArray.dataPoints.length - 1] =
          //   newCandle;
          // newDataArray.dataPointsV[newDataArray.dataPointsV.length - 1] = {
          //   x: CurrentlyDate,
          //   y: parseInt(myArr.k.v),
          // };
          // newDataArray.dataPointsV.shift();

          // AuxMAdataPoints.length = 0;
          // newDataArray.dataPointsMA.length = 0;
          // newDataArray.dataPointsBolU.length = 0;
          // newDataArray.dataPointsBolD.length = 0;

          // for (let i = 0; i < newDataArray.dataPoints.length; i++) {
          //   await MAcalcule(
          //     newDataArray.dataPoints[i].x,
          //     newDataArray.dataPoints[i].y[3],
          //     i,
          //     20
          //   )
          //     .then(async (maresult) => {
          //       newDataArray.dataPointsMA.push(maresult);
          //       await SDcalcule(20, maresult.y)
          //         .then(async (sdresult) => {
          //           await BollingerUpCalcule(
          //             newDataArray.dataPoints[i].x,
          //             maresult.y,
          //             sdresult
          //           )
          //             .then(async (buresult) => {
          //               newDataArray.dataPointsBolU.push(buresult);
          //             })
          //             .catch(() => {});
          //           await BollingerDownCalcule(
          //             newDataArray.dataPoints[i].x,
          //             maresult.y,
          //             sdresult
          //           )
          //             .then(async (bdresult) => {
          //               newDataArray.dataPointsBolD.push(bdresult);
          //             })
          //             .catch(() => {});
          //         })
          //         .catch(() => {});
          //     })
          //     .catch(() => {});
          // }

          // setData(newDataArray);
          handleCrypto(parseFloat(JsonData.c));
        } else if (myArr.result === null) {
          console.log("Inside JsonValue = ", myArr.result);
        } else {
          console.log("sei la = ", myArr);
        }
      }
    }
  };

  function WaitforReadyState() {
    return new Promise((resolve, reject) => {
      if (ws.readyState === 1) resolve("wss.readyState ok");
    });
  }

  const socketOpenListener = async (event: Event) => {
    console.log("socketOpenListener");

    await WaitforReadyState().then((res) => {
      console.log(res);
    });

    console.log("Set Inside SUBSCRIBE");

    var SubscribeData = {
      method: "SUBSCRIBE",
      params: ["xlmusdt@kline_5m"],
      id: 1,
    };

    ws.send(JSON.stringify(SubscribeData));
  };
  const socketPingListener = () => {};
  const socketErrorListener = (event: Event) => {
    console.log("socketErrorListener");
  };
  const socketonopenListener = () => {
    console.log("Listener Binance onopen ");
  };
  const socketoncloseListener = () => {
    console.log("Binance onclose ");
  };
  const socketonerrorListener = () => {
    console.log("socketonerrorListener ");
  };
  const socketCloseListener = (event: CloseEvent) => {
    console.log("Disconnected");
  };

  const { lastJsonMessage } = useWebSocket(
    `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`,
    {
      onOpen: () => console.log(`Connected to App WS`),
      onMessage: async () => {
        if (lastJsonMessage) {
          const DataBinance = lastJsonMessage as BinanceFormat;
          const CurrentlyDate = new Date(DataBinance.k.t);

          console.log("DataBinance.k.c = ", DataBinance.k.c);

          const direction: number =
            parseFloat(DataBinance.k.c) - parseFloat(DataBinance.k.o);
          toggleColorPrice(direction < 0 ? "low" : "high");

          const newCandle = new Candle(
            CurrentlyDate,
            DataBinance.k.o,
            DataBinance.k.h,
            DataBinance.k.l,
            DataBinance.k.c,
            DataBinance.k.v
          );

          const newDataArray: DataChartArray = {
            dataPoints: [...data.dataPoints],
            dataPointsBolD: [...data.dataPointsBolD],
            dataPointsBolU: [...data.dataPointsBolU],
            dataPointsMA: [...data.dataPointsMA],
            dataPointsV: [...data.dataPointsV],
          };

          //candle incompleto
          if (DataBinance.k.x === false) {
            //substitui ??ltimo candle pela vers??o atualizada
            newDataArray.dataPoints[newDataArray.dataPoints.length - 1] =
              newCandle;
            newDataArray.dataPointsV[newDataArray.dataPointsV.length - 1] = {
              x: CurrentlyDate,
              y: parseInt(DataBinance.k.v),
            };
          } else {
            //remove primeiro candle e adiciona o novo ??ltimo
            newDataArray.dataPoints.push(newCandle);
            newDataArray.dataPoints.shift();
            newDataArray.dataPointsV.push({
              x: CurrentlyDate,
              y: parseInt(DataBinance.k.v),
            });
            newDataArray.dataPointsV.shift();
          }

          // AuxMAdataPoints.length = 0;
          // newDataArray.dataPointsMA.length = 0;
          // newDataArray.dataPointsBolU.length = 0;
          // newDataArray.dataPointsBolD.length = 0;

          // for (let i = 0; i < newDataArray.dataPoints.length; i++) {
          //   await MAcalcule(
          //     newDataArray.dataPoints[i].x,
          //     newDataArray.dataPoints[i].y[3],
          //     i,
          //     20
          //   )
          //     .then(async (maresult) => {
          //       newDataArray.dataPointsMA.push(maresult);
          //       await SDcalcule(20, maresult.y)
          //         .then(async (sdresult) => {
          //           await BollingerUpCalcule(
          //             newDataArray.dataPoints[i].x,
          //             maresult.y,
          //             sdresult
          //           )
          //             .then(async (buresult) => {
          //               newDataArray.dataPointsBolU.push(buresult);
          //             })
          //             .catch(() => {});
          //           await BollingerDownCalcule(
          //             newDataArray.dataPoints[i].x,
          //             maresult.y,
          //             sdresult
          //           )
          //             .then(async (bdresult) => {
          //               newDataArray.dataPointsBolD.push(bdresult);
          //             })
          //             .catch(() => {});
          //         })
          //         .catch(() => {});
          //     })
          //     .catch(() => {});
          // }

          setData(newDataArray);
          handleCrypto(parseFloat(DataBinance.k.c));
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
