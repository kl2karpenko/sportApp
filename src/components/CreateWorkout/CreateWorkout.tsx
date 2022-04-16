import React, {ChangeEvent, useState} from "react";

import { Paper, Typography, Grid, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";

import workoutTypes from "../../data/workout_types.json";
import { IWorkoutType } from "../../interfaces/IWorkoutType";
import {makeStyles} from "@mui/styles";

interface IStartWorkoutProps {

}

const useStyles = makeStyles({
  root: {
    padding: 30
  }
});

export default function StartWorkout(props: IStartWorkoutProps): React.ReactElement {
  const [workoutSettings, setWorkoutSettings] = useState<IWorkoutType>(Object.values(workoutTypes)[0]);
  const classes = useStyles();

  const updateState = (stateName: string, stateVal: number | string) => {
    setWorkoutSettings((state: IWorkoutType) => ({
      ...state,
      ...((workoutTypes as any)[stateVal as string] as IWorkoutType),
      [stateName]: stateVal
    }))
  }
  // console.log(props, workoutSettings);

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h5" gutterBottom component="div">
        Hello, let us create your perfect workout!!!
      </Typography>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Choose the type of workout</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="workout_type"
              value={workoutSettings.value}
              onChange={(e) => updateState("value", e.target.value)}
            >
              {Object.values(workoutTypes).map((workout: IWorkoutType) => <FormControlLabel key={workout.value} value={workout.value} control={<Radio />} label={workout.label} />)}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel component="legend">Choose number of rounds</FormLabel>
            <TextField
              id="rounds"
              value={workoutSettings.rounds}
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState("rounds", Number(e.target.value))}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel component="legend">Choose number of exercises</FormLabel>
            <TextField
              id="exercises"
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState("exercises", Number(e.target.value))}
              value={workoutSettings.exercises}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel component="legend">Choose duration of exercises (in seconds)</FormLabel>
            <TextField
              id="exercises_duration"
              value={workoutSettings.exercises_duration}
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState("exercises_duration", Number(e.target.value))}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel component="legend">Choose rest duration between the exercises (in seconds)</FormLabel>
            <TextField
              id="rest_duration"
              type="number"
              value={workoutSettings.rest_duration}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState("rest_duration", Number(e.target.value))}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel component="legend">Choose duration of rest between the rounds (in seconds)</FormLabel>
            <TextField
              id="rest_between_rounds"
              type="number"
              value={workoutSettings.rest_between_rounds}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState("rest_between_rounds", Number(e.target.value))}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary">
            Create a workout!
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}