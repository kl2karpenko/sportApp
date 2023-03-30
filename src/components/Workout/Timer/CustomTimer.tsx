import React, { useEffect } from "react";
import useSound from "use-sound";
import { useTimer } from "react-timer-hook";
import { Box, Card, CardContent, Grid, IconButton, Theme, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Pause as PauseIcon, SkipNext, SkipPrevious } from "@mui/icons-material";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import { makeStyles } from "tss-react/mui";
import { WorkoutTimerService } from "../../../services/TimerService";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";

const beepEndSound = require("../../../sounds/clock-countdown.wav");

interface IMyTimerProps {
  expiryTimestamp: Date;
  // setNextStepInWorkout: () => Date;
  moveToNext: () => Date | null;
  moveToPrevious: () => Date;
  isResting: boolean;
  isEnded: boolean;
  timerServiceSingleton: WorkoutTimerService;
  className?: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
  bigIcon: {
    fontSize: "50px"
  }
}));

export default function MyTimer({ expiryTimestamp, isResting, isEnded, moveToNext, moveToPrevious, className, timerServiceSingleton }: IMyTimerProps) {
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const {
    minutes,
    seconds,
    isRunning,
    pause,
    resume,
    restart
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      const newTime = moveToNext();

      if (newTime) {
        setTimeout(() => restart(newTime), 0);
      } else {
        pause();
      }
    }
  });
  const [playBeep, { stop: stopBeep }] = useSound(beepEndSound, { volume: 0.3 });
  const { classes } = useStyles();
  const totalTimerTime = minutes*60 + seconds;

  // stop reload the page
  useEffect(() => {
    timerServiceSingleton.calculateWorkoutDuration({ workoutSettings: workoutSession, activeWorkoutState: activeWorkout, substract: totalTimerTime });
  }, [workoutSession, activeWorkout, totalTimerTime]);

  useEffect(() => {
    if (isRunning && (totalTimerTime) <= 2) {
      playBeep();
    } else {
      stopBeep();
    }

    return () => stopBeep();
  }, [isRunning, seconds]);

  return (
    <Card variant="elevation" elevation={2} className={className}>
      <CardContent>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={3}>
            <Typography align="center" color={isResting ? "primary" : "secondary"} variant="h5">
              {timerServiceSingleton.timeLeft}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography align="center" color={isResting ? "secondary" : "primary"} variant="h5">
              {isResting ? "REST: " : "WORK: "} <br /> {totalTimerTime}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={4} alignContent={"center"} alignItems={"center"} textAlign={"center"}>
                <IconButton
                  color="primary"
                  aria-label="pause"
                  component="span"
                  onClick={() => restart(moveToPrevious())}
                >
                  {<SkipPrevious className={classes.bigIcon} />}
                </IconButton>
              </Grid>
              <Grid item xs={4} alignContent={"center"} alignItems={"center"} textAlign={"center"}>
                <IconButton color="secondary" aria-label="pause" component="span" onClick={isRunning ? pause : resume}>
                  {isRunning ? <PauseIcon className={classes.bigIcon} /> : <PlayArrowIcon className={classes.bigIcon} fontSize={"large"} />}
                </IconButton>
              </Grid>
              <Grid item xs={4} alignContent={"center"} alignItems={"center"} textAlign={"center"}>
                <IconButton
                  color="primary"
                  aria-label="pause"
                  component="span"
                  disabled={isEnded}
                  onClick={() => {
                    const newTime = moveToNext();
                    if (newTime && !isEnded) {
                      restart(newTime);
                    }
                  }}
                >
                  {<SkipNext className={classes.bigIcon} />}
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <LinearProgressWithLabel isResting={isResting} value={totalTimerTime} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}