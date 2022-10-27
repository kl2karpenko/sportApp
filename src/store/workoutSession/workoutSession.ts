import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import IWorkoutSession from "../../interfaces/IWorkoutSession";
import { hiitDefaultSettings, tabataDefaultSettings } from "../../data/workoutsDefaultSettings";
import { WorkoutType } from "../../interfaces/WorkoutType";
import { RoundFields } from "../../models/Round/RoundFields";
import IRound from "../../models/Round/IRound";
import IExercise from "../../models/Exercise/IExercise";
import {
  generateRandomWorkoutExerciseInRoundAction,
  IUpdateWorkoutSessionValuePayload,
  updateWorkoutExerciseInRoundAction,
  updateWorkoutSessionForHiitValueAction
} from "./hiitWorkoutSession";
import { updateWorkoutSessionValueForTabataAction } from "./tabataWorkoutSession";
import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import workoutBuilderServiceInstance from "../../services/WorkoutBuilderService/WorkoutBuilderServiceSingleton";
import { TAllExercises } from "../../interfaces/TAllExercises";
import hiitExercises from "../../mockedData/data/hiit";
import tabataExercises from "../../mockedData/data/tabata";
import cardioExercises from "../../mockedData/data/shared/cardio";

export type IWorkoutSessionState = IWorkoutSession & {
  workoutType: WorkoutType;
  allExercises: {
    [WorkoutType.HIIT]: TAllExercises,
    [WorkoutType.Tabata]: TAllExercises,
    cardio: Partial<IExercise>[],
  };
  cardioStep?: number;
};

export const initialState: IWorkoutSessionState = {
  onlyCardio: false,
  includeCardio: true,
  cardioStep: 3,
  workoutType: WorkoutType.HIIT,
  rounds: [],
  allExercises: {
    cardio: cardioExercises,
    [WorkoutType.HIIT]: hiitExercises,
    [WorkoutType.Tabata]: tabataExercises,
  },
  ...hiitDefaultSettings
}

// REDUCER =======
export const workoutSessionSlice = createSlice({
  name: "workoutSession",
  initialState,
  reducers: {
    generateWorkoutSession: (state: IWorkoutSessionState) => {
      const workoutBuilderService = workoutBuilderServiceInstance.getService(state.workoutType);
      const allExercisesData: TAllExercises = state.allExercises[state.workoutType];
      const rounds = workoutBuilderService?.generateWorkout(state);

      return {
        ...state,
        rounds
      };
    },
    regenerateWorkoutSessionRounds: (state: IWorkoutSessionState) => {
      const workoutBuilderService = workoutBuilderServiceInstance.getService(state.workoutType);
      const bodyPartsIdForEachRound: TValues<typeof EBodyParts>[] = state.rounds.map((round: Partial<IRound>) => round.bodyId) as TValues<typeof EBodyParts>[];

      const rounds = workoutBuilderService?.generateWorkoutRounds({ workoutSession: state, bodyPartsIdForEachRound });

      return {
        ...state,
        rounds
      };
    },
    updateWorkoutRoundByIndex: (state: IWorkoutSessionState, action: PayloadAction<{ roundIndex: number; fieldName: RoundFields, fieldValue: any }>) => {
      const { roundIndex, fieldName, fieldValue } = action.payload;
      const round = getRoundByIndex(state, roundIndex);
      // @ts-ignore
      round[fieldName] = fieldValue;

      return state;
    },
    updateWorkoutExerciseInRound: updateWorkoutExerciseInRoundAction,
    generateRandomWorkoutExerciseInRound: generateRandomWorkoutExerciseInRoundAction,
    // @ts-ignore
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

      const workoutBuilderService = workoutBuilderServiceInstance.getService(newState.workoutType);
      const allExercisesData: TAllExercises = state.allExercises[state.workoutType];
      const rounds = workoutBuilderService?.generateWorkout(newState);

      return {
        ...newState,
        rounds
      };
    },
    updateWorkoutSessionValue: (state: IWorkoutSessionState, action: PayloadAction<IUpdateWorkoutSessionValuePayload>) => {
      if (state.workoutType === WorkoutType.HIIT) return updateWorkoutSessionForHiitValueAction(state, action);

      return updateWorkoutSessionValueForTabataAction(state, action);
    },
    setCardioExercises: (state: IWorkoutSessionState, action: PayloadAction<Partial<IExercise>[]>) => {
      return {
        ...state,
        allExercises: {
          ...state.allExercises,
          cardio: action.payload
        }
      };
    },
    setExercisesByWorkoutType: (state: IWorkoutSessionState, action: PayloadAction<{ workoutType: WorkoutType, list: TAllExercises }>) => {
      return {
        ...state,
        allExercises: {
          ...state.allExercises,
          [action.payload.workoutType]: action.payload.list
        }
      };
    }
  },
});

// SELECTORS =======
export const getAllRounds = (state: IWorkoutSessionState) => state.rounds;
export const getAllExercises = (state: IWorkoutSessionState) => state.allExercises;
export const getAllExercisesList = (state: IWorkoutSessionState) => state.allExercises[state.workoutType]
export const getRoundByIndex = createSelector([
  getAllRounds,
  (state: IWorkoutSessionState, roundIndex: number) => roundIndex
], (rounds, roundIndex): Partial<IRound> => rounds[roundIndex]);
export const getRoundExercisesListByIndex = createSelector([
  getRoundByIndex
// @ts-ignore
], (roundByIndex): Partial<IExercise>[] => Array.from(roundByIndex.exercisesList));
export const getAllExercisesForBodyPart = createSelector([
  getAllExercisesList,
  (state: IWorkoutSessionState, bodyPartName: TValues<typeof EBodyParts>) => bodyPartName
// @ts-ignore
], (allExercises, bodyPartName): Partial<IExercise>[] => allExercises[bodyPartName]);
export const getCardioExercisesList = createSelector([
  getAllExercises
// @ts-ignore
], (allExercises): Partial<IExercise>[] => allExercises.cardio);

// Action creators are generated for each case reducer function
export const {
  updateWorkoutSessionValue,
  changeWorkoutType,
  updateWorkoutRoundByIndex,
  updateWorkoutExerciseInRound,
  generateRandomWorkoutExerciseInRound,
  generateWorkoutSession,
  regenerateWorkoutSessionRounds,
  setExercisesByWorkoutType,
  setCardioExercises
} = workoutSessionSlice.actions

export default workoutSessionSlice.reducer