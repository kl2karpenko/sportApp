import { mockedWorkoutTypes } from "../data/exercices";
import { WorkoutType } from "../interfaces/WorkoutType";
import { IWorkoutSettings } from "../interfaces/IWorkoutSettings";

export const tabataDefaultSettings: IWorkoutSettings = {
  roundsLength: 8,
  exercisesLength: 8,
  exerciseDuration: 30,
  restDuration: 15,
  betweenRoundsDuration: 90
};

export const hiitDefaultSettings: IWorkoutSettings = {
  roundsLength: 8,
  exercisesLength: 8,
  exerciseDuration: 40,
  restDuration: 20,
  betweenRoundsDuration: 60
};

export const TABATA_EXERCISES_INDEXES = {
  firstExWithCardio: 0,
  firstExWithoutCardio: 0,
  secondExWithCardio: 2,
  secondExWithoutCardio: 1,
  firstRoundEndIndex: 3,
  firstCardioExIndex: 1,
  secondCardioExIndex: 3,
};

export const testHiitWorkoutSession = {
  ...hiitDefaultSettings,
  rounds: [],
  allExercises: {
    cardio: mockedWorkoutTypes.cardio,
    [WorkoutType.HIIT]: mockedWorkoutTypes,
    [WorkoutType.Tabata]: mockedWorkoutTypes,
  },
  onlyCardio: false,
  includeCardio: false,
  workoutType: WorkoutType.Tabata
};

export const testTabataWorkoutSession = {
  ...tabataDefaultSettings,
  rounds: [],
  allExercises: {
    cardio: mockedWorkoutTypes.cardio,
    [WorkoutType.HIIT]: mockedWorkoutTypes,
    [WorkoutType.Tabata]: mockedWorkoutTypes,
  },
  onlyCardio: false,
  includeCardio: false,
  workoutType: WorkoutType.Tabata
};