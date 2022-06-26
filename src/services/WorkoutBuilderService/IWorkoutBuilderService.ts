import {TValues} from "../../interfaces/TValues";
import {EBodyParts} from "../../data/bodyPartsForWorkout";
import IWorkoutSession from "../../interfaces/IWorkoutSession";
import IRound from "../../models/Round/IRound";

export default interface IWorkoutBuilderService {
  generateWorkout(workoutSession: IWorkoutSession): Partial<IRound>[];
  generateBodyParts(roundsLength: number): TValues<typeof EBodyParts>[];
  getBodyParts(): TValues<typeof EBodyParts>[];
  getBodyPartLabel(bodyName: TValues<typeof EBodyParts>): string;
}