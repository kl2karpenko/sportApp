import React from "react";

import { Grid } from "@mui/material";
import IRound from "../../../models/Round/IRound";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { generateRandomWorkoutExerciseInRound, updateWorkoutExerciseInRound } from "../../../store/workoutSession";

import TabataWorkoutPreviewRound from "./TabataWorkoutPreviewRound";

export default function HIITWorkoutPreview() {
  const dispatch = useDispatch();
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const handleRandomChangeExerciseForRound = (roundIndex: number, exerciseIndex: number, isCardio: boolean) =>
    dispatch(generateRandomWorkoutExerciseInRound({ roundIndex, exerciseIndex, isCardio }));
  const handleChangeExerciseForRound = (roundIndex: number, exerciseIndex: number, exerciseValue: any) =>
    dispatch(updateWorkoutExerciseInRound({ roundIndex, exerciseIndex, exerciseValue }));

  return (
    <Grid container direction="column" spacing={2}>
      {
        workoutSession?.rounds?.map((round: Partial<IRound>, roundIndex: number) =>
          <TabataWorkoutPreviewRound
            handleChangeExerciseForRound={handleChangeExerciseForRound}
            handleRandomChangeExerciseForRound={handleRandomChangeExerciseForRound}
            key={`${round.bodyId}-${roundIndex}`}
            round={round}
            roundIndex={roundIndex}
            includeCardio={workoutSession.includeCardio}
          />
        )
      }
    </Grid>
  )
}