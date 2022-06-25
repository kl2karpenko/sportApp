import React from "react";
import {useSelector} from "react-redux";

import WorkoutBuilderService from "../../services/WorkoutBuilderService/WorkoutBuilderService";
import {RootState} from "../../store/main";
import {WorkoutType} from "../../interfaces/WorkoutType";

import HIITWorkoutPreview from "./HIITWorkoutPreview";
import TabataWorkoutPreview from "./TabataWorkoutPreview";

interface IWorkoutPreviewProps {
  workoutBuilderService: WorkoutBuilderService;
}

export default function WorkoutPreview({ workoutBuilderService }: IWorkoutPreviewProps) {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const workoutType = workoutSession.workoutType;

  const getPreviewComponent = (workoutType: WorkoutType) => {
    switch (workoutType) {
    case WorkoutType.HIIT:
      return <HIITWorkoutPreview workoutBuilderService={workoutBuilderService} />;
    case WorkoutType.Tabata:
      return <TabataWorkoutPreview workoutBuilderService={workoutBuilderService} />;
    default:
      return <span />;
    }
  }

  return getPreviewComponent(workoutType!);
}