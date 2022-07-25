import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/main";
import { WorkoutType } from "../../interfaces/WorkoutType";

import HIITWorkoutPreview from "./HIITWorkoutPreview";
import TabataWorkoutPreview from "./TabataWorkoutPreview";

export default function WorkoutPreview() {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const workoutType = workoutSession.workoutType;

  switch (workoutType) {
  case WorkoutType.HIIT:
    return <HIITWorkoutPreview />;
  case WorkoutType.Tabata:
    return <TabataWorkoutPreview />;
  default:
    return <span />;
  }
}