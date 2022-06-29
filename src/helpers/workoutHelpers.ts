import { IWorkoutSession } from "../interfaces_deprecated/IWorkoutSession";
import { IWorkoutDeprecatedObj, IWorkoutGeneratedExercisesList } from "../interfaces_deprecated/IWorkoutDeprecatedObj";
import bodyPartsForWorkout from "../data/bodyPartsForWorkout";
import workoutTypesList from "../data/workoutTypesList";
import { exercises as cardioExercises } from "../data/workoutTypesList/cardio";
import { IBodyPartsForWorkout } from "../interfaces_deprecated/IBodyPartsForWorkout";

interface IWorkoutSettings {
  currentWorkoutSession: IWorkoutSession;
  previousSessionValues?: IWorkoutSession;
  workoutSettings: IWorkoutSettings;
}

export const toNextExercise = ({
  currentWorkoutSession, workoutSettings, previousSessionValues
} : IWorkoutSettings): IWorkoutSession => {
  // does not set finish when click next
  if (
    checkIfWorkoutFinished({
      currentWorkoutSession,
      workoutSettings,
      previousSessionValues
    })
  ) {
    return {
      ...currentWorkoutSession,
      isResting: false,
      inProgress: false,
      isDone: true
    };
  }

  console.log(currentWorkoutSession.exercise, " currentWorkoutSession.exercise");
  console.log(workoutSettings.exercises, "workoutSettings.exercises");

  if (currentWorkoutSession.exercise < workoutSettings.exercises) {
    return {
      ...currentWorkoutSession,
      exercise: currentWorkoutSession.exercise + 1,
      isResting: false
    };
  }

  if (currentWorkoutSession.exercise === workoutSettings.exercises && currentWorkoutSession.round !== workoutSettings.rounds) {
    if (currentWorkoutSession.isResting) {
      return {
        ...currentWorkoutSession,
        exercise: 1,
        round: currentWorkoutSession.round + 1,
        isResting: false
      };
    }

    return {
      ...currentWorkoutSession,
      isResting: true
    };
  }

  return currentWorkoutSession;
}

export const toPreviousExercise = ({
  currentWorkoutSession, workoutSettings
} : IWorkoutSettings): IWorkoutSession => {
  // not rest
  if (currentWorkoutSession.isResting) {
    return {
      ...currentWorkoutSession,
      isResting: false
    };
  }

  // move to previous exercise if it is not 1 one
  if (currentWorkoutSession.exercise !== 1) {
    return {
      ...currentWorkoutSession,
      exercise: currentWorkoutSession.exercise - 1,
      isResting: true
    };
  }

  // move to previous round if this is not the first round, last exercise
  if (currentWorkoutSession.round !== 1) {
    return {
      ...currentWorkoutSession,
      round: currentWorkoutSession.round - 1,
      exercise: workoutSettings.exercises,
      isResting: true
    };
  }

  return currentWorkoutSession;
}

export const isRestTime = ({
  currentWorkoutSession, workoutSettings, previousSessionValues
} : IWorkoutSettings): boolean => {
  const beforeWeDidntRest = !currentWorkoutSession.isResting;
  const exerciseDidntChange = currentWorkoutSession.exercise === previousSessionValues?.exercise;
  const roundIsNotOver = currentWorkoutSession.round <= workoutSettings.rounds;
  return !!(previousSessionValues && beforeWeDidntRest && exerciseDidntChange && roundIsNotOver);
}

export const checkIfWorkoutFinished = ({
  currentWorkoutSession, workoutSettings
} : IWorkoutSettings): boolean => {
  return currentWorkoutSession.round === workoutSettings.rounds && currentWorkoutSession.exercise === workoutSettings.exercises && currentWorkoutSession.isResting;
}

