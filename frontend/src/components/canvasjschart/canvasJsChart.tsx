import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getCandles } from "../../services/DataService";
import { AChart } from "../apexcharts";
import { useContextChart } from "./canvasJsWindow";

export const CanvasJsWindowChartArea = () => {
  const { symbol } = useContextChart();
  const { interval } = useContextChart();
  const { limit } = useContextChart();

  type dataChart = {
    x: Date;
    y: [number, number, number, number];
  };

  const dataProps: dataChart[] = [];

  const [data, setdata] = useState(dataProps);

  useEffect(() => {
    console.log("useEfect");
    getCandles(symbol, interval, limit)
      .then((value: any) => setdata(value))
      .catch((err) => alert(err.response ? err.response.data : err.message));
  }, [symbol, interval, limit]);

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
