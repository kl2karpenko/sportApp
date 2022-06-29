import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import IWorkoutSession from "../../interfaces/IWorkoutSession";
import { hiitDefaultSettings, tabataDefaultSettings } from "../../data/workoutsDefaultSettings";
import { WorkoutType } from "../../interfaces/WorkoutType";
import { RoundFields } from "../../models/Round/RoundFields";
import { IExercisesList } from "../../models/ExercisesList/IExercisesList";
import ExercisesList from "../../models/ExercisesList/ExercisesList";
import IRound from "../../models/Round/IRound";
import IExercise from "../../models/Exercise/IExercise";
import WorkoutBuilderServiceFactory from "../../services/WorkoutBuilderServiceFactory";
import WorkoutBuilderService from "../../services/WorkoutBuilderService/WorkoutBuilderService";
import {
  generateRandomWorkoutExerciseInRoundAction,
  IUpdateWorkoutSessionValuePayload,
  updateWorkoutExerciseInRoundAction,
  updateWorkoutSessionForHiitValueAction
} from "./hiitWorkoutSession";
import { updateWorkoutSessionValueForTabataAction } from "./tabataWorkoutSession";

export type IWorkoutSessionState = IWorkoutSession & {
  workoutType: WorkoutType; includeCardio: boolean;
}
;
export const initialState: IWorkoutSessionState = {
  includeCardio: false,
  workoutType: WorkoutType.HIIT,
  rounds: [],
  ...hiitDefaultSettings
}

export const allExercisesData: IExercisesList = new ExercisesList();
let workoutBuilderService: WorkoutBuilderService;

export const getBuilderService = (state: IWorkoutSessionState) => {
  if (workoutBuilderService && state.workoutType === workoutBuilderService.workoutType) {
    return workoutBuilderService;
  }

  return WorkoutBuilderServiceFactory(state.workoutType);
};

// REDUCER =======
export const workoutSessionSlice = createSlice({
  name: "workoutSession",
  initialState,
  reducers: {
    generateWorkoutSession: (state: IWorkoutSessionState) => {
      workoutBuilderService = getBuilderService(state);
      const rounds = workoutBuilderService?.generateWorkout(state);

      return {
        ...state,
        rounds
      };
    },
    updateWorkoutRoundByIndex: (state: IWorkoutSessionState, action: PayloadAction<{ roundIndex: number; fieldName: RoundFields, fieldValue: any }>) => {
      const { roundIndex, fieldName, fieldValue } = action.payload;
      const round = getRoundByIndex(state, roundIndex);
      round[fieldName] = fieldValue;

      return state;
    },
    updateWorkoutExerciseInRound: updateWorkoutExerciseInRoundAction,
    generateRandomWorkoutExerciseInRound: generateRandomWorkoutExerciseInRoundAction,
    changeWorkoutType: (state: IWorkoutSessionState, action: PayloadAction<WorkoutType>) => {
      let newState: IWorkoutSessionState;

      switch (action.payload) {
      case WorkoutType.Tabata:
        newState = {
          ...state,
          workoutType: action.payload,
          ...tabataDefaultSettings
        };
        break;
      case WorkoutType.HIIT:
        newState = {
          ...state,
          workoutType: action.payload,
          ...hiitDefaultSettings
        };
        break;
      default:
        newState = {
          ...state,
          workoutType: action.payload
        };
        break;
      }

      workoutBuilderService = getBuilderService(newState);
      const rounds = workoutBuilderService?.generateWorkout(newState);

      return {
        ...newState,
        rounds
      };
    },
    updateWorkoutSessionValue: (state: IWorkoutSessionState, action: PayloadAction<IUpdateWorkoutSessionValuePayload>) => {
      if (state.workoutType === WorkoutType.HIIT) return updateWorkoutSessionForHiitValueAction(state, action);

      return updateWorkoutSessionValueForTabataAction(state, action);
    }
  },
});

// SELECTORS =======
export const getAllRounds = (state: IWorkoutSessionState) => state.rounds;
export const getRoundByIndex = createSelector([
  getAllRounds,
  (state: IWorkoutSessionState, roundIndex: number) => roundIndex
], (rounds, roundIndex): IRound => rounds[roundIndex]);
export const getRoundExercisesListByIndex = createSelector([
  getRoundByIndex
], (roundByIndex): IExercise[] => Array.from(roundByIndex.exercisesList));

// HELPERS =======
export const isExerciseCardio = (exercise: IExercise) => (!!exercise.isCardio);

// Action creators are generated for each case reducer function
export const {
  updateWorkoutSessionValue,
  changeWorkoutType,
  updateWorkoutRoundByIndex,
  updateWorkoutExerciseInRound,
  generateRandomWorkoutExerciseInRound,
  generateWorkoutSession
} = workoutSessionSlice.actions

export default workoutSessionSlice.reducer