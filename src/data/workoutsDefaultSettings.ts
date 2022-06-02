import { IWorkoutDeprecatedObj } from "../interfaces_deprecated/IWorkoutDeprecatedObj";
import {IWorkoutSettings} from "../interfaces_deprecated/IWorkoutSettings";

const workoutsDefaultSettings: IWorkoutDeprecatedObj = {
  "label": "Workout",
  "value": "workout",
  "rounds": 1,
  "exercises": 2,
  "exercise_duration": 43,
  "rest_duration": 20,
  "rest_between_rounds": 66,
  "generated_body_parts_list": [],
  all_exercises_for_generated_list: []
};
export const tabataDefaultSettings: IWorkoutSettings = {
  roundsLength: 8,
  exercisesLength: 8,
  exerciseDuration: 20,
  restDuration: 10,
  betweenRoundsDuration: 120
};
export const hiitDefaultSettings: IWorkoutSettings = {
  roundsLength: 8,
  exercisesLength: 8,
  exerciseDuration: 40,
  restDuration: 20,
  betweenRoundsDuration: 60
};

export default workoutsDefaultSettings;