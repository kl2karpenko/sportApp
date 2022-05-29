import RoundBuilderService from "./RoundBuilderService";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";
import { TValues } from "../../interfaces_deprecated/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";

export default class TabataRoundBuilderService extends RoundBuilderService {
  public generate(workoutSession: IWorkoutSession, bodyPartsIdForEachRound: TValues<typeof BodyParts>[]): IRound[] { return []; }
}