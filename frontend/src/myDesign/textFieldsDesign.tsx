import * as React from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {
  Card,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  BarBox,
  DataTypography,
  PrefixTypography,
  SufixTypography,
} from "./barDesign";
import { useCryptoContext } from "../contexts";

interface PrefixProps {
  children: React.ReactNode;
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: 300,
    margin: 100,
  },
  //style for font size
  resize: {
    fontSize: 50,
  },
};

export const FormTextPrefix: React.FC<PrefixProps> = ({ children }) => {
  const { crypto, symbol, colorPrice } = useCryptoContext();

  const typeCrypto = symbol.substring(0, 3);
  const typeCurrency = symbol.substring(3, 7);

  return (
    <Card>
      <BarBox>
        <FormControl>
          <TextField
            id="text-prefix"
            variant="outlined"
            size="small"
            margin="none"
            color="success"
            focused
            defaultValue={children}
            InputProps={{
              style: {
                paddingLeft: "5%",
                paddingRight: "2%",
                fontSize: "40%",
                textAlign: "center",
                border: "false",
                borderBlock: "false",
                display: "flex",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <Typography textAlign="left" fontSize="190%" fontWeight="500">
                    {typeCrypto}
                  </Typography>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Typography
                    textAlign="right"
                    fontSize="200%"
                    fontWeight="700"
                  >
                    {typeCurrency}
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </BarBox>
    </Card>
  );
};

export const CardFormTex: React.FC<PrefixProps> = ({ children }) => {
  const { crypto, symbol, colorPrice } = useCryptoContext();
  const theme = useTheme();

  const typeCrypto = symbol.substring(0, 3);
  const typeCurrency = symbol.substring(3, 7);
  const Value = crypto.toFixed(5);

  return (
    <BarBox>
      <Stack direction={"row"}>
        <PrefixTypography theme={theme} color={colorPrice}>
          {typeCrypto}
        </PrefixTypography>
        <FormControl>
          <DataTypography theme={theme} color={colorPrice}>
            {Value}
          </DataTypography>
        </FormControl>
        <SufixTypography theme={theme} color={colorPrice}>
          {typeCurrency}
        </SufixTypography>
      </Stack>
    </BarBox>
  );
};
