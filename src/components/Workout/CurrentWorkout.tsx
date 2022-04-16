import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";

import { Box, Paper, Typography, Grid, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";

import Timer from "./Timer";
import {SportAppContext} from "../../SportAppContext";
import {IWorkoutSession} from "../../interfaces/IWorkoutSession";

export default function Workout(): React.ReactElement {
  const { workoutSettings, currentWorkoutSession, setCurrentWorkoutSession } = useContext(SportAppContext);
  // stop reload the page
  // useEffect(() => {
  //   window.onbeforeunload = (event) => {
  //     const e = event || window.event;
  //     // Cancel the event
  //     e.preventDefault();
  //     if (e) {
  //       e.returnValue = ""; // Legacy method for cross browser support
  //     }
  //     return ""; // Legacy method for cross browser support
  //   };
  //
  //   return () => {
  //     window.onbeforeunload = null;
  //   }
  // }, []);

  const {
    exercise: currentExercise,
    round: currentRound,
    timeInterval,
    inProgress
  } = currentWorkoutSession;

  console.log(workoutSettings, "workoutSettings");
  console.log(timeInterval, "timeInterval");
  console.log(currentRound, "currentRound");
  console.log(currentExercise, "currentExercise");

  return (
    <Box p={2}>
      <Grid container direction="column" spacing={3}>
        {!inProgress && (<Grid item xs={12}>
          <Typography variant="h5" gutterBottom component="div">
            Lets have a Workout: {workoutSettings.label}
          </Typography>
        </Grid>)}
        {inProgress ?
          (<Typography variant="h5" gutterBottom component="div">
            {workoutSettings.label}
          </Typography>) : ""}
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={3}>
              <Timer />
            </Grid>
            <Grid item xs={6}>
              &nbsp;
            </Grid>
            <Grid item xs={3}>

            </Grid>
          </Grid>
        </Grid>
        {!inProgress && (<Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => {
              setCurrentWorkoutSession((state: IWorkoutSession) => ({
                ...state,
                inProgress: true,
                round: 1,
                exercise: 1
              }))
            }}
          >
            Click Here to start!
          </Button>
        </Grid>)}
      </Grid>
    </Box>
  ) ;
}