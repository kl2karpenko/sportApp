import WorkoutBuilderService from "./WorkoutBuilderService";
import HIITRoundBuilderService from "../RoundBuilderService/HIITRoundBuilderService";
import { TValues } from "../../interfaces_deprecated/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";
import IRound from "../../models/Round/IRound";

export default class HIITWorkoutBuilderService extends WorkoutBuilderService {
  public roundBuilder: HIITRoundBuilderService = new HIITRoundBuilderService();

  public generateBodyParts(roundsLength: number): TValues<typeof BodyParts>[] {
    const bodyPartsListLength = this.bodyPartsList.length;

    return [...Array(roundsLength).keys()].map((round: number) => {
      return this.bodyPartsList[this.randomizer.getRandomInt(0, bodyPartsListLength - 1)];
    });
  }

  public generateWorkout(workoutSession: IWorkoutSession): IRound[] {
    const {
      roundsLength
    } = workoutSession;
    if (roundsLength === 0) throw new Error();

    const bodyPartsIdForEachRound = this.generateBodyParts(roundsLength);

    return this.roundBuilder.generate(workoutSession, bodyPartsIdForEachRound);
  }
}