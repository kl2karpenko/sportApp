import React, { Dispatch, SetStateAction } from "react";

import { IDialogProps } from "./interfaces_deprecated/IDialogProps";
import { WorkoutType } from "./interfaces_deprecated/WorkoutType";
import IWorkoutSession from "./services/WorkoutSessionService/IWorkoutSession";
import IWorkoutService from "./services/WorkoutService/IWorkoutService";

export interface ISportAppContext {
  workoutSettings: IWorkoutService;
  setWorkoutSettings: Dispatch<SetStateAction<IWorkoutService>>;
  workoutSession: IWorkoutSession | null;
  setWorkoutSession: Dispatch<SetStateAction<IWorkoutSession | null>>;
  workoutType: WorkoutType;
  setWorkoutType: Dispatch<SetStateAction<WorkoutType>>;
  dialogProps: IDialogProps;
  setDialogProps: Dispatch<SetStateAction<IDialogProps>>;
}

export const SportAppContext = React.createContext({} as ISportAppContext);