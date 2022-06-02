import React, { useContext } from "react";

import { Grid } from "@mui/material";
import { SportAppContext } from "../../SportAppContext";
import IRound from "../../models/Round/IRound";
import WorkoutRoundExercisesPreview from "./WorkoutRoundExercisesPreview";
import WorkoutCreatorService from "../../services/WorkoutCreatorService/WorkoutCreatorService";

interface IWorkoutPreviewProps {
  workoutCreatorService: WorkoutCreatorService;
  handleRandomChangeExerciseForRound: (round: number, exerciseNum: number) => void;
  handleChangeExerciseForRound(roundIndex: number, exerciseIndex: number, value: string): void;
}

export default function WorkoutPreview({ workoutCreatorService, handleRandomChangeExerciseForRound, handleChangeExerciseForRound }: IWorkoutPreviewProps) {
  const { workoutSession } = useContext(SportAppContext);

  return (
    <Grid container direction="column">
      {
        workoutSession?.rounds?.map((round: IRound, roundIndex: number) => (
          <WorkoutRoundExercisesPreview
            key={round.bodyId + roundIndex}
            round={round}
            roundIndex={roundIndex}
            workoutCreatorService={workoutCreatorService}
            handleRandomChangeExerciseForRound={handleRandomChangeExerciseForRound}
            handleChangeExerciseForRound={handleChangeExerciseForRound}
          />
        ))
      }
    </Grid>
  )
}