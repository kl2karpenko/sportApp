import { makeStyles } from "../utils/makesStyles";
import { Theme } from "@mui/material";

export default makeStyles()((theme: Theme) => ({
  root: {
    backgroundColor: theme?.palette?.background?.default,
    minHeight: "100%",
    position: "relative"
  },
  switcher: {
    position: "absolute",
    right: 0,
    top: 0,
    paddingTop: theme.spacing(2)
  }
}));