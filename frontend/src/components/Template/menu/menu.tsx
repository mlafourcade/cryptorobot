import { Box, Grid, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";

interface MenuProps {
  children?: ReactNode;
}

export const MenuArea: FC<MenuProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <Grid container height="6vh" width="85vw">
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
