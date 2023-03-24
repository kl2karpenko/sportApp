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

export const testHiitWorkoutSession = {
  rounds: [],
  exerciseDuration: hiitDefaultSettings.exerciseDuration,
  exercisesLength: hiitDefaultSettings.exercisesLength,
  roundsLength: hiitDefaultSettings.roundsLength,
  restDuration: hiitDefaultSettings.restDuration,
  betweenRoundsDuration: hiitDefaultSettings.betweenRoundsDuration,
  allExercises: {
    cardio: mockedWorkoutTypes.cardio,
    [WorkoutType.HIIT]: mockedWorkoutTypes,
    [WorkoutType.Tabata]: mockedWorkoutTypes,
  },
  onlyCardio: false,
  includeCardio: false,
  workoutType: WorkoutType.Tabata
};