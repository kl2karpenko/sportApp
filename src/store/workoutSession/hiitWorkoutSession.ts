import type { PayloadAction } from "@reduxjs/toolkit";
import { WorkoutSessionFields } from "../../interfaces/WorkoutSessionFields";
import WorkoutBuilderService from "../../services/WorkoutBuilderService/WorkoutBuilderService";
import {
  allExercisesData,
  getRoundByIndex,
  getRoundExercisesListByIndex,
  IWorkoutSessionState
} from "./workoutSession";
import IExercise from "../../models/Exercise/IExercise";
import WorkoutBuilderServiceSingleton from "../../services/WorkoutBuilderServiceSingleton";

let workoutBuilderService: WorkoutBuilderService;

export interface IUpdateWorkoutSessionValuePayload { field: WorkoutSessionFields; value: any }

export const updateWorkoutSessionForHiitValueAction = (state: IWorkoutSessionState, action: PayloadAction<IUpdateWorkoutSessionValuePayload>) => {
  const { field, value } = action.payload;
  let newRounds = state.rounds;

  const newState = {
    ...state,
    [field]: value
  };

  if (field === WorkoutSessionFields.roundsLength || field === WorkoutSessionFields.exercisesLength) {
    workoutBuilderService = WorkoutBuilderServiceSingleton(newState.workoutType);
    newRounds = workoutBuilderService?.generateWorkout(newState);
  }

  return {
    ...newState,
    rounds: newRounds
  };
};

export const updateWorkoutExerciseInRoundAction = (state: IWorkoutSessionState, action: PayloadAction<{ roundIndex: number; exerciseIndex: number, exerciseValue: any }>) => {
  const { roundIndex, exerciseIndex, exerciseValue } = action.payload;
  const exerciseToUpdate = allExercisesData.findExerciseById(exerciseValue)!;
  const exercisesList: IExercise[] = getRoundExercisesListByIndex(state, action.payload.roundIndex);
  exercisesList[exerciseIndex] = exerciseToUpdate;

  const round = getRoundByIndex(state, roundIndex);
  round.exercisesList = [...exercisesList];

  return state;
};

export const generateRandomWorkoutExerciseInRoundAction = (state: IWorkoutSessionState, action: PayloadAction<{ roundIndex: number; exerciseIndex: number }>) => {
  const { roundIndex, exerciseIndex } = action.payload;
  const currentRound = getRoundByIndex(state, roundIndex);
  const allExercisesForBodyId = allExercisesData.getExercisesForBodyPart(currentRound.bodyId);
  const randomInt = allExercisesData.getRandomInt(0, allExercisesForBodyId.length - 1);
  currentRound.exercisesList[exerciseIndex] = allExercisesData.getExerciseByIndex(randomInt);

  return state;
};