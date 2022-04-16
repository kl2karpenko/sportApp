import React from "react";

import { Box, Paper } from "@mui/material";

interface ITimerProps {}

export default function NextExercise(props: ITimerProps): React.ReactElement {
  return (
    <Paper elevation={1}>
      <Box p={4}>
        Name of next exercise
      </Box>
    </Paper>
  );
}