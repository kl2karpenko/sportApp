import WorkoutBuilderService from "./WorkoutBuilderService";
import RoundBuilderService from "../RoundBuilderService/RoundBuilderService";
import HIITRoundBuilderService from "../RoundBuilderService/HIITRoundBuilderService";
import TabataRoundBuilderService from "../RoundBuilderService/TabataRoundBuilderService";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";
import IRound from "../../models/Round/IRound";

export default class TabataWorkoutBuilderService extends WorkoutBuilderService {
  public roundBuilder: TabataRoundBuilderService = new TabataRoundBuilderService();

  public generateWorkout(workoutSession: IWorkoutSession): IRound[] {
    return [];
  }
}