import { IRoundBuilderService } from "./IRoundBuilderService";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";
import { TValues } from "../../interfaces_deprecated/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";

export default abstract class RoundBuilderService implements IRoundBuilderService {
  abstract generate(workoutSession: IWorkoutSession, bodyPartsIdForEachRound: TValues<typeof EBodyParts>[]): IRound[];
}