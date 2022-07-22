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

export default {
  roundsLength: 8,
  exercisesLength: 8,
  exerciseDuration: 40,
  restDuration: 20,
  betweenRoundsDuration: 60
};