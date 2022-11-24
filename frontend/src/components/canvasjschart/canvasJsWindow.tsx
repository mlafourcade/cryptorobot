import { Box, Grid } from "@mui/material";
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  PropsWithChildren,
  useState,
} from "react";

export interface ChartDataFormat {
  symbol: string;
  interval: string;
  limit: number;
  handleSymbol: (symbol: string) => void;
  handleInterval: (interval: string) => void;
  handleLimit: (limit: number) => void;
}

export const ContextChart = createContext({} as ChartDataFormat);

export const useContextChart = () => {
  return useContext(ContextChart);
};

interface CWindowProps {
  //
}

export const CanvasJsWindowArea = ({
  children,
}: PropsWithChildren<CWindowProps>) => {
  const [symbol, setSymbol] = useState("XLMUSDT");
  const [interval, setInterval] = useState("5m");
  const [limit, setLimit] = useState(50);

  return (
    <Grid container height="81.4vh" width="74.9vw">
      <Box
        width="100%"
        height="100%"
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        <ContextChart.Provider
          value={{
            symbol,
            interval,
            limit,
            handleSymbol: setSymbol,
            handleInterval: setInterval,
            handleLimit: setLimit,
          }}
        >
          {children}
        </ContextChart.Provider>
      </Box>
    </Grid>
  );
};
