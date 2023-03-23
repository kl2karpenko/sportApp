import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export default (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    primary: {
      main: "#07bf72",
    },
    secondary: {
      main: "#f38c07",
    },
  },
});