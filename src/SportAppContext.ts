import React, {Dispatch, SetStateAction} from "react";

import { IWorkoutType } from "./interfaces/IWorkoutType";
import { IWorkoutSession } from "./interfaces/IWorkoutSession";
import {IDialogProps} from "./interfaces/IDialogProps";

export interface ISportAppContext {
  workoutSettings: IWorkoutType;
  setWorkoutSettings: Dispatch<SetStateAction<IWorkoutType>>;
  currentWorkoutSession: IWorkoutSession;
  setCurrentWorkoutSession: Dispatch<SetStateAction<IWorkoutSession>>;
  dialogProps: IDialogProps;
  setDialogProps: Dispatch<SetStateAction<IDialogProps>>;
}

export const SportAppContext = React.createContext({
  workoutSettings: {},
  currentWorkoutSession: {}
} as ISportAppContext);