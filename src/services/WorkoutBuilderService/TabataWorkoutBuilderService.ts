import WorkoutBuilderService from "./WorkoutBuilderService";
import TabataRoundBuilderService from "../RoundBuilderService/TabataRoundBuilderService";
import IWorkoutSession from "../../interfaces/IWorkoutSession";
import IRound from "../../models/Round/IRound";
import { WorkoutType } from "../../interfaces/WorkoutType";

export default class TabataWorkoutBuilderService extends WorkoutBuilderService {
  public roundBuilder: TabataRoundBuilderService = new TabataRoundBuilderService();

  generateWorkoutRounds(workoutSession: IWorkoutSession): Partial<IRound>[] {
    const {
      roundsLength
    } = workoutSession;
    if (roundsLength === 0) throw new Error();

    const bodyPartsIdForEachRound = this.generateBodyParts(roundsLength);

    return this.roundBuilder.generate(workoutSession, bodyPartsIdForEachRound);
  }

  generateWorkout(workoutSession: IWorkoutSession): Partial<IRound>[] {
    return this.generateWorkoutRounds(workoutSession);
  }
}