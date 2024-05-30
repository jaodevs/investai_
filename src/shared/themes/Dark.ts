import { createTheme } from "@mui/material";
import { cyan, teal } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
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
      default: "#303134",
      paper: "#202124",
    },
  },
  typography: {
    allVariants: {
      color: "#ffffff",
    },
  },
});
