import WorkoutBuilderService, { IWorkoutBuilderServiceConfig } from "./WorkoutBuilderService";
import TabataRoundBuilderService from "../RoundBuilderService/TabataRoundBuilderService";
import IRound from "../../models/Round/IRound";
import { IWorkoutSessionState } from "../../store/workoutSession";

export default class TabataWorkoutBuilderService extends WorkoutBuilderService {
  public roundBuilder: TabataRoundBuilderService = new TabataRoundBuilderService();

  generateWorkoutRounds(props: IWorkoutBuilderServiceConfig): Partial<IRound>[] {
    return this.roundBuilder.generate(props);
  }

  generateWorkout(workoutSession: IWorkoutSessionState): Partial<IRound>[] {
    const {
      roundsLength
    } = workoutSession;
    if (roundsLength === 0) throw new Error();

    const bodyPartsIdForEachRound = this.generateBodyParts(roundsLength);

    return this.generateWorkoutRounds({ workoutSession, bodyPartsIdForEachRound });
  }
}