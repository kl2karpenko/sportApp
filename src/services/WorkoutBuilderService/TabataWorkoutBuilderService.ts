import WorkoutBuilderService from "./WorkoutBuilderService";
import TabataRoundBuilderService from "../RoundBuilderService/TabataRoundBuilderService";
import IWorkoutSession from "../../interfaces/IWorkoutSession";
import IRound from "../../models/Round/IRound";

export default class TabataWorkoutBuilderService extends WorkoutBuilderService {
  public roundBuilder: TabataRoundBuilderService = new TabataRoundBuilderService();

  constructor() {
    super();
  }

  generateWorkout(workoutSession: IWorkoutSession): IRound[] {
    console.log("generate workout for tabata");
    return [];
  }
}