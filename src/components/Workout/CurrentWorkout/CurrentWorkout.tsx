import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { RootState } from "../../../store/main";
import { WorkoutType } from "../../../interfaces/WorkoutType";
import HiitWorkout from "./HiitWorkout";
import TabataWorkout from "./TabataWorkout";
import timerService from "../../../services/TimerService";
import ActiveWorkoutManagerService from "../../../services/ActiveWorkoutManagerService/ActiveWorkoutManagerService";
import { useStyles } from "../styles";
import Timer from "../Timer";

export default function CurrentWorkout(): React.ReactElement {
  const { classes } = useStyles();
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const activeWorkoutState = useSelector((state: RootState) => state.activeWorkout);
  const workoutType = workoutSession.workoutType;
  const timerServiceSingleton = React.useMemo(() => timerService({ workoutSettings: workoutSession, activeWorkoutState }), [workoutSession, activeWorkoutState]);

  const activeWorkoutManager = useMemo(() => new ActiveWorkoutManagerService({
    workoutSession
  }), [workoutSession]);
  // stop reload the page
  useEffect(() => {
    window.onbeforeunload = (event) => {
      const e = event || window.event;
      // Cancel the event
      e.preventDefault();
      if (e) {
        e.returnValue = ""; // Legacy method for cross browser support
      }
      return ""; // Legacy method for cross browser support
    };

    return () => {
      window.onbeforeunload = null;
    }
  }, []);

  const getWorkoutByType = () => {
    if (workoutType === WorkoutType.HIIT) {
      return <HiitWorkout />;
    }

    return <TabataWorkout />;
  }

  return (
    <Box>
      <Box className={classes.timer}>
        <Timer activeWorkoutManager={activeWorkoutManager} timerServiceSingleton={timerServiceSingleton} />
      </Box>
      {getWorkoutByType()}
    </Box>
  )
}