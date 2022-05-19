import IRound from "./IRound";
import IExercise from "../Exercise/IExercise";

export default abstract class Round {
  private exercises: IExercise[];
  private exercisesLength: number;
  private restDuration: number;
  private workDuration: number;

  constructor(props: {
    exercisesLength: number;
    restDuration: number;
    workDuration: number
  }) {}

  abstract getExercises(): IExercise[];
  abstract getRestDuration(): number;
  abstract getWorkDuration(): number;
  abstract getExercisesLength(): number;
}