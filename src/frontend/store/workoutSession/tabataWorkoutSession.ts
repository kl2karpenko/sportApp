import { WorkoutSessionFields } from "../../interfaces/WorkoutSessionFields";
import { IWorkoutSessionState } from "./workoutSession";
import { PayloadAction } from "@reduxjs/toolkit";
import WorkoutBuilderService from "../../services/WorkoutBuilderService/WorkoutBuilderService";
import workoutBuilderServiceInstance from "../../services/WorkoutBuilderService/WorkoutBuilderServiceSingleton";
import { TAllExercises } from "../../interfaces/TAllExercises";

export interface IUpdateWorkoutSessionValuePayload { field: WorkoutSessionFields; value: any }

let workoutBuilderService: WorkoutBuilderService;
export const updateWorkoutSessionValueForTabataAction = (state: IWorkoutSessionState, action: PayloadAction<IUpdateWorkoutSessionValuePayload>) => {
  const { field, value } = action.payload;
  let newRounds = state.rounds;
  const allExercisesData: TAllExercises = state.allExercises[state.workoutType];

  const newState = {
    ...state,
    [field]: value
  };

  if (field === WorkoutSessionFields.roundsLength) {
    workoutBuilderService = workoutBuilderServiceInstance.getService(state.workoutType);
    newRounds = workoutBuilderService?.generateWorkout(newState, allExercisesData, state.allExercises.cardio);
  }

  return {
    ...newState,
    rounds: newRounds
  };
};