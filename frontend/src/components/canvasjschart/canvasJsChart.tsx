import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getCandles } from "../../services/DataService";
import { AChart } from "../apexcharts";
import { useContextChart } from "./canvasJsWindow";
import useWebSocket from "react-use-websocket";
import { Candle, dataChart, dataChartArray, dataLineChart } from "./cryptos";

let AuxMAdataPoints: dataLineChart[] = [];

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
): Promise<dataLineChart> {
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

      let CalcMAValue: dataLineChart = {
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
): Promise<dataLineChart> {
  return new Promise((resolve, reject) => {
    let cal1 = sddata * 2;
    let calculeup = madata + cal1;

    let CalcSDValue: dataLineChart = {
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
): Promise<dataLineChart> {
  return new Promise((resolve, reject) => {
    let cal1 = sddata * 2;
    let calculedown = madata - cal1;

    let CalcSDValue: dataLineChart = {
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

// const ids: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const InitApp = async () => {
//   await getPostSerialized(ids);
// };

// const getPost = async (id: number) => {
//   return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}.json()`);
// };

// const getPostSerialized = async (ids: number[]) => {
//   for (let i = 0; i < ids.length; i++) {
//     const data = await getPost(ids[1]);
//     console.log(data);
//   }
//   console.log("Waiting looping");
// };

// const loadBuffers = async (value: any, dataPointsArray: dataChartArray) => {
//   const TesteDataPointsMA: dataLineChart[] = [];

//   AuxMAdataPoints.length = 0;

//   for (let i = 0; i < value.length; i++) {
//     console.log("value[" + i + "].y[3] = ", value[i].y[3]);
//     await MAcalcule(value[i].x, value[i].y[3], i, 20)
//       .then(async (result) => {
//         dataPointsArray.dataPointsMA.push(result);
//         await SDcalcule(20, result.y)
//           .then(async (result) => {
//             await BollingerUpCalcule(value[i].x, value[i].y[0], result)
//               .then(async (result) => {
//                 TesteDataPointsMA.push(result);
//                 console.log("TesteDataPointsMA = ", TesteDataPointsMA);
//                 //dataPointsArray.dataPointsBolU.push(result);
//               })
//               .catch(() => {});
//             await BollingerDownCalcule(value[i].x, value[i].y[0], result)
//               .then(async (result) => {
//                 //dataPointsArray.dataPointsBolD.push(result);
//               })
//               .catch(() => {});
//           })
//           .catch(() => {});
//       })
//       .catch(() => {});
//   }
// };

export const CanvasJsWindowChartArea = () => {
  const { symbol } = useContextChart();
  const { interval } = useContextChart();
  const { limit } = useContextChart();

  const dataProps: dataChartArray = {
    dataPoints: [],
    dataPointsV: [],
    dataPointsMA: [],
    dataPointsBolU: [],
    dataPointsBolD: [],
  };

  const [data, setData] = useState(dataProps);

  // const getCandlesSerialized = async (
  //   ids: dataChart[],
  //   dataPointsArray: dataChartArray
  // ) => {};

  useEffect(() => {
    getCandles(symbol, interval, limit)
      .then(async (value: any) => {
        const dataPointsArray: dataChartArray = {
          dataPoints: value,
          dataPointsV: [],
          dataPointsMA: [],
          dataPointsBolU: [],
          dataPointsBolD: [],
        };

        AuxMAdataPoints.length = 0;
        dataPointsArray.dataPointsBolU.length = 0;
        dataPointsArray.dataPointsBolD.length = 0;
        for (let i = 0; i < value.length; i++) {
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
        // console.log("Waiting looping");
      })
      .catch((err) => alert(err.response ? err.response.data : err.message));
  }, [symbol, interval, limit]);

  // const { lastJsonMessage } = useWebSocket(
  //   `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`,
  //   {
  //     onOpen: () => console.log(`Connected to App WS`),
  //     onMessage: async () => {
  //       if (lastJsonMessage) {
  //         const DataBinance = lastJsonMessage as BinanceFormat;
  //         const CurrentlyDate = new Date(DataBinance.k.t);
  //         const newCandle = new Candle(
  //           CurrentlyDate,
  //           DataBinance.k.o,
  //           DataBinance.k.h,
  //           DataBinance.k.l,
  //           DataBinance.k.c
  //         );

  //         const newDataArray = data;

  //         //newDataArray.dataPointsMA = newAuxData;

  //         if (DataBinance.k.x === false) {
  //           //candle incompleto
  //           newDataArray.dataPoints[newDataArray.dataPoints.length - 1] =
  //             newCandle; //substitui último candle pela versão atualizada
  //         } else {
  //           //remove primeiro candle e adiciona o novo último
  //           newDataArray.dataPoints.splice(0, 1);
  //           newDataArray.dataPoints.push(newCandle);
  //         }

  //         AuxMAdataPoints.length = 0;
  //         for (let i = 0; i < newDataArray.dataPoints.length; i++) {
  //           await MAcalcule(
  //             newDataArray.dataPoints[i].x,
  //             newDataArray.dataPoints[i].y[3],
  //             i,
  //             20
  //           )
  //             .then(async (maresult) => {
  //               //newDataArray.dataPointsMA.push(maresult);
  //               console.log(maresult);
  //               //console.log("MA index = ", i);
  //               await SDcalcule(20, maresult.y)
  //                 .then(async (sdresult) => {
  //                   //console.log("SD result = ", sdresult);
  //                   //console.log("SD index = ", i);
  //                   await BollingerUpCalcule(
  //                     newDataArray.dataPoints[i].x,
  //                     maresult.y,
  //                     sdresult
  //                   )
  //                     .then(async (buresult) => {
  //                       //console.log("dataPointsBolU = ", buresult);
  //                       //newDataArray.dataPointsBolU.push(buresult);
  //                     })
  //                     .catch(() => {});
  //                   await BollingerDownCalcule(
  //                     newDataArray.dataPoints[i].x,
  //                     maresult.y,
  //                     sdresult
  //                   )
  //                     .then(async (bdresult) => {
  //                       //console.log("dataPointsBolD = ", bdresult);
  //                       //newDataArray.dataPointsBolD.push(bdresult);
  //                     })
  //                     .catch(() => {});
  //                 })

  //                 .catch(() => {});
  //             })
  //             .catch(() => {});
  //         }

  //         setData(newDataArray);
  //       }
  //     },
  //     onError: (event: any) => console.error(event),
  //     shouldReconnect: (closeEvent) => true,
  //     reconnectInterval: 3000,
  //   }
  // );

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
