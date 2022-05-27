import BasicWorkout from "./BasicWorkout";
import { IWorkoutSettings } from "../../interfaces/IWorkoutSettings";
import TabataWorkoutBuilder from "../WorkoutBuilder/TabataWorkoutBuilder";
import TabataWorkoutSession from "../WorkoutSession/TabataWorkoutSession";
import {WorkoutSessionFields} from "../WorkoutSession/WorkoutSessionFields";
import IWorkoutSessionForState from "../WorkoutSession/IWorkoutSessionForState";

export default class TabataWorkout extends BasicWorkout {
  workoutBuilder: TabataWorkoutBuilder;
  workoutSession: TabataWorkoutSession;

  constructor(props: IWorkoutSettings) {
    super();

    this.workoutBuilder = new TabataWorkoutBuilder();
    this.workoutSession = new TabataWorkoutSession(props);
  }

  updateWorkoutSessionValue(field: WorkoutSessionFields, value: any): void {
    this.workoutSession.updateValue(field, value);
  }

  getWorkoutSessionValues(): IWorkoutSessionForState {
    return this.workoutSession.getValues();
  }

  generateWorkoutSession(): void {
    // const bodyPartsList = this.workoutBuilder.getRandomBodyParts(this.workoutSession.roundsLength);


    // this.rounds =
  }
}