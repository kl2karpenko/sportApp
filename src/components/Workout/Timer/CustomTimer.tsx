import React, { SetStateAction, useEffect } from "react";
import useSound from "use-sound";
import { useTimer } from "react-timer-hook";
import { Card, CardContent, Grid, IconButton, Theme, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Pause as PauseIcon, SkipNext, SkipPrevious } from "@mui/icons-material";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import { makeStyles } from "tss-react/mui";
import { WorkoutTimerService } from "../../../services/WorkoutTimerService";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";

const beepEndSound = require("../../../sounds/mixkit-repeating-arcade-beep-1084.wav");

interface IMyTimerProps {
  expiryTimestamp: Date;
  // setNextStepInWorkout: () => Date;
  moveToNext: () => Date | null;
  moveToPrevious: () => Date;
  isResting: boolean;
  isEnded: boolean;
  timerServiceSingleton: WorkoutTimerService;
  className?: string;
  restart: Date;
}

const useStyles = makeStyles()((theme: Theme) => ({
  bigIcon: {
    fontSize: "50px"
  }
}));

export default function MyTimer({ expiryTimestamp, isResting, isEnded, moveToNext, moveToPrevious, className, timerServiceSingleton, restart: restartTime }: IMyTimerProps) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutSession, activeWorkout, totalTimerTime]);

  // restart the timer
  useEffect(() => {
    console.log("restartTime");
    restart(restartTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restartTime]);

  useEffect(() => {
    if (isRunning && totalTimerTime <= 1) {
      playBeep();
    } else {
      stopBeep();
    }

    return () => stopBeep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, seconds]);

  return (
    <Card variant="elevation" elevation={2} className={className}>
      <CardContent>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={3}>
            <Typography align="center" variant="h4">
              {timerServiceSingleton.timeLeft}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography align="center" variant="h4">
              {isResting ? "REST: " : "WORK: "} {totalTimerTime}
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