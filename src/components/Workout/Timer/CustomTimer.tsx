import React, {useContext, useEffect, useState} from "react";

import { Box, Paper, Grid, Typography, Button, IconButton, LinearProgress } from "@mui/material";

import { useTimer } from "react-timer-hook";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import {SportAppContext} from "../../../SportAppContext";
import {setNextStep} from "../workout-helpers";
import {IWorkoutSession} from "../../../interfaces/IWorkoutSession";
import {IWorkoutType} from "../../../interfaces/IWorkoutType";


const getIntervalForTimer = ({ currentWorkoutSession, workoutSettings }: { currentWorkoutSession: IWorkoutSession; workoutSettings: IWorkoutType }): Date => {
  let interval = 0;

  if (currentWorkoutSession.isResting && currentWorkoutSession.exercise < workoutSettings.exercises) {
    interval = workoutSettings.rest_between_rounds;
  }

  if (currentWorkoutSession.isResting && currentWorkoutSession.exercise === workoutSettings.exercises) {
    interval = workoutSettings.rest_duration;
  }

  if (currentWorkoutSession.inProgress) {
    interval = workoutSettings.exercise_duration;
  }

  const time = new Date();
  time.setSeconds(time.getSeconds() + interval);
  return time;
};


function LinearProgressWithLabel({ value }: { value: number }) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Timer(): React.ReactElement {
  const { workoutSettings, currentWorkoutSession, setCurrentWorkoutSession } = useContext(SportAppContext);
  const expiryTimestamp = getIntervalForTimer({ currentWorkoutSession, workoutSettings });
  const {
    seconds,
    isRunning,
    pause,
    restart,
    resume
  } = useTimer({
    autoStart: true,
    expiryTimestamp,
    onExpire: () => {
      console.log("timer is done");
      const updatedWorkoutState: IWorkoutSession = setNextStep({
        currentWorkoutSession, workoutSettings
      });
      console.log(updatedWorkoutState, " updatedWorkoutState");
      setCurrentWorkoutSession(updatedWorkoutState);

      const newInterval = getIntervalForTimer({ currentWorkoutSession: updatedWorkoutState, workoutSettings });
      console.log(newInterval, " : newInterval");
      restart(newInterval);
      // console.log("reset timer and start again with new time:", newInterval);
    }
  });
  // add song when timer ends up

  return (
    <Paper elevation={1}>
      <Box p={2}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography align={"center"} variant={"h2"}>{seconds}</Typography>
          </Grid>
          <Grid item xs={12}>
            <LinearProgressWithLabel value={seconds} />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              {/*<Grid item xs={12} alignContent={"center"} alignItems={"center"} textAlign={"center"}>*/}
              {/*  <IconButton color="secondary" aria-label="pause" component="span" onClick={isRunning ? pause : resume}>*/}
              {/*    {isRunning ? <PauseIcon fontSize={"large"} /> : <PlayArrowIcon fontSize={"large"} />}*/}
              {/*  </IconButton>*/}
              {/*</Grid>*/}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

Timer.defaultProps = {
  intervalTime: 60
}