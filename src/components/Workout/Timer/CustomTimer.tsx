import React, { useEffect } from "react";
import useSound from "use-sound";
import { useTimer } from "react-timer-hook";
import { Box, Card, CardContent, Grid, IconButton, Theme, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Pause as PauseIcon, SkipNext, SkipPrevious } from "@mui/icons-material";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import { makeStyles } from "tss-react/mui";

const beepEndSound = require("../../../sounds/beep.mp3");

interface IMyTimerProps {
  expiryTimestamp: Date;
  // setNextStepInWorkout: () => Date;
  moveToNext: () => Date | null;
  moveToPrevious: () => Date;
  isResting: boolean;
  isEnded: boolean;
  className?: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
  bigIcon: {
    fontSize: "50px"
  }
}));

export default function MyTimer({ expiryTimestamp, isResting, isEnded, moveToNext, moveToPrevious, className }: IMyTimerProps) {
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
  const [playBeep, { stop: stopBeep }] = useSound(beepEndSound, { volume: 0.5 });
  const { classes } = useStyles();
  const totalTimerTime = minutes*60 + seconds;

  useEffect(() => {
    if (isRunning && (totalTimerTime) <= 3) {
      playBeep();
    } else {
      stopBeep();
    }

    return () => stopBeep();
  }, [isRunning, seconds]);

  return (
    <Card variant="outlined" className={className}>
      <CardContent>
        <Box p={2}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Typography align="center" color={isResting ? "secondary" : "primary"} variant="h4">{isResting ? "REST: " : "WORK: "}</Typography>
            </Grid>
            <Grid item>
              <Typography align="center" variant="h4">{totalTimerTime}</Typography>
            </Grid>
          </Grid>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <LinearProgressWithLabel isResting={isResting} value={totalTimerTime} />
            </Grid>
            <Grid item xs={12}>
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
        </Box>
      </CardContent>
    </Card>
  );
}