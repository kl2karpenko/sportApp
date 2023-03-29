import { makeStyles } from "tss-react/mui";

import { Theme } from "@mui/material";

export default makeStyles()((theme: Theme) => ({
  icon: {
    fill: theme.palette.secondary.main,
  },
  text: {
    fill: "white"
  }
}));