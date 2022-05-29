import IRound from "../../models/Round/IRound";
import { WorkoutSessionFields } from "./WorkoutSessionFields";
import { TValues } from "../../interfaces_deprecated/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";

export default interface IWorkoutSession {
  rounds: IRound[];
  roundsLength: number;
  activeRoundIndex: number;
  restDuration: number;
  betweenRoundsDuration: number;
  exerciseDuration: number;
  exercisesLength: number;
}