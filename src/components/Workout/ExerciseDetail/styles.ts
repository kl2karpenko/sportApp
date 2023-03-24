import { makeStyles } from "tss-react/mui";

import { Theme } from "@mui/material";

export default makeStyles()((theme: Theme) => ({
  img: {
    width: "100%"
  },
  textSecondary: {
    color: theme.palette.secondary.main
  },
  textPrimary: {
    color: theme.palette.primary.main
  }
}))