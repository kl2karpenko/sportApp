import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { WorkoutType } from "../../../interfaces/WorkoutType";
import TabataExercisesStepper from "./TabataExercisesStepper";
import HiitExercisesStepper from "./HiitExercisesStepper";

export default function ExercisesStepper() {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const workoutType = workoutSession.workoutType;

  if (workoutType === WorkoutType.Tabata) {
    return <TabataExercisesStepper />;
  }

  return <HiitExercisesStepper />;
}