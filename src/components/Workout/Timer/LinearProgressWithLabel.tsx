import { Box, LinearProgress, Theme } from "@mui/material";
import React from "react";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    height: 30
  }
}));

export default function LinearProgressWithLabel({ value, isResting }: { value: number; isResting: boolean; }) {
  const progress = Math.round(100 / value);
  const { classes } = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress color={isResting ? "secondary" : "primary"} className={classes.root} value={progress} />
      </Box>
    </Box>
  );
}