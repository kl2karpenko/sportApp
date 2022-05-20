import { FormControl, FormLabel, Grid, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import Workout from "../../models/Workout/Workout";
import { WorkoutSessionFields } from "../../models/WorkoutSession/WorkoutSessionFields";

interface ICreateWorkoutFormProps { updateState: Function; workoutSettings: Workout | null; }


export default function WorkoutForm({ updateState, workoutSettings }: ICreateWorkoutFormProps) {
  // @ts-ignore
  const WorkoutSessionFieldsPairs: { [key: WorkoutSessionFields]: number } = {
    [WorkoutSessionFields.roundsLength]: workoutSettings?.workoutSession?.roundsLength,
    [WorkoutSessionFields.exercisesLength]: workoutSettings?.workoutSession?.exercisesLength,
    [WorkoutSessionFields.exerciseDuration]: workoutSettings?.workoutSession?.exerciseDuration,
    [WorkoutSessionFields.restDuration]: workoutSettings?.workoutSession?.restDuration,
    [WorkoutSessionFields.betweenRoundsDuration]: workoutSettings?.workoutSession?.betweenRoundsDuration
  }

  return (
    <Grid item xs={6}>
      <Grid container direction="column" spacing={2}>
        {Object.keys(WorkoutSessionFieldsPairs).map((field: WorkoutSessionFields) => (
          <Grid item xs={12} key={field}>
            <FormControl fullWidth>
              <FormLabel component="legend">Choose number of {field}</FormLabel>
              <TextField
                id={field}
                value={WorkoutSessionFieldsPairs[field]}
                type="number"
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(field, Number(e.target.value))}
              />
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}