import React, { useContext } from "react";
import {useDispatch, useSelector} from "react-redux";

import { Grid } from "@mui/material";
import IRound from "../../../models/Round/IRound";
import HIITWorkoutPreviewRound from "./HIITWorkoutPreviewRound";
import WorkoutBuilderService from "../../../services/WorkoutBuilderService/WorkoutBuilderService";
import {RootState} from "../../../store/main";
import {updateWorkoutExerciseInRound, generateRandomWorkoutExerciseInRound} from "../../../store/workoutSession";

interface IWorkoutPreviewProps {
  workoutBuilderService: WorkoutBuilderService;
}

export default function HIITWorkoutPreview({ workoutBuilderService }: IWorkoutPreviewProps) {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const dispatch = useDispatch();

  const handleChangeExerciseForRound = (roundIndex: number, exerciseIndex: number, exerciseValue: string) => {
    dispatch(updateWorkoutExerciseInRound({ roundIndex, exerciseIndex, exerciseValue }));
  };

  const handleRandomChangeExerciseForRound = (roundIndex: number, exerciseIndex: number) => {
    dispatch(generateRandomWorkoutExerciseInRound({ roundIndex, exerciseIndex }));
  };

  // THIS SHOULD DIFFER FROM TABATA PREVIEW
  return (
    <Grid container direction="column">
      {
        workoutSession?.rounds?.map((round: IRound, roundIndex: number) => (
          <HIITWorkoutPreviewRound
            key={round.bodyId + roundIndex}
            round={round}
            roundIndex={roundIndex}
            workoutCreatorService={workoutBuilderService}
            handleRandomChangeExerciseForRound={handleRandomChangeExerciseForRound}
            handleChangeExerciseForRound={handleChangeExerciseForRound}
          />
        ))
      }
    </Grid>
  )
}