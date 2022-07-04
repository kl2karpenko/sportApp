import type { PayloadAction } from "@reduxjs/toolkit";
import { WorkoutSessionFields } from "../../interfaces/WorkoutSessionFields";
import {
  allExercisesData,
  getRoundByIndex,
  getRoundExercisesListByIndex,
  IWorkoutSessionState
} from "./workoutSession";
import IExercise from "../../models/Exercise/IExercise";
import workoutBuilderServiceInstance from "../../services/WorkoutBuilderService/WorkoutBuilderServiceSingleton";

import IRound from "../../models/Round/IRound";

export interface IUpdateWorkoutSessionValuePayload { field: WorkoutSessionFields; value: any }

export const updateWorkoutSessionForHiitValueAction = (state: IWorkoutSessionState, action: PayloadAction<IUpdateWorkoutSessionValuePayload>) => {
  const { field, value } = action.payload;
  let newRounds = state.rounds;

  const newState = Object.assign({}, state);
  newState[field] = value;

  if (newState.rounds.length && state.rounds.length < newState.rounds.length && [WorkoutSessionFields.roundsLength, WorkoutSessionFields.exercisesLength, WorkoutSessionFields.cardioStep].includes(field)) {
    const workoutBuilderService = workoutBuilderServiceInstance.getService(newState.workoutType);
    newRounds = workoutBuilderService?.generateWorkoutRounds(newState, newState.rounds.map((round: IRound) => round.bodyId));
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

export const generateRandomWorkoutExerciseInRoundAction = (state: IWorkoutSessionState, action: PayloadAction<{ roundIndex: number; exerciseIndex: number; isCardio: boolean }>) => {
  const { roundIndex, exerciseIndex, isCardio } = action.payload;

  const currentRound = getRoundByIndex(state, roundIndex);
  const allExercisesForBodyId = isCardio ? allExercisesData.getCardioExercisesList() : allExercisesData.getExercisesForBodyPart(currentRound.bodyId);
  const randomInt = allExercisesData.getRandomInt(0, allExercisesForBodyId.length - 1);
  currentRound.exercisesList[exerciseIndex] = allExercisesForBodyId[randomInt];

  return state;
};