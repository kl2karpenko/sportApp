import { FormControl, FormLabel, Grid, TextField } from "@mui/material";
import React, { ChangeEvent, useContext } from "react";
import { WorkoutSessionFields } from "../../services/WorkoutSessionService/WorkoutSessionFields";
import { SportAppContext } from "../../SportAppContext";

interface IHIITWorkoutFormProps {
  updateState: (stateName: WorkoutSessionFields, stateVal: number) => void;
}

export default function HIITWorkoutForm({ updateState }: IHIITWorkoutFormProps) {
  const { workoutSession } = useContext(SportAppContext);
  console.log(workoutSession, " workoutSession HIITWorkoutForm ");
  // @ts-ignore
  const WorkoutSessionFieldsPairs: { [key in WorkoutSessionFields]: number } = {
    [WorkoutSessionFields.roundsLength]: workoutSession?.roundsLength || 0,
    [WorkoutSessionFields.exercisesLength]: workoutSession?.exercisesLength || 0,
    [WorkoutSessionFields.exerciseDuration]: workoutSession?.exerciseDuration || 0,
    [WorkoutSessionFields.restDuration]: workoutSession?.restDuration || 0,
    [WorkoutSessionFields.betweenRoundsDuration]: workoutSession?.betweenRoundsDuration || 0
  };

  return (
    <>
      {Object.keys(WorkoutSessionFieldsPairs).map((field: WorkoutSessionFields) => (
        <Grid item xs={12} key={field}>
          <FormControl fullWidth>
            <FormLabel component="legend">Choose number of {field}</FormLabel>
            <TextField
              id={field}
              value={WorkoutSessionFieldsPairs[field]}
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