import type { PayloadAction } from "@reduxjs/toolkit";
import { WorkoutSessionFields } from "../../interfaces/WorkoutSessionFields";
import {
  getRoundByIndex,
  getRoundExercisesListByIndex,
  IWorkoutSessionState
} from "./workoutSession";
import IExercise from "../../models/Exercise/IExercise";
import workoutBuilderServiceInstance from "../../services/WorkoutBuilderService/WorkoutBuilderServiceSingleton";

import IRound from "../../models/Round/IRound";
import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { TAllExercises } from "../../interfaces/TAllExercises";
import ExercisesList from "../../models/ExercisesList/ExercisesList";

export interface IUpdateWorkoutSessionValuePayload { field: WorkoutSessionFields; value: any }

export const updateWorkoutSessionForHiitValueAction = (state: IWorkoutSessionState, action: PayloadAction<IUpdateWorkoutSessionValuePayload>) => {
  const { field, value } = action.payload;
  let newRounds = state.rounds;
  const allExercisesData: TAllExercises = state.allExercises[state.workoutType];

  const newState = JSON.parse(JSON.stringify(state));
  newState[field] = value;

  if (newState.rounds.length && state.rounds.length < newState.rounds.length && [WorkoutSessionFields.roundsLength, WorkoutSessionFields.exercisesLength, WorkoutSessionFields.cardioStep].includes(field)) {
    const workoutBuilderService = workoutBuilderServiceInstance.getService(newState.workoutType);
    const newRoundsVal = newRounds.map((round: Partial<IRound>) => round.bodyId) as TValues<typeof EBodyParts>[];
    newRounds = workoutBuilderService?.generateWorkoutRounds({ workoutSession: newState, bodyPartsIdForEachRound: newRoundsVal });
  }

  return {
    ...state,
    ...newState,
    rounds: newRounds
  };
};

export const updateWorkoutExerciseInRoundAction = (state: IWorkoutSessionState, action: PayloadAction<{ roundIndex: number; exerciseIndex: number, exerciseValue: any; }>) => {
  const { roundIndex, exerciseIndex, exerciseValue } = action.payload;
  const allExercisesData: TAllExercises = state.allExercises[state.workoutType];
  const newExercisesList = new ExercisesList({ workoutType: state.workoutType, exercises: allExercisesData, cardioExercises: state.allExercises.cardio });
  const exerciseToUpdate = newExercisesList.findExerciseById(exerciseValue)!;
  const exercisesList: Partial<IExercise>[] = getRoundExercisesListByIndex(state, action.payload.roundIndex);
  exercisesList[exerciseIndex] = exerciseToUpdate;

  const round = getRoundByIndex(state, roundIndex);
  round.exercisesList = [...exercisesList];

  return state;
};

export const generateRandomWorkoutExerciseInRoundAction = (state: IWorkoutSessionState, action: PayloadAction<{ roundIndex: number; exerciseIndex: number; isCardio: boolean; }>) => {
  const { roundIndex, exerciseIndex, isCardio } = action.payload;
  const allExercisesData: TAllExercises = state.allExercises[state.workoutType];
  const newExercisesList = new ExercisesList({ workoutType: state.workoutType, exercises: allExercisesData, cardioExercises: state.allExercises.cardio });

  const currentRound = getRoundByIndex(state, roundIndex);
  const allExercisesForBodyId = isCardio ? newExercisesList.getCardioExercisesList() : newExercisesList.getExercisesForBodyPart(currentRound.bodyId as TValues<typeof EBodyParts>);
  const randomInt = newExercisesList.getRandomInt(0, allExercisesForBodyId.length - 1);
  currentRound.exercisesList![exerciseIndex] = allExercisesForBodyId[randomInt];

  return state;
};