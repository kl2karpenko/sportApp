import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material";

export const useStyles = makeStyles()((theme: Theme) => ({
  activeRound: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fondWeight: 800,
    fontSize: 24
  },
  stretchHeight: {
    minHeight: "100%"
  },
  bold: {
    fontWeight: "bold"
  },
}));