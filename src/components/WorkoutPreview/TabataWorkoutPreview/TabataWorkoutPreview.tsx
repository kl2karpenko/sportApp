import React, { useContext, Fragment } from "react";

import { Box, Button, Grid, Typography } from "@mui/material";
import IRound from "../../../models/Round/IRound";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import TabataWorkoutPreviewRound from "./TabataWorkoutPreviewRound";

export default function HIITWorkoutPreview() {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);

  console.log(workoutSession, " workoutSession");

  return (
    <Grid container direction="column">
      {
        workoutSession?.rounds?.map((round: IRound, roundIndex: number) =>
          <TabataWorkoutPreviewRound key={`${round.bodyId}-${roundIndex}`} round={round} roundIndex={roundIndex} />
        )
      }
    </Grid>
  )
}