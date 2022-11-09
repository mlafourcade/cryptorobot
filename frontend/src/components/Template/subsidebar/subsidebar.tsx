import { FC, ReactNode } from "react";
import { Box, useTheme } from "@mui/material";

interface SubSideProps {
  children?: ReactNode;
}

export const SubSideBarArea: FC<SubSideProps> = ({ children }) => {
  const theme = useTheme();
  return (
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
  );
};
