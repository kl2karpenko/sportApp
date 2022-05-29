import RandomizerService from "../RandomizerService";
import { IRoundBuilderService } from "./IRoundBuilderService";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";
import { TValues } from "../../interfaces_deprecated/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";
import { IWorkoutAlgorithmService } from "../WorkoutAlgorithmService/IWorkoutAlgorithmService";
import WorkoutAlgorithmService from "../WorkoutAlgorithmService/WorkoutAlgorithmService";
import { IRandomizerService } from "../RandomizerService/IRandomizerService";

export default abstract class RoundBuilderService implements IRoundBuilderService {
  randomizerService: IRandomizerService = new RandomizerService();
  algorithmService: IWorkoutAlgorithmService = new WorkoutAlgorithmService();

  abstract generate(workoutSession: IWorkoutSession, bodyPartsIdForEachRound: TValues<typeof BodyParts>[]): IRound[];
}