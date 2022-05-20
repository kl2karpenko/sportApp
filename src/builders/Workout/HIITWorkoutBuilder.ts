import WorkoutBuilder from "./WorkoutBuilder";
import RoundBuilder from "../Round/RoundBuilder";
import HIITRoundBuilder from "../Round/HIITRoundBuilder";

export default class HIITWorkoutBuilder extends WorkoutBuilder {
  public roundBuilder: HIITRoundBuilder = new HIITRoundBuilder();

  public generateRandomRound(exercisesLen: number) {

  }

  public getRandomBodyParts(rounds: number): string[] {
    if (rounds === 0) throw new Error();

    const bodyPartsListLength = this.bodyPartsList.length;

    return [...Array(rounds).keys()].map((round: number) => {
      return this.bodyPartsList[this.randomizer.getRandomInt(0, bodyPartsListLength - 1)];
    });
  }
}