import IRound from "../models/Round/IRound";

export default interface IWorkoutSession {
  rounds: IRound[];
  roundsLength: number;
  restDuration: number;
  betweenRoundsDuration: number;
  exerciseDuration: number;
  exercisesLength: number;
}