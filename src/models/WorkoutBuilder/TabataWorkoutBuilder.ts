import WorkoutBuilder from "./WorkoutBuilder";
import RoundBuilder from "../RoundBuilder/RoundBuilder";
import HIITRoundBuilder from "../RoundBuilder/HIITRoundBuilder";
import TabataRoundBuilder from "../RoundBuilder/TabataRoundBuilder";

export default class TabataWorkoutBuilder extends WorkoutBuilder {
  public roundBuilder: TabataRoundBuilder = new TabataRoundBuilder();

  public generateRandomRound(exercisesLen: number) {

  }
}