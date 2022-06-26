import { IRoundBuilderService } from "./IRoundBuilderService";
import IWorkoutSession from "../../interfaces/IWorkoutSession";
import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";

export default abstract class RoundBuilderService implements IRoundBuilderService {
  abstract generate(workoutSession: IWorkoutSession, bodyPartsIdForEachRound: TValues<typeof EBodyParts>[]): Partial<IRound>[];
}