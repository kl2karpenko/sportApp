import { IWorkoutSession } from "../interfaces/IWorkoutSession";
import { IWorkoutType } from "../interfaces/IWorkoutType";
import workoutParts from "../data/workoutParts";
import workoutTypes from "../data/workoutTypesList";
import { exercises as cardioExercises } from "../data/workoutTypesList/cardio";
import { IWorkoutTypes } from "../interfaces/IWorkoutTypes";

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

  return currentWorkoutSession;
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

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const createRandomRoundExercisesType = (workoutSettings: IWorkoutType) => {
  const workoutPartsKeys = Object.keys(workoutParts);
  return [...Array(workoutSettings.rounds).keys()].map((round: number) => {
    return workoutPartsKeys[getRandomInt(0, workoutPartsKeys.length - 1)];
  });
}

const ifListIncludeExercise = (list: string[], exercise: string) => {
  return list.includes(exercise);
}

const setupExerciseWithPairIfNeeded = (listOfExercises: { [key: string]: IWorkoutTypes }, randomListOfExercises: []): IWorkoutTypes => {
  const randomExerciseIndex = getRandomInt(0, Object.keys(listOfExercises).length - 1);
  const randomExercise = listOfExercises["exercise" + randomExerciseIndex];

  // when to add the cardio
  if (randomListOfExercises.length === 0 || randomListOfExercises.length % 3 === 0) {
    const randomExerciseIndexCardio = getRandomInt(0, Object.keys(cardioExercises).length - 1);
    randomListOfExercises.push(cardioExercises["exercise" + randomExerciseIndexCardio].name);
  }

  if (!ifListIncludeExercise(randomListOfExercises, randomExercise.name)) {
    randomListOfExercises.push(randomExercise.name);
  }

  if (randomExercise.pairedExercise && !ifListIncludeExercise(randomListOfExercises, listOfExercises[randomExercise.pairedExercise].name)) {
    randomListOfExercises.push(listOfExercises[randomExercise.pairedExercise].name)
  }
}

export const createRandomExercisesListForRound = (exerciseType: keyof workoutTypes, workoutSettings?: IWorkoutType = {}) => {
  const listOfExercises = workoutTypes[exerciseType];
  let randomListOfExercises = [];

  console.log(listOfExercises, workoutSettings);

  if (listOfExercises) {
    while (randomListOfExercises.length <= workoutSettings.exercises) {
      setupExerciseWithPairIfNeeded(listOfExercises, randomListOfExercises)
      console.log(randomListOfExercises, " list ");
    }
  }

  return randomListOfExercises;
}