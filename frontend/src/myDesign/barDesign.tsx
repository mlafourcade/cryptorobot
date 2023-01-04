import {
  Box,
  Card,
  FormControl,
  styled,
  TextField,
  Typography,
} from "@mui/material";

export const BarTypography = styled(Typography)(({ theme, color }) => ({
  color: color === "high" ? theme.colors.high.main : theme.colors.low.main,
  textAlign: "center",
  fontSize: "0.875rem",
  fontWeight: "700",
}));

export const PrefixTypography = styled(Typography)(({ theme, color }) => ({
  color: color === "high" ? theme.colors.high.main : theme.colors.low.main,
  paddingTop: "2%",
  paddingLeft: "5%",
  textAlign: "left",
  fontSize: "90%",
  fontWeight: "500",
}));

export const DataTypography = styled(Typography)(({ theme, color }) => ({
  color: color === "high" ? theme.colors.high.main : theme.colors.low.main,
  paddingTop: "2%",
  paddingLeft: "30%",
  textAlign: "left",
  fontSize: "100%",
  fontWeight: "500",
}));

export const SufixTypography = styled(Typography)(({ theme, color }) => ({
  color: color === "high" ? theme.colors.high.main : theme.colors.low.main,
  width: "4.6vw",
  paddingTop: "2%",
  textAlign: "right",
  fontSize: "90%",
  fontWeight: "700",
}));

export const FormPrefix = styled(TextField)({
  id: "prefix-text",
  sx: { m: 1, width: "25ch" },
  InputProps: {
    startAdornment: {
      InputAdornment: {
        position: "end",
      },
      children: "Peso",
    },
  },
});

export const FormTextArea = styled(FormControl)(({ theme, color }) => ({
  OutlinedInput: {
    id: "Form-Text",
    endAdornment: {
      InputAdornment: {
        position: "end",
      },
    },
  },

  //sx: {{ m: 1, width: "25ch" }},
  //variant: "outlined",
}));

// < sx={{ m: 1, width: "25ch" }} variant="outlined">
// <OutlinedInput
//   id="outlined-adornment-weight"
//   endAdornment={<InputAdornment position="end">kg</InputAdornment>}
//   aria-describedby="outlined-weight-helper-text"
//   inputProps={{
//     "aria-label": "weight",
//   }}
// />
// <FormHelperText id="outlined-weight-helper-text">
//   Weight
// </FormHelperText>
// </>

export const PrefixCard = styled(Card)(({ theme, color }) => ({
  color: color === "high" ? theme.colors.high.main : theme.colors.low.main,
  textAlign: "left",
  fontSize: "0.875rem",
  fontWeight: "700",
}));

export const BarBox = styled(Box)({
  width: "12vw",
  height: "4.5vh",
});

export const BarCard = styled(Box)({
  width: "12vw",
  height: "4.5vh",
});
