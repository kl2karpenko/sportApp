import IRound from "../Round/IRound";
import { WorkoutSessionFields } from "./WorkoutSessionFields";
import { TValues } from "../../interfaces/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";

export default interface IWorkoutSession {
  rounds: IRound[];
  roundsBodyParts: TValues<typeof BodyParts>[];
  roundsLength: number;
  activeRoundIndex: number;
  restDuration: number;
  betweenRoundsDuration: number;
  exerciseDuration: number;
  exercisesLength: number;

  getRoundByIndex(index: number): IRound;
  setActiveRoundIndex(index: number): void;
  updateValue(field: WorkoutSessionFields, value: any): void;
}