import IExercise from "../Exercise/IExercise";

export default interface IRound {
  index: number;
  bodyId: string;
  exercises: IExercise[];
  restDuration: number;
}