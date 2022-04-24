import { IBodyPartsForWorkout } from "./IBodyPartsForWorkout";

export interface IWorkoutType {
  label: string;
  value: string;
  rounds: number;
  exercises: number;
  exercise_duration: number;
  rest_duration: number;
  rest_between_rounds: number;
  generated_body_parts_list: string[];
  all_exercises_for_generated_list?: IWorkoutGeneratedExercisesList[];
}

export interface IWorkoutGeneratedExercisesList {
  bodyPartName: string;
  exercises: IBodyPartsForWorkout[];
}