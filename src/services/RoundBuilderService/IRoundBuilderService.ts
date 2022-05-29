import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";
import { TValues } from "../../interfaces_deprecated/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";
import { IWorkoutAlgorithmService } from "../WorkoutAlgorithmService/IWorkoutAlgorithmService";

export interface IRoundBuilderService {
  generate(workoutSession: IWorkoutSession, bodyPartsIdForEachRound: TValues<typeof BodyParts>[]): IRound[];
}