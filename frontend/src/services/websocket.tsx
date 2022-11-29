import { Candle } from "../components/canvasjschart/cryptos";

export let wss: WebSocket;

export function WebSocketCreate() {
  return new Promise((resolve, reject) => {
    wss = new WebSocket("wss://stream.binance.com:9443/ws");

    wss.addEventListener("open", socketOpenListener);
    wss.addEventListener("message", socketMessageListener);
    wss.addEventListener("close", socketCloseListener);
    wss.addEventListener("ping", socketPingListener);
    wss.addEventListener("error", socketErrorListener);
    wss.addEventListener("onopen", socketonopenListener);
    wss.addEventListener("onclose", socketoncloseListener);
    wss.addEventListener("onerror", socketonerrorListener);

    resolve("Loaded Websocket List");
  });
}

const socketMessageListener = async (event: MessageEvent<any>) => {
  let myArr = JSON.parse(event.data);

  if (myArr.k) {
    let JsonData = myArr.k;
    console.log("JsonValue = ", JsonData);

    if (JsonData.i === "5m") {
      console.log("Interval = 5m");

      const newCandle = new Candle(
        JsonData.t,
        JsonData.o,
        JsonData.h,
        JsonData.l,
        JsonData.c,
        JsonData.v
      );

      // const newDataArray: DataChartArray = {
      //   dataPoints: [...data.dataPoints],
      //   dataPointsBolD: [...data.dataPointsBolD],
      //   dataPointsBolU: [...data.dataPointsBolU],
      //   dataPointsMA: [...data.dataPointsMA],
      //   dataPointsV: [...data.dataPointsV],
      // };

      // var SchemaAux = new dataformat();
      // SchemaAux.Interval = JsonData.i,
      // SchemaAux.Open = parseFloat(JsonData.o);
      // SchemaAux.High = parseFloat(JsonData.h);
      // SchemaAux.Low = parseFloat(JsonData.l);
      // SchemaAux.Close = parseFloat(JsonData.c);
      // SchemaAux.Timestamp = parseInt(JsonData.t);
      // SchemaAux.Volume = parseFloat(JsonData.v);
    }
  } else if (myArr.result === null) {
    console.log("JsonValue = ", myArr.result);
  } else {
    console.log("sei la = ", myArr);
  }
};

function WaitforReadyState() {
  return new Promise((resolve, reject) => {
    if (wss.readyState === 1) resolve("wss.readyState ok");
  });
}

const socketOpenListener = async (event: Event) => {
  console.log("socketOpenListener");

  // clearInterval(OpenInterval);

  // var params;
  // GetPartoSubscribe(CryptoCurrenceText, (ret) => {
  //     params = ret;
  //     //console.log("Texto Convertido = " + ret); //xlmusdt@kline_5m
  // });

  await WaitforReadyState().then((res) => {
    console.log(res);
  });

  console.log("Set SUBSCRIBE");

  var SubscribeData = {
    method: "SUBSCRIBE",
    params: ["xlmusdt@kline_5m"],
    //params: [params],
    id: 1,
  };

  wss.send(JSON.stringify(SubscribeData));
};

// Ping
const socketPingListener = () => {
  //WSisAlive = true;
  //var NewTime = new Date(Date.now());
  //LogInfo.LogText("Listener Binance Ping Received to " + NewTime);
  //console.log("Listener Binance Ping Received to " + NewTime);
  // clearInterval(PingInterval);
  // PingInterval = setInterval(() => {
  //   console.log('Estourou a contagem do Ping');
  //   if (wss) {
  //     SetUnsubscribe();
  //   }
  //   else {
  //     console.log('wss Disable');
  //   }
  //   clearInterval(PingInterval);
  //   Reconect ();
  // }, 190000);
  // if (wss) {
  //   wss.pong((error) => {
  //     console.log(error);
  //   });
  // }
};

// Error
const socketErrorListener = (event: Event) => {
  console.log("socketErrorListener");

  wss.close();
};

