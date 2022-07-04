import WorkoutBuilderService from "./WorkoutBuilderService";
import TabataRoundBuilderService from "../RoundBuilderService/TabataRoundBuilderService";
import IRound from "../../models/Round/IRound";
import { IWorkoutSessionState } from "../../store/workoutSession";
import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";

export default class TabataWorkoutBuilderService extends WorkoutBuilderService {
  public roundBuilder: TabataRoundBuilderService = new TabataRoundBuilderService();

  generateWorkoutRounds(workoutSession: IWorkoutSessionState, bodyPartsIdForEachRound: TValues<typeof EBodyParts>[]): Partial<IRound>[] {
    return this.roundBuilder.generate(workoutSession, bodyPartsIdForEachRound);
  }

  generateWorkout(workoutSession: IWorkoutSessionState): Partial<IRound>[] {
    const {
      roundsLength
    } = workoutSession;
    if (roundsLength === 0) throw new Error();

    const bodyPartsIdForEachRound = this.generateBodyParts(roundsLength);

    return this.generateWorkoutRounds(workoutSession, bodyPartsIdForEachRound);
  }
}