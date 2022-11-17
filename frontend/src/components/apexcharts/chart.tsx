import { ApexOptions } from "apexcharts";
import ApexChart from "react-apexcharts";
import { dataChart, dataLineChart } from "../canvasjschart/cryptos";

export type dataChartArrayProps = {
  data: {
    dataPoints: dataChart[];
    dataPointsV: dataLineChart[];
    dataPointsMA: dataLineChart[];
    dataPointsBolU: dataLineChart[];
    dataPointsBolD: dataLineChart[];
  };
};

const dataTeste2 = [
  {
    x: new Date(1538778600000),
    y: 6629.81,
  },
  {
    x: new Date(1538780400000),
    y: 6632.01,
  },
  {
    x: new Date(1538782200000),
    y: 6630.71,
  },
  {
    x: new Date(1538784000000),
    y: 6635.65,
  },
  {
    x: new Date(1538785800000),
    y: 6638.24,
  },
  {
    x: new Date(1538787600000),
    y: 6624.53,
  },
  {
    x: new Date(1538789400000),
    y: 6624.61,
  },
  {
    x: new Date(1538791200000),
    y: 6627,
  },
  {
    x: new Date(1538793000000),
    y: 6605,
  },
  {
    x: new Date(1538794800000),
    y: 6604.5,
  },
  {
    x: new Date(1538796600000),
    y: 6608.02,
  },
  {
    x: new Date(1538798400000),
    y: 6608.91,
  },
  {
    x: new Date(1538800200000),
    y: 6612,
  },
  {
    x: new Date(1538802000000),
    y: 6612,
  },
  {
    x: new Date(1538803800000),
    y: 6623.91,
  },
  {
    x: new Date(1538805600000),
    y: 6618.69,
  },
  {
    x: new Date(1538807400000),
    y: 6611,
  },
  {
    x: new Date(1538809200000),
    y: 6614.9,
  },
  {
    x: new Date(1538811000000),
    y: 6623.48,
  },
  {
    x: new Date(1538812800000),
    y: 6619.43,
  },
  {
    x: new Date(1538814600000),
    y: 6615.53,
  },
  {
    x: new Date(1538816400000),
    y: 6615.19,
  },
  {
    x: new Date(1538818200000),
    y: 6619.54,
  },
  {
    x: new Date(1538820000000),
    y: 6620.33,
  },
  {
    x: new Date(1538821800000),
    y: 6625.95,
  },
  {
    x: new Date(1538823600000),
    y: 6619,
  },
  {
    x: new Date(1538825400000),
    y: 6598.86,
  },
  {
    x: new Date(1538827200000),
    y: 6588.86,
  },
  {
    x: new Date(1538829000000),
    y: 6593.99,
  },
  {
    x: new Date(1538830800000),
    y: 6587.81,
  },
  {
    x: new Date(1538832600000),
    y: 6578.35,
  },
  {
    x: new Date(1538834400000),
    y: 6579.38,
  },
  {
    x: new Date(1538836200000),
    y: 6575.96,
  },
  {
    x: new Date(1538838000000),
    y: 6588.92,
  },
  {
    x: new Date(1538839800000),
    y: 6589.3,
  },
  {
    x: new Date(1538841600000),
    y: 6597.5,
  },
  {
    x: new Date(1538843400000),
    y: 6598.03,
  },
  {
    x: new Date(1538845200000),
    y: 6595.97,
  },
  {
    x: new Date(1538847000000),
    y: 6602,
  },
  {
    x: new Date(1538848800000),
    y: 6600.63,
  },
  {
    x: new Date(1538850600000),
    y: 6591.02,
  },
  {
    x: new Date(1538852400000),
    y: 6591,
  },
  {
    x: new Date(1538854200000),
    y: 6593.13,
  },
  {
    x: new Date(1538856000000),
    y: 6593.34,
  },
  {
    x: new Date(1538857800000),
    y: 6593.86,
  },
  {
    x: new Date(1538859600000),
    y: 6601.81,
  },
  {
    x: new Date(1538861400000),
    y: 6596.25,
  },
  {
    x: new Date(1538863200000),
    y: 6602.99,
  },
  {
    x: new Date(1538865000000),
    y: 6587.81,
  },
  {
    x: new Date(1538866800000),
    y: 6591.97,
  },
  {
    x: new Date(1538868600000),
    y: 6587.6,
  },
  {
    x: new Date(1538870400000),
    y: 6596.44,
  },
  {
    x: new Date(1538872200000),
    y: 6598.91,
  },
  {
    x: new Date(1538874000000),
    y: 6600.55,
  },
  {
    x: new Date(1538875800000),
    y: 6593.15,
  },
  {
    x: new Date(1538877600000),
    y: 6603.07,
  },
  {
    x: new Date(1538879400000),
    y: 6604.44,
  },
  {
    x: new Date(1538881200000),
    y: 6603.5,
  },
  {
    x: new Date(1538883000000),
    y: 6603.85,
  },
  {
    x: new Date(1538884800000),
    y: 6604.98,
  },
];

