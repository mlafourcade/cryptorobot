import { Box, Grid } from "@mui/material";
import { PropsWithChildren, useState } from "react";

interface CWindowProps {
  //
}

export const CanvasJsWindowArea = ({
  children,
}: PropsWithChildren<CWindowProps>) => {
  return (
    <Grid container height="81.4vh" width="74.9vw">
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
