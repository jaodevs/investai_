import { createTheme } from "@mui/material";
import { cyan, teal } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main:  "#002C66",
      dark: teal[700],
      light: teal[300],
      contrastText: "#ffffff",
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
});
