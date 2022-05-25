import WorkoutBuilder from "./WorkoutBuilder";
import RoundBuilder from "../RoundBuilder/RoundBuilder";
import HIITRoundBuilder from "../RoundBuilder/HIITRoundBuilder";
import {TValues} from "../../interfaces/TValues";
import {BodyParts} from "../../data/bodyPartsForWorkout";

export default class HIITWorkoutBuilder extends WorkoutBuilder {
  public roundBuilder: HIITRoundBuilder = new HIITRoundBuilder();

  public generateExercisesForRound(exercisesLen: number) {

  }

  public getRandomBodyParts(rounds: number): TValues<typeof BodyParts>[] {
    if (rounds === 0) throw new Error();

    const bodyPartsListLength = this.bodyPartsList.length;

    return [...Array(rounds).keys()].map((round: number) => {
      return this.bodyPartsList[this.randomizer.getRandomInt(0, bodyPartsListLength - 1)];
    });
  }
}