import WorkoutCreatorService from "./WorkoutCreatorService";
import { IWorkoutSettings } from "../../interfaces_deprecated/IWorkoutSettings";
import TabataWorkoutSessionService from "../WorkoutSessionService/TabataWorkoutSessionService";
import TabataRoundBuilderService from "../RoundBuilderService/TabataRoundBuilderService";
import {WorkoutSessionFields} from "../WorkoutSessionService/WorkoutSessionFields";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";

export default class TabataWorkoutCreatorService extends WorkoutCreatorService {
  workoutSession: TabataWorkoutSessionService;
  public roundBuilder: TabataRoundBuilderService = new TabataRoundBuilderService();

  constructor(props: IWorkoutSettings) {
    super(props);

    this.workoutSession = new TabataWorkoutSessionService(props);
  }

  generateWorkout(): void {
    console.log("generate workout for tabata");
  }

  updateCurrentWorkoutSession(field: WorkoutSessionFields, value: any): void {
    this.workoutSession.updateValue(field, value);
  }

  getCurrentWorkoutSession(): IWorkoutSession {
    return this.workoutSession.getValues();
  }
}