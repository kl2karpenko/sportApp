import { WorkoutType } from "../../interfaces/WorkoutType";
import HIITWorkoutForm from "./HIITWorkoutForm";
import TabataWorkoutForm from "./TabataWorkoutForm";
import React from "react";
import { WorkoutSessionFields } from "../../interfaces/WorkoutSessionFields";
import { useSelector } from "react-redux";
import { RootState } from "../../store/main";

interface IFormComponentProps {
  updateState: (stateName: WorkoutSessionFields, stateVal: number) => void;
}

export default function FormComponent ({ updateState }: IFormComponentProps) {
  const workoutType = useSelector((state: RootState) => state.workoutSession.workoutType);

  if (workoutType === WorkoutType.HIIT) {
    return <HIITWorkoutForm key="hiitWorkoutForm" updateState={updateState} />;
  }

  return <TabataWorkoutForm key="tabataWorkoutForm" updateState={updateState} />;
}