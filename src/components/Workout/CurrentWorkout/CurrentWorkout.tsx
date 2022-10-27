import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../store/main";
import { WorkoutType } from "../../../interfaces/WorkoutType";
import HiitWorkout from "./HiitWorkout";
import TabataWorkout from "./TabataWorkout";

export default function CurrentWorkout(): React.ReactElement {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const workoutType = workoutSession.workoutType;

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

  if (workoutType === WorkoutType.HIIT) {
    return <HiitWorkout />;
  }

  return <TabataWorkout />;
}