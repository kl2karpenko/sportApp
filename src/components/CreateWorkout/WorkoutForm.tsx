import { FormControl, FormLabel, Grid, TextField } from "@mui/material";
import React, {ChangeEvent, useContext, useMemo} from "react";
import Workout from "../../models/Workout/Workout";
import { WorkoutSessionFields } from "../../models/WorkoutSession/WorkoutSessionFields";
import {SportAppContext} from "../../SportAppContext";

interface ICreateWorkoutFormProps {
  updateState: (stateName: string, stateVal: number) => void;
}

export default function WorkoutForm({ updateState }: ICreateWorkoutFormProps) {
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

  return (
    <Grid item xs={6}>
      <Grid container direction="column" spacing={2}>
        {Object.keys(WorkoutSessionFieldsPairs).map((field: WorkoutSessionFields) => (
          <Grid item xs={12} key={field}>
            <FormControl fullWidth>
              <FormLabel component="legend">Choose number of {field}</FormLabel>
              <TextField
                id={field}
                defaultValue={workoutSettings?.workoutSession.getValue(field)}
                type="number"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  updateState(field, Number(e.target.value));
                }}
              />
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}