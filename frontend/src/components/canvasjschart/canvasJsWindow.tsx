import { Box, Grid } from "@mui/material";
import { FC, ReactNode } from "react";

interface CWindowProps {
  children?: ReactNode;
}

export const CanvasJsWindowArea: FC<CWindowProps> = ({ children }) => {
  return (
    <Grid container height="75.4vh" width="74.9vw">
      <Box
        width="100%"
        height="100%"
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        {children}
      </Box>
    </Grid>
  );
};
