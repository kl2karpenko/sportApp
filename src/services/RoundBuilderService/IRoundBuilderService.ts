import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";
import { TValues } from "../../interfaces_deprecated/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";
import { IRandomizerService } from "../RandomizerService/IRandomizerService";
import { IWorkoutAlgorithmService } from "../WorkoutAlgorithmService/IWorkoutAlgorithmService";

export interface IRoundBuilderService {
  randomizerService: IRandomizerService;
  algorithmService: IWorkoutAlgorithmService;

  generate(workoutSession: IWorkoutSession, bodyPartsIdForEachRound: TValues<typeof BodyParts>[]): IRound[];
}