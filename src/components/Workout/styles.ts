import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    padding: 20
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
  bold: {
    fontWeight: "bold"
  }
});