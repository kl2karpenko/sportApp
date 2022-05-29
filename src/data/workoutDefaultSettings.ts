import { IWorkoutDeprecatedObj } from "../interfaces_deprecated/IWorkoutDeprecatedObj";

const workoutDefaultSettings: IWorkoutDeprecatedObj = {
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

export default workoutDefaultSettings;