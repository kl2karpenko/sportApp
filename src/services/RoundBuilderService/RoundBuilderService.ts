import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";
import { IWorkoutSessionState } from "../../store/workoutSession";

export interface IRoundBuilderServiceConfig {
  workoutSession: IWorkoutSessionState;
  bodyPartsIdForEachRound: TValues<typeof EBodyParts>[];
}

export default abstract class RoundBuilderService {
  abstract generate(props: IRoundBuilderServiceConfig): Partial<IRound>[];
}