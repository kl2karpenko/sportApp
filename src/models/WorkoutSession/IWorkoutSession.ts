import IRound from "../Round/IRound";
import {WorkoutSessionFields} from "./WorkoutSessionFields";

export default interface IWorkoutSession {
  rounds: IRound[];
  roundsLength: number;
  activeRoundIndex: number;
  restDuration: number;
  betweenRoundsDuration: number;
  exerciseDuration: number;
  exercisesLength: number;

  getRoundByIndex(index: number): IRound;
  setActiveRoundIndex(index: number): void;
  updateValue(field: WorkoutSessionFields, value: number): void;
}