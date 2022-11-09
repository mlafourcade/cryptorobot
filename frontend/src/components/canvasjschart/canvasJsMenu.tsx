import { Box, Grid } from "@mui/material";
import { FC, ReactNode } from "react";

interface CMenuProps {
  children?: ReactNode;
}

export const CanvasJsMenuArea: FC<CMenuProps> = ({ children }) => {
  return (
    <Grid container height="6vh" width="75vw">
      <Box
        width="100%"
        height="100%"
        sx={{
          background: "#2a2a2a",
          color: "white",
          display: { xs: "none", sm: "block" },
        }}
      >
        {children}
      </Box>
    </Grid>
  );
};
