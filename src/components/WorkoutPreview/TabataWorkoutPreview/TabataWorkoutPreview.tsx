import React, { useContext, Fragment } from "react";

import { Box, Button, Grid, Typography } from "@mui/material";
import IRound from "../../../models/Round/IRound";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import TabataWorkoutPreviewRound from "./TabataWorkoutPreviewRound";
import { generateRandomWorkoutExerciseInRound, updateWorkoutExerciseInRound } from "../../../store/workoutSession";

export default function HIITWorkoutPreview() {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const dispatch = useDispatch();
  const handleRandomChangeExerciseForRound = (roundIndex: number, exerciseIndex: number, isCardio: boolean) =>
    dispatch(generateRandomWorkoutExerciseInRound({ roundIndex, exerciseIndex, isCardio }));

  console.log(workoutSession, " workoutSession");

  return (
    <Grid container direction="column" spacing={2}>
      {
        workoutSession?.rounds?.map((round: IRound, roundIndex: number) =>
          <TabataWorkoutPreviewRound handleRandomChangeExerciseForRound={handleRandomChangeExerciseForRound} key={`${round.bodyId}-${roundIndex}`} round={round} roundIndex={roundIndex} />
        )
      }
    </Grid>
  )
}