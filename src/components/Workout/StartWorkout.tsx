import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";

import { Typography, Grid } from "@mui/material";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import Timer from "./Timer";
import {SportAppContext} from "../../SportAppContext";
import {IWorkoutSession} from "../../interfaces/IWorkoutSession";

export default function CurrentWorkout(): React.ReactElement {
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
    <>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Timer />
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom component="div">
                  Round: {currentRound}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom component="div">
                  Exercise: {currentExercise}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Stepper activeStep={currentRound}>
          {Array.from({ length: workoutSettings.rounds }, (_, i) => i + 1).map((round: number) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={`round-${round}`}>
                <StepLabel>Round</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Grid>
    </>
  ) ;
}