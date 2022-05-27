import RoundBuilder from "./RoundBuilder";
import IWorkoutSessionForState from "../WorkoutSession/IWorkoutSessionForState";
import { TValues } from "../../interfaces/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../Round/IRound";

export default class TabataRoundBuilder extends RoundBuilder {
  public generate(workoutSession: IWorkoutSessionForState, bodyPartsIdForEachRound: TValues<typeof BodyParts>[]): IRound[] { return []; }
}