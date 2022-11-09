import React, { Component } from "react";
import CanvasJSReact from "../../canvas/canvasjs.stock.react";
let CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

type containerProps = {
  width: string;
  height: string;
  margin: string;
};

type options = {
  title: {
    text: string;
    fontSize: number;
  };
  theme: string;
  animationEnabled: boolean;
  exportEnabled: boolean;
  charts: {
    height: number;
    axisX: {
      crosshair: {
        enabled: boolean;
        snapToDataPoint: boolean;
      };
    };
    axisY: {
      crosshair: {
        enabled: boolean;
      };
    };
    data: {}[];
  }[];
  rangeSelector: {};
};

export class Canvas extends Component {
  constructor(props: any) {
    super(props);
    this.generateDataPoints = this.generateDataPoints.bind(this);
    console.log(this.generateDataPoints);
  }
  generateDataPoints(noOfDps: number) {
    var xVal = 1,
      yVal = 100;
    var dps = [];
    for (var i = 0; i < noOfDps; i++) {
      yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
      dps.push({ x: xVal, y: yVal });
      xVal++;
    }
    return dps;
  }

  options: options = {
    title: {
      text: "",
      fontSize: 25,
    },
    theme: "dark1",
    animationEnabled: true,
    exportEnabled: true,
    charts: [
      {
        height: 350,
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
          },
        },
        axisY: {
          crosshair: {
            enabled: true,
            //snapToDataPoint: true
          },
        },
        data: [
          {
            type: "spline",
            dataPoints: this.generateDataPoints(10000),
          },
        ],
      },
    ],
    rangeSelector: {
      enabled: false,
    },
  };
  containerProps: containerProps = {
    width: "100%",
    height: "100%",
    margin: "auto",
  };
  public render(): JSX.Element {
    return (
      <CanvasJSStockChart
        containerProps={this.containerProps}
        options={this.options}
      />
    );
  }
}

/*



		
			
			{//You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods}
      </div>

*/
