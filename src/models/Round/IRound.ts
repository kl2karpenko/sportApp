import IExercise from "../Exercise/IExercise";
import { TValues } from "../../interfaces_deprecated/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";

export default interface IRound {
  bodyId: TValues<typeof BodyParts>;
  isActive: boolean;
  exercisesList: IExercise[];
  restDuration: number;
  workDuration: number;
}