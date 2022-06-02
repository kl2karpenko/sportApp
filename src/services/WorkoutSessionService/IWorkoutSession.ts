import IRound from "../../models/Round/IRound";

export default interface IWorkoutSession {
  rounds: IRound[];
  roundsLength: number;
  activeExerciseIndex: number;
  activeRoundIndex: number;
  restDuration: number;
  betweenRoundsDuration: number;
  exerciseDuration: number;
  exercisesLength: number;
}