export const setNextStep = ({
  currentWorkoutSession, workoutSettings, previousSessionValues
} : IWorkoutSettings): IWorkoutSession => {
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

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateListOfBodyPartsForAllRounds = (workoutSettings: IWorkoutDeprecatedObj): string[] => {
  const workoutPartsKeys = Object.keys(bodyPartsForWorkout);
  return [...Array(workoutSettings.rounds).keys()].map((round: number) => {
    return workoutPartsKeys[getRandomInt(0, workoutPartsKeys.length - 1)];
  });
}

export const ifExerciseAlreadyIncluded = (list: IBodyPartsForWorkout[], exercise: IBodyPartsForWorkout) => !!list.filter((item: IBodyPartsForWorkout) => item.id === exercise.id).length;

export const getPairExercise = (list: IBodyPartsForWorkout[], pairExId: string): IBodyPartsForWorkout | undefined => {
  const findPair = list.filter((item: IBodyPartsForWorkout) => {
    if (item.id === pairExId) return item;
  });

  return findPair && findPair[0];
};

export const setupExerciseWithPairIfNeeded =
  (listOfExercises: IBodyPartsForWorkout[], randomListOfExercises: IBodyPartsForWorkout[], previousExercises: IBodyPartsForWorkout[]): IBodyPartsForWorkout[] =>
  {
    const exercisesLen = Object.keys(listOfExercises).length;
    const cardioExercisesLen = Object.keys(cardioExercises).length;
    let randomExercise: IBodyPartsForWorkout = listOfExercises[getRandomInt(0, exercisesLen - 1)];

    // if exercise already exist do 3 times again
    let counter = 0;
    while(counter <= (exercisesLen - 2)) {
      const randomExerciseIndex = getRandomInt(0, exercisesLen - 1);
      randomExercise = listOfExercises[randomExerciseIndex];
      let ifAlreadyHaveExercise = ifExerciseAlreadyIncluded(previousExercises, randomExercise);

      if (ifAlreadyHaveExercise) {
        counter++;
      } else {
        break;
      }
    }

    // when to add the cardio
    if (randomListOfExercises.length % 3 === 0) {
      const randomExerciseIndexCardio = getRandomInt(0, cardioExercisesLen - 1);
      randomListOfExercises.push((cardioExercises[randomExerciseIndexCardio]));
    }

    if (!ifExerciseAlreadyIncluded(randomListOfExercises, randomExercise)) {
      randomListOfExercises.push(randomExercise);
    }

    const pairedExercise: "" | undefined | IBodyPartsForWorkout = randomExercise.pair && getPairExercise(listOfExercises, randomExercise.pair);

    if (pairedExercise && !ifExerciseAlreadyIncluded(randomListOfExercises, pairedExercise)) {
      randomListOfExercises.push(pairedExercise)
    }

    return randomListOfExercises;
  }

export const createRandomExercisesForRound = (bodyPartName: string, workoutSettings: IWorkoutDeprecatedObj, previousExercises: IBodyPartsForWorkout[]): IBodyPartsForWorkout[] => {
  const listOfExercises = workoutTypesList[bodyPartName as string];
  let randomListOfExercises: IBodyPartsForWorkout[] = [];

  if (workoutSettings && listOfExercises && listOfExercises.length && listOfExercises.length >= workoutSettings.exercises) {
    while (randomListOfExercises.length < workoutSettings.exercises) {
      setupExerciseWithPairIfNeeded(listOfExercises, randomListOfExercises, previousExercises);
    }
  } else {
    console.log("not enough exercises");
  }

  randomListOfExercises.slice(0, workoutSettings.exercises + 1);

  return randomListOfExercises;
}

export const createRandomExercisesForAllRounds = (bodyPartsList: string[], workoutSettings: IWorkoutDeprecatedObj): IWorkoutGeneratedExercisesList[] => {
  const newWorkoutSettings: IWorkoutGeneratedExercisesList[] = [];

  bodyPartsList.forEach((bodyPartName: string) => {
    const listOfPreviousExercises: IBodyPartsForWorkout[] = newWorkoutSettings.map((workout: IWorkoutGeneratedExercisesList) => workout.exercises).flat(1);

    const exercises = createRandomExercisesForRound(bodyPartName, workoutSettings, listOfPreviousExercises);
    newWorkoutSettings.push({
      bodyPartName,
      exercises
    });
  });

  return newWorkoutSettings;
}