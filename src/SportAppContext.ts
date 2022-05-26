import React, { Dispatch, SetStateAction } from "react";

import { IDialogProps } from "./interfaces/IDialogProps";
import BasicWorkout from "./models/Workout/BasicWorkout";
import WorkoutSession from "./models/WorkoutSession/WorkoutSession";
import { WorkoutType } from "./interfaces/WorkoutType";
import IWorkoutSessionForState from "./models/WorkoutSession/IWorkoutSessionForState";

export interface ISportAppContext {
  workoutSettings: BasicWorkout | null;
  setWorkoutSettings: Dispatch<SetStateAction<BasicWorkout | null>>;
  workoutSession: IWorkoutSessionForState | null;
  setWorkoutSession: Dispatch<SetStateAction<IWorkoutSessionForState | null>>;
  workoutType: WorkoutType;
  setWorkoutType: Dispatch<SetStateAction<WorkoutType>>;
  dialogProps: IDialogProps;
  setDialogProps: Dispatch<SetStateAction<IDialogProps>>;
}

export const SportAppContext = React.createContext({
  workoutSettings: null,
  workoutSession: null
} as ISportAppContext);