//import { createMuiTheme } from '@mui/core/styles';
//import indigo from '@mui/material/colors/indigo';
import { cyan, yellow, blue } from '@mui/material/colors';
//import { createMuiTheme } from '@mui/material/styles';
import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#303134',
      default: '#202124',
    },
  },
  typography: {
    allVariants: {
      color: 'white',
    },
  },
});

/*const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[900],
    },
    secondary: {
      main: blue[300],
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 14,
  },
});

export default theme;*/
