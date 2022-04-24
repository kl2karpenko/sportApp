import React from "react";
import { IWorkoutGeneratedExercisesList, IWorkoutType } from "../../interfaces/IWorkoutType";

import { Typography, Grid } from "@mui/material";
import bodyPartsForWorkout from "../../data/bodyPartsForWorkout";
import {IBodyPartsForWorkout} from "../../interfaces/IBodyPartsForWorkout";

interface IWorkoutPreviewProps {
  workoutSettings: IWorkoutType;
}

export default function WorkoutPreview({ workoutSettings }: IWorkoutPreviewProps) {
  return (
    <Grid container spacing={1} direction="column">
      {workoutSettings.all_exercises_for_generated_list?.map((allExercises: IWorkoutGeneratedExercisesList) => (
        <>
          <Grid item xs={12}>
            <Typography variant="h6" color={"primary"}>Exercises for {bodyPartsForWorkout[allExercises.bodyPartName as any]}</Typography>
          </Grid>
          {allExercises.exercises.map((exercise: IBodyPartsForWorkout, index: number) => (
            <Grid key={exercise.id + index} item xs={12}>
              <Typography variant={"body2"}>{`${index + 1}. `}  {exercise.label}</Typography>
            </Grid>
          ))}
        </>
      ))}
    </Grid>
  )
}