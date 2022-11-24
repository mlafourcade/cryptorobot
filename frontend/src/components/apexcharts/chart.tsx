import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import ApexChart from "react-apexcharts";
import { DataChart, DataLineChart } from "../canvasjschart/cryptos";

type dataChartArrayProps = {
  data: {
    dataPoints: DataChart[];
    dataPointsV: DataLineChart[];
    dataPointsMA: DataLineChart[];
    dataPointsBolU: DataLineChart[];
    dataPointsBolD: DataLineChart[];
  };
};

export const AChart = (props: dataChartArrayProps) => {
  const series: ApexAxisChartSeries = useMemo(
    () => [
      {
        name: "Crypto",
        type: "candlestick",
        data: props.data.dataPoints,
      },
      {
        name: "MA",
        type: "line",
        data: props.data.dataPointsMA,
      },
      {
        name: "BolUp",
        type: "line",
        data: props.data.dataPointsBolU,
      },
      {
        name: "BolDown",
        type: "line",
        data: props.data.dataPointsBolD,
      },
    ],
    [
      props.data.dataPoints,
      props.data.dataPointsMA,
      props.data.dataPointsBolU,
      props.data.dataPointsBolD,
    ]
  );

  const options: ApexOptions = {
    chart: {
      id: "candles",
      type: "candlestick",
      // toolbar: {
      //   autoSelected: "pan",
      //   show: false,
      // },
      zoom: {
        enabled: true,
      },
    },
    colors: ["#77B6EA", "#77B6EA", "#E1AAF1", "#E1AAF1"],
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    // plotOptions: {
    //   candlestick: {
    //     colors: {
    //       upward: "#3C90EB",
    //       downward: "#DF7D46",
    //     },
    //   },
    // },
    stroke: {
      width: [2, 4, 4, 4],
    },
    tooltip: {
      shared: true,
      custom: [
        function ({ seriesIndex, dataPointIndex, w }) {
          let o: string = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
          let h: string = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
          let l: string = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
          let c: string = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
          return "O: " + o + ", H: " + h + ", L: " + l + ", C: " + c;
        },
        function ({ seriesIndex, dataPointIndex, w }) {
          return w.globals.series[seriesIndex][dataPointIndex];
        },
        function ({ seriesIndex, dataPointIndex, w }) {
          return w.globals.series[seriesIndex][dataPointIndex];
        },
        function ({ seriesIndex, dataPointIndex, w }) {
          return w.globals.series[seriesIndex][dataPointIndex];
        },
      ],
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },

    theme: {
      mode: "dark",
      //palette: "palette9",
      // monochrome: {
      //   enabled: false,
      //   color: "#2a2a2a",
      //   shadeTo: "dark",
      //   shadeIntensity: 0.65,
      // },
    },
  };

  const seriesBar: ApexAxisChartSeries = useMemo(
    () => [
      {
        name: "volume",
        data: props.data.dataPointsV,
      },
    ],
    [props.data.dataPointsV]
  );

  const dateMin =
    props.data.dataPoints.length > 0
      ? new Date(props.data.dataPoints[0].x).getTime()
      : new Date(Date.now()).getTime();
  const dateMax =
    props.data.dataPoints.length > 0
      ? new Date(
          props.data.dataPoints[props.data.dataPoints.length - 1].x
        ).getTime()
      : new Date(Date.now()).getTime();

  const optionsBar: ApexOptions = {
    chart: {
      height: 160,
      type: "bar",
      brush: {
        enabled: true,
        target: "candles",
      },

      selection: {
        enabled: true,
        xaxis: {
          min: dateMin - 150000,
          max: dateMax + 150000,
        },
        fill: {
          color: "#ccc",
          opacity: 0.1,
        },
        stroke: {
          color: "#0D47A1",
        },
      },
    },
    // dataLabels: {
    //   enabled: false,
    // },
    // plotOptions: {
    //   bar: {
    //     columnWidth: "80%",
    //     colors: {
    //       ranges: [
    //         {
    //           from: -1000,
    //           to: 0,
    //           color: "#F15B46",
    //         },
    //         {
    //           from: 1,
    //           to: 10000,
    //           color: "#FEB019",
    //         },
    //       ],
    //     },
    //   },
    // },
    stroke: {
      width: 0,
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        offsetX: 0,
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    theme: {
      mode: "dark",
    },
  };

  return (
    <>
      <ApexChart
        options={options}
        series={series}
        type="line"
        width={"100%"}
        height={"80%"}
        key={1}
      />
      <ApexChart
        key={2}
        options={optionsBar}
        series={seriesBar}
        type="bar"
        width={"100%"}
        height={"20%"}
      />
    </>
  );
};
