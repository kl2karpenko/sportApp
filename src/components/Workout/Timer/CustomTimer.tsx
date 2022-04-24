import React, { useEffect } from "react";
import useSound from "use-sound";
import { useTimer } from "react-timer-hook";
import { Box, Grid, Card, CardContent, Typography, IconButton, Theme } from "@mui/material";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Pause as PauseIcon, SkipNext, SkipPrevious } from "@material-ui/icons";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import { makeStyles } from "@mui/styles";
import {IWorkoutSession} from "../../../interfaces/IWorkoutSession";

const beepStartSound = require("../../../sounds/beep-start.mp3");
const beepEndSound = require("../../../sounds/beep.mp3");

interface IMyTimerProps {
  expiryTimestamp: Date;
  setNextStepInWorkout: () => Date;
  getInterval: (newWorkoutSession: IWorkoutSession) => Date;
  moveToNext: () => IWorkoutSession;
  moveToPrevious: () => IWorkoutSession;
  isResting: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  bigIcon: {
    fontSize: "50px"
  }
}));

let timeout: any = null;
export default function MyTimer({ expiryTimestamp, setNextStepInWorkout, getInterval, isResting, moveToNext, moveToPrevious }: IMyTimerProps) {
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
      clearTimeout(timeout);
      timeout = setTimeout(() => restart(setNextStepInWorkout()), 0);
    }
  });
  const [playBeep, { stop: stopBeep }] = useSound(beepEndSound);
  const classes = useStyles();

  useEffect(() => {
    if (isRunning && seconds <= 3) {
      playBeep();
    } else {
      stopBeep();
    }

    return () => {
      stopBeep();
      clearTimeout(timeout);
    };
  }, [isRunning, seconds]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Box p={2}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Typography align="center" color={isResting ? "secondary" : "primary"} variant="h4">{isResting ? "REST: " : "WORK: "}</Typography>
            </Grid>
            <Grid item>
              <Typography align="center" variant="h4">{minutes*60 + seconds}</Typography>
            </Grid>
          </Grid>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <LinearProgressWithLabel isResting={isResting} value={minutes*60 + seconds} />
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4} alignContent={"center"} alignItems={"center"} textAlign={"center"}>
                  <IconButton
                    color="primary"
                    aria-label="pause"
                    component="span"
                    onClick={() => restart(getInterval(moveToPrevious()))}
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
                    onClick={() => restart(getInterval(moveToNext()))}
                  >
                    {<SkipNext className={classes.bigIcon} />}
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}