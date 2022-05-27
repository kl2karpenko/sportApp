import WorkoutBuilder from "./WorkoutBuilder";
import HIITRoundBuilder from "../RoundBuilder/HIITRoundBuilder";
import { TValues } from "../../interfaces/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";
import IWorkoutSessionForState from "../WorkoutSession/IWorkoutSessionForState";
import IRound from "../Round/IRound";

export default class HIITWorkoutBuilder extends WorkoutBuilder {
  public roundBuilder: HIITRoundBuilder = new HIITRoundBuilder();

  public generateBodyParts(roundsLength: number): TValues<typeof BodyParts>[] {
    const bodyPartsListLength = this.bodyPartsList.length;

    return [...Array(roundsLength).keys()].map((round: number) => {
      return this.bodyPartsList[this.randomizer.getRandomInt(0, bodyPartsListLength - 1)];
    });
  }

  public generateWorkout(workoutSession: IWorkoutSessionForState): IRound[] {
    const {
      roundsLength
    } = workoutSession;
    if (roundsLength === 0) throw new Error();

    const bodyPartsIdForEachRound = this.generateBodyParts(roundsLength);

    return this.roundBuilder.generate(workoutSession, bodyPartsIdForEachRound);
  }
}