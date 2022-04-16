import { IWorkoutSession } from "../interfaces/IWorkoutSession";
import { IWorkoutType } from "../interfaces/IWorkoutType";
import workoutParts from "../data/workout_parts.json";

interface IWorkoutSettings {
  currentWorkoutSession: IWorkoutSession;
  previousSessionValues?: IWorkoutSession;
  workoutSettings: IWorkoutType;
}

export const toNextExercise = ({
  currentWorkoutSession, workoutSettings
} : IWorkoutSettings): IWorkoutSession => {
  if (currentWorkoutSession.exercise < workoutSettings.exercises) {
    return {
      ...currentWorkoutSession,
      exercise: currentWorkoutSession.exercise + 1,
      isResting: false
    };
  }

  if (currentWorkoutSession.isResting && currentWorkoutSession.exercise === workoutSettings.exercises && currentWorkoutSession.round !== workoutSettings.rounds) {
    return {
      ...currentWorkoutSession,
      exercise: 1,
      round: currentWorkoutSession.round + 1,
      isResting: false
    };
  }
}

export const toPreviousExercise = ({
  currentWorkoutSession, workoutSettings, previousSessionValues
} : IWorkoutSettings): IWorkoutSession => {
  return {
    ...currentWorkoutSession,
    exercise: currentWorkoutSession.exercise + 1,
    isResting: false
  };
}

export const isRestTime = ({
  currentWorkoutSession, workoutSettings, previousSessionValues
} : IWorkoutSettings): boolean => {
  const beforeWeDidntRest = !currentWorkoutSession.isResting;
  const exerciseDidntChange = currentWorkoutSession.exercise === previousSessionValues?.exercise;
  const roundIsNotOver = currentWorkoutSession.round !== workoutSettings.rounds;
  return !!(previousSessionValues && beforeWeDidntRest && exerciseDidntChange && roundIsNotOver);
}

const checkIfWorkoutFinished = ({
  currentWorkoutSession, workoutSettings, previousSessionValues
} : IWorkoutSettings): boolean => {
  return currentWorkoutSession.round === workoutSettings.rounds && currentWorkoutSession.exercise > workoutSettings.exercises;
}

export const setNextStep = ({
  currentWorkoutSession, workoutSettings, previousSessionValues
} : IWorkoutSettings): IWorkoutSession => {
  // when need to Stop the timer, as Workout is OVER!!!
  if (
    checkIfWorkoutFinished({
      currentWorkoutSession,
      workoutSettings,
      previousSessionValues
    })
  ) {
    return {
      ...currentWorkoutSession,
      isDone: true
    };
  }

  if (
    isRestTime({
      currentWorkoutSession,
      workoutSettings,
      previousSessionValues
    })
  ) {
    return {
      ...currentWorkoutSession,
      isResting: true
    };
  }

  return toNextExercise({
    currentWorkoutSession,
    workoutSettings,
    previousSessionValues
  });
}

export const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
}

export const createRandomRound = (round: number, exerciseNum: number) => {
  
}