import { ApexOptions } from "apexcharts";
import ApexChart from "react-apexcharts";
import { dataChart, dataLineChart } from "../canvasjschart/cryptos";

export type dataChartArrayProps = {
  data: {
    dataPoints: dataChart[];
    dataPointsMA: dataLineChart[];
    dataPointsBolU: dataLineChart[];
    dataPointsBolD: dataLineChart[];
  };
};

export const AChart = (props: dataChartArrayProps) => {
  const options: ApexOptions = {
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
      name: "candle",
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
  ];

  const seriesBar: ApexAxisChartSeries = [
    {
      name: "volume",
      type: "column",
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
    },
  ];

  return (
    <>
      <ApexChart
        options={options}
        series={series}
        type="line"
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
