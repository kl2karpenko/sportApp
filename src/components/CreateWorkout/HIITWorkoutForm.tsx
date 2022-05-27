import { FormControl, FormLabel, Grid, TextField } from "@mui/material";
import React, { ChangeEvent, useContext, useMemo } from "react";
import { WorkoutSessionFields } from "../../models/WorkoutSession/WorkoutSessionFields";
import { SportAppContext } from "../../SportAppContext";

interface IHIITWorkoutFormProps {
  updateState: (stateName: WorkoutSessionFields, stateVal: number) => void;
}

export default function HIITWorkoutForm({ updateState }: IHIITWorkoutFormProps) {
  const { workoutSession } = useContext(SportAppContext);
  // @ts-ignore
  const WorkoutSessionFieldsPairs: { [key in WorkoutSessionFields]: number } = {
    [WorkoutSessionFields.roundsLength]: workoutSession?.roundsLength,
    [WorkoutSessionFields.exercisesLength]: workoutSession?.exercisesLength,
    [WorkoutSessionFields.exerciseDuration]: workoutSession?.exerciseDuration,
    [WorkoutSessionFields.restDuration]: workoutSession?.restDuration,
    [WorkoutSessionFields.betweenRoundsDuration]: workoutSession?.betweenRoundsDuration
  };

  console.log(workoutSession, " workoutSession");

  return (
    <>
      {Object.keys(WorkoutSessionFieldsPairs).map((field: WorkoutSessionFields) => (
        <Grid item xs={12} key={field}>
          <FormControl fullWidth>
            <FormLabel component="legend">Choose number of {field}</FormLabel>
            <TextField
              id={field}
              defaultValue={workoutSession && workoutSession[field]}
              type="number"
              min="1"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(field, Number(e.target.value))}
            />
          </FormControl>
        </Grid>
      ))}
    </>
  );
}