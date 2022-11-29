import { Box, Grid } from "@mui/material";
import { ChangeEvent, useCallback } from "react";
import { useCryptoContext } from "../../contexts";

export const CanvasJsMenuArea = () => {
  const { handleSymbol, handleLimit, handleInterval } = useCryptoContext();

  const onSymbolChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      handleSymbol(event.target.value);
    },
    [handleSymbol]
  );
  const onIntervalChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      handleInterval(event.target.value);
    },
    [handleInterval]
  );
  const onLimitChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      handleLimit(parseInt(event.target.value));
    },
    [handleLimit]
  );

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
        <select onChange={onSymbolChange} defaultValue="XLMUSDT">
          <option value="BTCUSDT">BTCUSDT</option>
          <option value="ETHUSDT">ETHUSDT</option>
          <option value="ADAUSDT">ADAUSDT</option>
          <option value="XLMUSDT">XLMUSDT</option>
        </select>
        <select onChange={onIntervalChange} defaultValue="5m">
          <option value="1d">1d</option>
          <option value="1h">1h</option>
          <option value="15m">15m</option>
          <option value="5m">5m</option>
        </select>
        <select onChange={onLimitChange} defaultValue="50">
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="250">250</option>
        </select>
      </Box>
    </Grid>
  );
};