export const AChart = (props: dataChartArrayProps) => {
  const series: ApexAxisChartSeries = [
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
    /*{
      name: "BolUp",
      type: "line",
      data: props.data.dataPointsBolU,
    },
    {
      name: "BolDown",
      type: "line",
      data: props.data.dataPointsBolD,
    },*/
  ];

  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      id: "candles",
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    //colors: ["#77B6EA", "#77B6EA", "#E1AAF1", "#E1AAF1"],
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#3C90EB",
          downward: "#DF7D46",
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const seriesBar: ApexAxisChartSeries = [
    {
      name: "volume",
      data: dataTeste2,
    },
  ];

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
          min: new Date("20 Jan 2017").getTime(),
          max: new Date("10 Dec 2017").getTime(),
        },
        fill: {
          color: "#ccc",
          opacity: 0.4,
        },
        stroke: {
          color: "#0D47A1",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "80%",
        colors: {
          ranges: [
            {
              from: -1000,
              to: 0,
              color: "#F15B46",
            },
            {
              from: 1,
              to: 10000,
              color: "#FEB019",
            },
          ],
        },
      },
    },
    stroke: {
      width: 0,
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        offsetX: 13,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };

  /*const options: ApexOptions = {
    chart: {
      height: 350,
      type: "candlestick",
    },
    colors: ["#77B6EA", "#77B6EA", "#E1AAF1", "#E1AAF1"],
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: [2],
      shared: true,
    },
    stroke: {
      width: [1, 4, 4, 4], //epessura da linha
    },
    xaxis: {
      type: "datetime",
    },
    // xaxis: {
    //   type: "category",
    //   labels: {
    //     formatter: function (val, timestamp: number, opts) {
    //       let d = new Date(val);
    //       return d.toString().slice(16, 21);
    //     },
    //   },
    // },

    yaxis: {
      tooltip: {
        enabled: true,
      },
    },

    theme: {
      mode: "dark",
      palette: "palette9",
      monochrome: {
        enabled: false,
        color: "#2a2a2a",
        shadeTo: "dark",
        shadeIntensity: 0.65,
      },
    },
  };

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
          min: new Date("20 Jan 2017").getTime(),
          max: new Date("10 Dec 2017").getTime(),
        },
        fill: {
          color: "#ccc",
          opacity: 0.4,
        },
        stroke: {
          color: "#0D47A1",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "80%",
        colors: {
          ranges: [
            {
              from: -1000,
              to: 0,
              color: "#F15B46",
            },
            {
              from: 1,
              to: 10000,
              color: "#FEB019",
            },
          ],
        },
      },
    },
    stroke: {
      width: 0,
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        offsetX: 13,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },

    theme: {
      mode: "dark",
      palette: "palette9",
      monochrome: {
        enabled: false,
        color: "#2a2a2a",
        shadeTo: "dark",
        shadeIntensity: 0.65,
      },
    },
  };

  const series: ApexAxisChartSeries = [
    {
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
  ];

  const seriesBar: ApexAxisChartSeries = [
    {
      name: "volume",
      type: "column",
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
    },
  ];*/

  return (
    <>
      <ApexChart
        options={options}
        series={series}
        type="candlestick"
        width={"100%"}
        height={"80%"}
      />
      <ApexChart
        options={optionsBar}
        series={seriesBar}
        type="bar"
        width={"100%"}
        height={"20%"}
      />
    </>
  );
};
