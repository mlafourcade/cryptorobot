// rafc componente react atalho
import {
  Box,
  Card,
  Grid,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useCryptoContext } from "../../contexts";

const MyTypography = styled(Typography)(({ theme, color }) => ({
  color: color === "high" ? theme.colors.high.main : theme.colors.low.main,
  textAlign: "center",
  fontSize: "0.875rem",
  fontWeight: "700",
}));

const MyBox = styled(Box)({
  width: "50vw",
  height: "6vh",
});

export const Trade = () => {
  const theme = useTheme();
  const { crypto, symbol, colorPrice } = useCryptoContext();
  return (
    <>
      <Grid container height="46.7vh" width="15vw">
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
          aqui
        </Box>
      </Grid>
      <Grid container height="46.7vh" width="15vw">
        <Box width="100%" height="100%">
          <Grid container height="10vh" width="14.9vw">
            <Stack
              width="99%"
              height="100%"
              direction={"column"}
              justifyContent="rigth"
              alignItems="center"
              sx={{ gap: "3%", p: "3%", boxShadow: 4, background: "#424242" }}
            >
              <Card>
                <MyBox>
                  <MyTypography theme={theme} color={colorPrice}>
                    {symbol + " = " + crypto}
                  </MyTypography>
                </MyBox>
              </Card>
              <Card>
                <MyBox>
                  <MyTypography theme={theme} color={colorPrice}>
                    {symbol + " = " + crypto}
                  </MyTypography>
                </MyBox>
              </Card>
            </Stack>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
