import React, { Dispatch, SetStateAction } from "react";

import { IDialogProps } from "./interfaces/IDialogProps";
import Workout from "./models/Workout/Workout";
import { WorkoutType } from "./interfaces/WorkoutType";

export interface ISportAppContext {
  workoutSettings: Workout | null;
  setWorkoutSettings: Dispatch<SetStateAction<Workout | null>>;
  workoutType: WorkoutType;
  setWorkoutType: Dispatch<SetStateAction<WorkoutType>>;
  dialogProps: IDialogProps;
  setDialogProps: Dispatch<SetStateAction<IDialogProps>>;
}

export const SportAppContext = React.createContext({
  workoutSettings: null
} as ISportAppContext);