import WorkoutBuilderService from "./WorkoutBuilderService";
import IWorkoutSession from "../../interfaces/IWorkoutSession";
import HIITRoundBuilderService from "../RoundBuilderService/HIITRoundBuilderService";
import IRound from "../../models/Round/IRound";
import { WorkoutType } from "../../interfaces/WorkoutType";

export default class HIITWorkoutBuilderService extends WorkoutBuilderService {
  private roundBuilder: HIITRoundBuilderService = new HIITRoundBuilderService();

  constructor(props: { workoutType: WorkoutType }) {
    super(props);
  }

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