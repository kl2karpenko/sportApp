import { makeStyles } from "tss-react/mui";

import { Theme } from "@mui/material";

export default makeStyles()((theme: Theme) => ({
  exerciseCard: {
    height: 500,
    position: 'relative',
    borderRadius: 15
  },
  imgWrapper: {
    textAlign: 'center'
  },
  img: {
    maxWidth: "100%",
    maxHeight: 350
  },
  description: {
    maxWidth: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  descriptionText: {
    color: theme.palette.common.white,
    background: 'rgba(0,0,0,0.5)',
    padding: theme.spacing(2)
  },
  textSecondary: {
    color: theme.palette.secondary.main
  },
  textPrimary: {
    color: theme.palette.primary.main
  }
}))