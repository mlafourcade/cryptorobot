import { ApexOptions } from "apexcharts";
import ApexChart from "react-apexcharts";

type dataChart = {
  x: Date;
  y: [number, number, number, number];
};

type DataProps = {
  data: dataChart[];
};

export const AChart = (props: DataProps) => {
  console.log("Props aqui = ", props.data);

  const options: ApexOptions = {
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const series: ApexAxisChartSeries = [
    {
      data: props.data,
    },
  ];

  return (
    <ApexChart
      options={options}
      series={series}
      type="candlestick"
      width={"100%"}
      height={"100%"}
    />
  );
};

/*
options={options}
series={series}
type="candlestick"
width={640}
height={480}*/

/*

/*export default function Chart(props) {

  const options = {
      xaxis: {
          type: 'datetime'
      },
      yaxis: {
          tooltip: {
              enabled: true
          }
      }
  }

  const series = [{
      data: props.data
  }]

  return (
      <ApexChart options={options} series={series} type="candlestick" width={640} height={480} />
  )
}*/
