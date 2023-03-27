import { makeStyles } from "../utils/makesStyles";
import { Theme } from "@mui/material";

export default makeStyles()((theme: Theme) => ({
  root: {
    backgroundColor: theme?.palette?.background?.default,
    minHeight: "100%"
  },
  switcher: {
    position: 'absolute',
    right: 0
  }
}));