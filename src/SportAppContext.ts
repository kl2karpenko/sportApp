import React, { Dispatch, SetStateAction } from "react";

import { IDialogProps } from "./interfaces/IDialogProps";
import { WorkoutType } from "./interfaces/WorkoutType";
import IWorkoutSessionForState from "./models/WorkoutSession/IWorkoutSessionForState";
import IWorkout from "./models/Workout/IWorkout";

export interface ISportAppContext {
  workoutSettings: IWorkout;
  setWorkoutSettings: Dispatch<SetStateAction<IWorkout>>;
  workoutSession: IWorkoutSessionForState | null;
  setWorkoutSession: Dispatch<SetStateAction<IWorkoutSessionForState | null>>;
  workoutType: WorkoutType;
  setWorkoutType: Dispatch<SetStateAction<WorkoutType>>;
  dialogProps: IDialogProps;
  setDialogProps: Dispatch<SetStateAction<IDialogProps>>;
}

export const SportAppContext = React.createContext({} as ISportAppContext);