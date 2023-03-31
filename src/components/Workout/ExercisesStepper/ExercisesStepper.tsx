import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { WorkoutType } from "../../../interfaces/WorkoutType";
import TabataExercisesStepper from "./TabataExercisesStepper";
import HiitExercisesStepper from "./HiitExercisesStepper";
import TabataWorkoutManagerService from "../../../services/ActiveWorkoutManagerService/TabataWorkoutManagerService";
import ActiveWorkoutManagerService from "../../../services/ActiveWorkoutManagerService/ActiveWorkoutManagerService";

export default function ExercisesStepper({ activeWorkoutManager }: { activeWorkoutManager: ActiveWorkoutManagerService }) {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const workoutType = workoutSession.workoutType;

  if (workoutType === WorkoutType.Tabata) {
    return <TabataExercisesStepper activeWorkoutManager={activeWorkoutManager as TabataWorkoutManagerService} />;
  }

  return <HiitExercisesStepper />;
}