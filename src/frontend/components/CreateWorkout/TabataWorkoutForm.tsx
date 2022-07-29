import { Checkbox, FormControl, FormControlLabel, FormLabel, Grid, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import { WorkoutSessionFields } from "../../interfaces/WorkoutSessionFields";
import { useSelector } from "react-redux";
import { RootState } from "../../store/main";

interface ITabataWorkoutFormProps {
  updateState: (stateName: WorkoutSessionFields, stateVal: number | boolean) => void;
}

export default function TabataWorkoutForm({ updateState }: ITabataWorkoutFormProps) {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  // @ts-ignore
  const WorkoutSessionFieldsPairs: { [key in WorkoutSessionFields]: number } = {
    [WorkoutSessionFields.roundsLength]: workoutSession?.roundsLength || 0
  };

  return (
    <>
      <Grid item xs={12} key={"cardioTabata"}>
        <FormControl fullWidth>
          <FormControlLabel control={<Checkbox
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(WorkoutSessionFields.includeCardio, !workoutSession.includeCardio)}
            checked={workoutSession.includeCardio}
          />} label="Include cardio" id={"includeCardio"} />
        </FormControl>
      </Grid>
      {Object.keys(WorkoutSessionFieldsPairs).map((field: any) => (
        <Grid item xs={12} key={field}>
          <FormControl fullWidth>
            <FormLabel component="legend">Choose number of {field}</FormLabel>
            <TextField
              id={field}
              value={workoutSession && workoutSession[field as unknown as WorkoutSessionFields]}
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(field, Number(e.target.value))}
            />
          </FormControl>
        </Grid>
      ))}
    </>
  )
}