import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";
import IRound from "../../../models/Round/IRound";
import HIITWorkoutPreviewRound from "./HIITWorkoutPreviewRound";
import { RootState } from "../../../store/main";
import { generateRandomWorkoutExerciseInRound, updateWorkoutExerciseInRound } from "../../../store/workoutSession";

export default function HIITWorkoutPreview() {
  const dispatch = useDispatch();
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const handleChangeExerciseForRound = (roundIndex: number, exerciseIndex: number, exerciseValue: string) =>
    dispatch(updateWorkoutExerciseInRound({ roundIndex, exerciseIndex, exerciseValue }));
  const handleRandomChangeExerciseForRound = (roundIndex: number, exerciseIndex: number, isCardio: boolean) =>
    dispatch(generateRandomWorkoutExerciseInRound({ roundIndex, exerciseIndex, isCardio }));

  // THIS SHOULD DIFFER FROM TABATA PREVIEW
  return (
    <Grid container direction="column" spacing={2}>
      {
        workoutSession?.rounds?.map((round: Partial<IRound>, roundIndex: number) => (
          <HIITWorkoutPreviewRound
            key={round.bodyId! + roundIndex}
            round={round}
            roundIndex={roundIndex}
            handleRandomChangeExerciseForRound={handleRandomChangeExerciseForRound}
            handleChangeExerciseForRound={handleChangeExerciseForRound}
          />
        ))
      }
    </Grid>
  )
}