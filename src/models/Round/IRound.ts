import IExercise from "../Exercise/IExercise";
import { TValues } from "../../interfaces/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";

export default interface IRound {
  bodyId: TValues<typeof BodyParts>;
  readonly isActive: boolean;
  exercisesList: IExercise[];
  restDuration: number;
  workDuration: number;
}