import type {PayloadAction} from "@reduxjs/toolkit";
import {createSelector, createSlice} from "@reduxjs/toolkit";
import IWorkoutSession from "../interfaces/IWorkoutSession";
import workoutsDefaultSettings, {hiitDefaultSettings, tabataDefaultSettings} from "../data/workoutsDefaultSettings";
import {WorkoutSessionFields} from "../interfaces/WorkoutSessionFields";
import {WorkoutType} from "../interfaces/WorkoutType";
import {RoundFields} from "../models/Round/RoundFields";
import {IExercisesList} from "../models/ExercisesList/IExercisesList";
import ExercisesList from "../models/ExercisesList/ExercisesList";
import IRound from "../models/Round/IRound";
import IExercise from "../models/Exercise/IExercise";

export type IWorkoutSessionState = IWorkoutSession & { workoutType: WorkoutType };
const initialState: IWorkoutSessionState = {
  workoutType: WorkoutType.HIIT,
  rounds: [],
  activeRoundIndex: 0,
  activeExerciseIndex: 0,
  exerciseDuration: workoutsDefaultSettings.exercise_duration,
  exercisesLength: workoutsDefaultSettings.exercises,
  roundsLength: workoutsDefaultSettings.rounds,
  restDuration: workoutsDefaultSettings.rest_duration,
  betweenRoundsDuration: workoutsDefaultSettings.rest_between_rounds
}

const allExercisesData: IExercisesList = new ExercisesList();

export const workoutSessionSlice = createSlice({
  name: "workoutSession",
  initialState,
  reducers: {
    setActiveRoundIndex: (state: IWorkoutSessionState, action: PayloadAction<number>) => {
      state.activeRoundIndex = action.payload;
      return state;
    },
    setActiveExerciseIndex: (state: IWorkoutSessionState, action: PayloadAction<number>) => {
      state.activeExerciseIndex = action.payload;
      return state;
    },
    updateWorkoutSessionValue: (state: IWorkoutSessionState, action: PayloadAction<{ field: WorkoutSessionFields; value: any }>) => {
      return {
        ...state,
        [action.payload.field]: action.payload.value
      };
    },
    updateWorkoutRoundByIndex: (state: IWorkoutSessionState, action: PayloadAction<{ roundIndex: number; fieldName: RoundFields, fieldValue: any }>) => {
      const { roundIndex, fieldName, fieldValue } = action.payload;
      const round = getRoundByIndex(state, roundIndex);
      round[fieldName] = fieldValue;

      return state;
    },
    updateWorkoutExerciseInRound: (state: IWorkoutSessionState, action: PayloadAction<{ roundIndex: number; exerciseIndex: number, exerciseValue: any }>) => {
      const { roundIndex, exerciseIndex, exerciseValue } = action.payload;
      const exerciseToUpdate = allExercisesData.findExerciseById(exerciseValue)!;
      const exercisesList: IExercise[] = getRoundExercisesListByIndex(state, action.payload.roundIndex);
      exercisesList[exerciseIndex] = exerciseToUpdate;

      const round = getRoundByIndex(state, roundIndex);
      round.exercisesList = [...exercisesList];

      return state;
    },
    generateRandomWorkoutExerciseInRound: (state: IWorkoutSessionState, action: PayloadAction<{ roundIndex: number; exerciseIndex: number }>) => {
      const { roundIndex, exerciseIndex } = action.payload;
      const currentRound = getRoundByIndex(state, roundIndex);
      const allExercisesForBodyId = allExercisesData.getExercisesForBodyPart(currentRound.bodyId);
      const randomInt = allExercisesData.getRandomInt(0, allExercisesForBodyId.length - 1);
      currentRound.exercisesList[exerciseIndex] = allExercisesData.getExerciseByIndex(randomInt);

      return state;
    },
    changeWorkoutType: (state: IWorkoutSessionState, action: PayloadAction<WorkoutType>) => {
      switch (action.payload) {
      case WorkoutType.Tabata:
        return {
          ...state,
          workoutType: action.payload,
          ...tabataDefaultSettings
        };
      case WorkoutType.HIIT:
        return {
          ...state,
          workoutType: action.payload,
          ...hiitDefaultSettings
        };
      default:
        return {
          ...state,
          workoutType: action.payload
        };
      }
    }
  },
});

export const getAllRounds = (state: IWorkoutSessionState) => state.rounds;
export const getRoundByIndex = createSelector([
  getAllRounds,
  (state: IWorkoutSessionState, roundIndex: number) => roundIndex
], (rounds, roundIndex): IRound => rounds[roundIndex]);
export const getRoundExercisesListByIndex = createSelector([
  getRoundByIndex
], (roundByIndex): IExercise[] => Array.from(roundByIndex.exercisesList));

// Action creators are generated for each case reducer function
export const {
  setActiveRoundIndex,
  setActiveExerciseIndex,
  updateWorkoutSessionValue,
  changeWorkoutType,
  updateWorkoutRoundByIndex,
  updateWorkoutExerciseInRound,
  generateRandomWorkoutExerciseInRound
} = workoutSessionSlice.actions

export default workoutSessionSlice.reducer