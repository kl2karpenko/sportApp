import WorkoutBuilder from "./WorkoutBuilder";
import RoundBuilder from "../RoundBuilder/RoundBuilder";
import HIITRoundBuilder from "../RoundBuilder/HIITRoundBuilder";
import TabataRoundBuilder from "../RoundBuilder/TabataRoundBuilder";
import IWorkoutSessionForState from "../WorkoutSession/IWorkoutSessionForState";
import IRound from "../Round/IRound";

export default class TabataWorkoutBuilder extends WorkoutBuilder {
  public roundBuilder: TabataRoundBuilder = new TabataRoundBuilder();

  public generateWorkout(workoutSession: IWorkoutSessionForState): IRound[] {
    return [];
  }
}