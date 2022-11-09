import { Box, Grid, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";

interface WindowProps {
  children?: ReactNode;
}

export const WindowArea: FC<WindowProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <Grid container height="81.6vh" width="75vw">
      <Box
        width="100%"
        height="100%"
        sx={{
          border: 1,
          borderColor: "primary.dark",
          borderRadius: 1,
          display: { xs: "none", sm: "block" },
        }}
      >
        {children}
      </Box>
    </Grid>
  );
};
