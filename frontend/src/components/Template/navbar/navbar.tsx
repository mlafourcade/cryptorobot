import { AppBar, Box, Grid, Toolbar, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";

interface NavProps {
  children?: ReactNode;
}

export const NavBarArea: FC<NavProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <Grid container height="6vh" width="100vw">
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
