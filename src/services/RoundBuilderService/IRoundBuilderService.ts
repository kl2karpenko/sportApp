import IWorkoutSession from "../../interfaces/IWorkoutSession";
import { TValues } from "../../interfaces_deprecated/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";

export interface IRoundBuilderService {
  generate(workoutSession: IWorkoutSession, bodyPartsIdForEachRound: TValues<typeof EBodyParts>[]): Partial<IRound>[];
}