import { Box, Grid } from "@mui/material";
import { ChangeEvent } from "react";
import { useContextChart } from "./canvasJsWindow";

export const CanvasJsMenuArea = () => {
  const { handleSymbol } = useContextChart();
  const { handleInterval } = useContextChart();
  const { handleLimit } = useContextChart();

  function onSymbolChange(event: ChangeEvent<HTMLSelectElement>) {
    handleSymbol(event.target.value);
  }

  function onIntervalChange(event: ChangeEvent<HTMLSelectElement>) {
    handleInterval(event.target.value);
  }

  function onLimitChange(event: ChangeEvent<HTMLSelectElement>) {
    handleLimit(parseInt(event.target.value));
  }

  return (
    <Grid container height="6vh" width="75vw">
      <Box
        width="100%"
        height="100%"
        sx={{
          background: "#424242",
          color: "white",
          display: { xs: "none", sm: "block" },
        }}
      >
        <select onChange={onSymbolChange}>
          <option>BTCUSDT</option>
          <option>ETHUSDT</option>
          <option>ADAUSDT</option>
          <option>XLMUSDT</option>
        </select>
        <select onChange={onIntervalChange}>
          <option>1d</option>
          <option>1h</option>
          <option>15m</option>
          <option>5m</option>
        </select>
        <select onChange={onLimitChange}>
          <option>20</option>
          <option>50</option>
          <option>100</option>
          <option>250</option>
        </select>
      </Box>
    </Grid>
  );
};
