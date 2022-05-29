import {WorkoutType} from "../../interfaces_deprecated/WorkoutType";
import HIITWorkoutForm from "./HIITWorkoutForm";
import TabataWorkoutForm from "./TabataWorkoutForm";
import React, {useContext} from "react";
import {SportAppContext} from "../../SportAppContext";
import {WorkoutSessionFields} from "../../services/WorkoutSessionService/WorkoutSessionFields";

interface IFormComponentProps {
  updateState: (stateName: WorkoutSessionFields, stateVal: number) => void;
}

export default function FormComponent ({ updateState }: IFormComponentProps) {
  const { workoutType } = useContext(SportAppContext);

  console.log(workoutType, " workoutType");

  if (workoutType === WorkoutType.HIIT) {
    return <HIITWorkoutForm key="hiitWorkoutForm" updateState={updateState} />;
  }

  return <TabataWorkoutForm key="tabataWorkoutForm" updateState={updateState} />;
}