import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

export default (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "rgb(255, 196, 0)",
    },
  },
});