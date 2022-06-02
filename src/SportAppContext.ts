import React, { Dispatch, SetStateAction } from "react";

import { IDialogProps } from "./interfaces_deprecated/IDialogProps";
import { WorkoutType } from "./interfaces_deprecated/WorkoutType";
import IWorkoutSession from "./services/WorkoutSessionService/IWorkoutSession";

export interface ISportAppContext {
  workoutSession: IWorkoutSession;
  setWorkoutSession: Dispatch<SetStateAction<IWorkoutSession>>;
  workoutType: WorkoutType;
  setWorkoutType: Dispatch<SetStateAction<WorkoutType>>;
  dialogProps: IDialogProps;
  setDialogProps: Dispatch<SetStateAction<IDialogProps>>;
}

export const SportAppContext = React.createContext({} as ISportAppContext);