import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material";

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    padding: 20
  },
  exercisesView: {
    paddingBottom: 100
  },
  mainCard: {
    height: "calc(100% - 160px)",
    padding: 10,
    border: "0 !important"
  },
  bottom: {
    alignSelf: "bottom",
    width: "100%",
  },
  left: {
    alignSelf: "flex-start",
    minHeight: "100%"
  },
  stretchHeight: {
    minHeight: "100%"
  },
  timer: {
    minWidth: 800,
    position: "absolute",
    left: 10,
    top: 0,
    background: theme.palette.secondary.main
  },
  bold: {
    fontWeight: "bold"
  },
  chip: {
    width: "10px",
    height: "10px",
    maxHeight: "10px",
    lineHeight: "10px",
    marginTop: "-20px",
    marginLeft: "-13px"
  }
}));