import React, { Dispatch, SetStateAction } from "react";

import { IDialogProps } from "./interfaces/IDialogProps";
import Workout from "./models/Workout/Workout";
import WorkoutSession from "./models/WorkoutSession/WorkoutSession";
import { WorkoutType } from "./interfaces/WorkoutType";
import IWorkoutSessionForState from "./models/WorkoutSession/IWorkoutSessionForState";

export interface ISportAppContext {
  workoutSettings: Workout | null;
  setWorkoutSettings: Dispatch<SetStateAction<Workout | null>>;
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