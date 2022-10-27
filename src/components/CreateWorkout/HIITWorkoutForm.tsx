import { FormControl, FormLabel, Grid, TextField, FormControlLabel, Checkbox } from "@mui/material";
import React, { ChangeEvent } from "react";
import { WorkoutSessionFields } from "../../interfaces/WorkoutSessionFields";
import { useSelector } from "react-redux";
import { RootState } from "../../store/main";

interface IHIITWorkoutFormProps {
  updateState: (stateName: WorkoutSessionFields, stateVal: any) => void;
}

export default function HIITWorkoutForm({ updateState }: IHIITWorkoutFormProps) {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
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
      <Grid item xs={12}>
        <Grid container alignItems="center" alignContent="content">
          <Grid item>
            <FormControl fullWidth>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => updateState(WorkoutSessionFields.onlyCardio, !workoutSession.onlyCardio)}
                    checked={workoutSession.onlyCardio}
                  />
                }
                label="Only cardio exercises"
                id="onlyCardio"
              />
            </FormControl>
          </Grid>
        </Grid>
        {!workoutSession.onlyCardio && (
          <Grid container alignItems="center" alignContent="content">
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => updateState(WorkoutSessionFields.includeCardio, !workoutSession.includeCardio)}
                      checked={workoutSession.includeCardio}
                    />
                  }
                  label="Include cardio"
                  id="includeCardio"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              {workoutSession.includeCardio &&
                (<FormControl fullWidth>
                  <FormLabel component="legend">Step for cardio exercise</FormLabel>
                  <TextField
                    id="cardioStep"
                    value={workoutSession.cardioStep}
                    type="number"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const step = Number(e.target.value);
                      if (step > 1 && step < workoutSession.exercisesLength - 1) {
                        return updateState(WorkoutSessionFields.cardioStep, step);
                      }

                      updateState(WorkoutSessionFields.cardioStep, Number(1));
                    }}
                  />
                </FormControl>)}
            </Grid>
          </Grid>
        )}
      </Grid>
      {Object.keys(WorkoutSessionFieldsPairs).map((field: any) => (
        <Grid item xs={12} key={field}>
          <FormControl fullWidth>
            <FormLabel component="legend">Choose number of {field}</FormLabel>
            <TextField
              id={field}
              value={WorkoutSessionFieldsPairs[field as unknown as WorkoutSessionFields]}
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(field, Number(e.target.value))}
            />
          </FormControl>
        </Grid>
      ))}
    </>
  );
}