// onopen
const socketonopenListener = () => {
  console.log("Listener Binance onopen ");

  /*var params;
  GetPartoSubscribe(CryptoCurrenceText, (ret) => {
    params = ret;
    //console.log("Texto Convertido = " + ret); 
  });

  var SubscribeData = {
    method: "SUBSCRIBE",
    params: [params],
    id: 1
  }

  wss.send(JSON.stringify(SubscribeData));*/
};

const socketoncloseListener = () => {
  console.log("Binance onclose ");

  /*subscribed = false;*/

  //socketCloseListener();
};

const socketonerrorListener = () => {
  console.log("socketonerrorListener ");
};

// Closeds
const socketCloseListener = (event: CloseEvent) => {
  console.log("Disconnected");
  // if (StreamEvent) {
  //   Reconect ();
  // }
};

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
//           DataBinance.k.c,
//           DataBinance.k.v
//         );

//         const newDataArray: DataChartArray = {
//           dataPoints: [...data.dataPoints],
//           dataPointsBolD: [...data.dataPointsBolD],
//           dataPointsBolU: [...data.dataPointsBolU],
//           dataPointsMA: [...data.dataPointsMA],
//           dataPointsV: [...data.dataPointsV],
//         };

//         //candle incompleto
//         if (DataBinance.k.x === false) {
//           //substitui último candle pela versão atualizada
//           newDataArray.dataPoints[newDataArray.dataPoints.length - 1] =
//             newCandle;
//           newDataArray.dataPointsV[newDataArray.dataPointsV.length - 1] = {
//             x: CurrentlyDate,
//             y: parseInt(DataBinance.k.v),
//           };
//         } else {
//           //remove primeiro candle e adiciona o novo último
//           newDataArray.dataPoints.push(newCandle);
//           newDataArray.dataPoints.shift();
//           newDataArray.dataPointsV.push({
//             x: CurrentlyDate,
//             y: parseInt(DataBinance.k.v),
//           });
//           newDataArray.dataPointsV.shift();
//         }

//         AuxMAdataPoints.length = 0;
//         newDataArray.dataPointsMA.length = 0;
//         newDataArray.dataPointsBolU.length = 0;
//         newDataArray.dataPointsBolD.length = 0;

//         for (let i = 0; i < newDataArray.dataPoints.length; i++) {
//           await MAcalcule(
//             newDataArray.dataPoints[i].x,
//             newDataArray.dataPoints[i].y[3],
//             i,
//             20
//           )
//             .then(async (maresult) => {
//               newDataArray.dataPointsMA.push(maresult);
//               await SDcalcule(20, maresult.y)
//                 .then(async (sdresult) => {
//                   await BollingerUpCalcule(
//                     newDataArray.dataPoints[i].x,
//                     maresult.y,
//                     sdresult
//                   )
//                     .then(async (buresult) => {
//                       newDataArray.dataPointsBolU.push(buresult);
//                     })
//                     .catch(() => {});
//                   await BollingerDownCalcule(
//                     newDataArray.dataPoints[i].x,
//                     maresult.y,
//                     sdresult
//                   )
//                     .then(async (bdresult) => {
//                       newDataArray.dataPointsBolD.push(bdresult);
//                     })
//                     .catch(() => {});
//                 })
//                 .catch(() => {});
//             })
//             .catch(() => {});
//         }

//         console.log("Close Price = ", DataBinance.k.c);
//         console.log("Open Price = ", DataBinance.k.o);

//         const direction: number =
//           parseFloat(DataBinance.k.c) - parseFloat(DataBinance.k.o);

//         console.log("direction = ", direction);

//         if (direction < 0) {
//           console.log("direction é menor que 0");
//         } else {
//           console.log("direction é maior que 0");
//         }

//         toggleColorPrice(direction < 0 ? "low" : "high");

//         console.log("Color Price = ", colorPrice);

//         setData(newDataArray);
//         handleCrypto(parseFloat(DataBinance.k.c));
//       }
//     },
//     onError: (event: any) => console.error(event),
//     shouldReconnect: (closeEvent) => true,
//     reconnectInterval: 3000,
//   }
