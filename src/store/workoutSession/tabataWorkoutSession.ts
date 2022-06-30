import { WorkoutSessionFields } from "../../interfaces/WorkoutSessionFields";
import { IWorkoutSessionState } from "./workoutSession";
import { PayloadAction } from "@reduxjs/toolkit";
import WorkoutBuilderService from "../../services/WorkoutBuilderService/WorkoutBuilderService";
import WorkoutBuilderServiceSingleton from "../../services/WorkoutBuilderServiceSingleton";

export interface IUpdateWorkoutSessionValuePayload { field: WorkoutSessionFields; value: any }

let workoutBuilderService: WorkoutBuilderService;
export const updateWorkoutSessionValueForTabataAction = (state: IWorkoutSessionState, action: PayloadAction<IUpdateWorkoutSessionValuePayload>) => {
  const { field, value } = action.payload;
  let newRounds = state.rounds;

  const newState = {
    ...state,
    [field]: value
  };

  if (field === WorkoutSessionFields.roundsLength) {
    workoutBuilderService = WorkoutBuilderServiceSingleton(state.workoutType);
    newRounds = workoutBuilderService?.generateWorkout(newState);
  }

  return {
    ...newState,
    rounds: newRounds
  };
};