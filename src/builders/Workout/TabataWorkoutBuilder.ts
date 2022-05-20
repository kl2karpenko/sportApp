import WorkoutBuilder from "./WorkoutBuilder";
import RoundBuilder from "../Round/RoundBuilder";
import HIITRoundBuilder from "../Round/HIITRoundBuilder";
import TabataRoundBuilder from "../Round/TabataRoundBuilder";

export default class TabataWorkoutBuilder extends WorkoutBuilder {
  public roundBuilder: TabataRoundBuilder = new TabataRoundBuilder();

  public generateRandomRound(exercisesLen: number) {

  }
}