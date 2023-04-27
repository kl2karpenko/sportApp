import React, { SetStateAction } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { WorkoutType } from "../../../interfaces/WorkoutType";
import TabataExercisesStepper from "./TabataExercisesStepper";
import HiitExercisesStepper from "./HiitExercisesStepper";
import TabataWorkoutManagerService from "../../../services/ActiveWorkoutManagerService/TabataWorkoutManagerService";
import ActiveWorkoutManagerService from "../../../services/ActiveWorkoutManagerService/ActiveWorkoutManagerService";

export default function ExercisesStepper({ activeWorkoutManager, setRestart }: { activeWorkoutManager: ActiveWorkoutManagerService; setRestart: Function }) {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const workoutType = workoutSession.workoutType;

  if (workoutType === WorkoutType.Tabata) {
    return <TabataExercisesStepper activeWorkoutManager={activeWorkoutManager as TabataWorkoutManagerService} setRestart={setRestart} />;
  }

  return <HiitExercisesStepper activeWorkoutManager={activeWorkoutManager as ActiveWorkoutManagerService} setRestart={setRestart} />;
}