import { FormControl, FormLabel, Grid, TextField } from "@mui/material";
import React, { ChangeEvent, useContext, useMemo } from "react";
import { WorkoutSessionFields } from "../../models/WorkoutSession/WorkoutSessionFields";
import { SportAppContext } from "../../SportAppContext";

interface IHIITWorkoutFormProps {
  updateState: (stateName: WorkoutSessionFields, stateVal: number) => void;
}

export default function HIITWorkoutForm({ updateState }: IHIITWorkoutFormProps) {
  const { workoutSettings } = useContext(SportAppContext);
  const currentWorkoutSession = workoutSettings?.workoutSession;
  // @ts-ignore
  const WorkoutSessionFieldsPairs: { [key in WorkoutSessionFields]: number } = useMemo(() => ({
    [WorkoutSessionFields.roundsLength]: currentWorkoutSession?.roundsLength,
    [WorkoutSessionFields.exercisesLength]: currentWorkoutSession?.exercisesLength,
    [WorkoutSessionFields.exerciseDuration]: currentWorkoutSession?.exerciseDuration,
    [WorkoutSessionFields.restDuration]: currentWorkoutSession?.restDuration,
    [WorkoutSessionFields.betweenRoundsDuration]: currentWorkoutSession?.betweenRoundsDuration
  }
  ), [currentWorkoutSession]);

  return Object.keys(WorkoutSessionFieldsPairs).map((field: WorkoutSessionFields) => (
    <Grid item xs={12} key={field}>
      <FormControl fullWidth>
        <FormLabel component="legend">Choose number of {field}</FormLabel>
        <TextField
          id={field}
          defaultValue={workoutSettings?.workoutSession.getValue(field)}
          type="number"
          min="1"
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(field, Number(e.target.value))}
        />
      </FormControl>
    </Grid>
  ))}