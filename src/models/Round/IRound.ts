import IExercise from "../Exercise/IExercise";

export default interface IRound {
  bodyId: string;
  isActive: boolean;
  exercisesList: IExercise[];
  restDuration: number;
  workDuration: number;

  getExercisesLength(): number;
}