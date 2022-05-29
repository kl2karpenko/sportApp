import BasicWorkoutService from "./BasicWorkoutService";
import { IWorkoutSettings } from "../../interfaces_deprecated/IWorkoutSettings";
import TabataWorkoutBuilderService from "../WorkoutBuilderService/TabataWorkoutBuilderService";
import TabataWorkoutSession from "../WorkoutSessionService/TabataWorkoutSession";
import {WorkoutSessionFields} from "../WorkoutSessionService/WorkoutSessionFields";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";

export default class TabataWorkoutService extends BasicWorkoutService {
  workoutBuilder: TabataWorkoutBuilderService;
  workoutSession: TabataWorkoutSession;

  constructor(props: IWorkoutSettings) {
    super();

    this.workoutBuilder = new TabataWorkoutBuilderService();
    this.workoutSession = new TabataWorkoutSession(props);
  }

  updateWorkoutSessionValue(field: WorkoutSessionFields, value: any): void {
    this.workoutSession.updateValue(field, value);
  }

  getWorkoutSessionValues(): IWorkoutSession {
    return this.workoutSession.getValues();
  }

  generateWorkoutSession(): void {
    // const bodyPartsList = this.workoutBuilder.getRandomBodyParts(this.workoutSession.roundsLength);


    // this.rounds =
  }
}