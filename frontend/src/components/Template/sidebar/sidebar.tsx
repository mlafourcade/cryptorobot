import { FC, ReactNode } from "react";
import { Box, Grid, Stack, useTheme } from "@mui/material";

interface SideProps {
  children?: ReactNode;
}

export const SideBarArea: FC<SideProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <Grid container height="93.6vh" width="15vw">
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
