import BasicWorkout from "./BasicWorkout";
import HIITWorkoutBuilder from "../WorkoutBuilder/HIITWorkoutBuilder";
import { IWorkoutSettings } from "../../interfaces/IWorkoutSettings";
import HIITWorkoutSession from "../WorkoutSession/HIITWorkoutSession";
import {WorkoutSessionFields} from "../WorkoutSession/WorkoutSessionFields";
import IWorkoutSessionForState from "../WorkoutSession/IWorkoutSessionForState";

export default class HIITWorkout extends BasicWorkout {
  workoutBuilder: HIITWorkoutBuilder;
  workoutSession: HIITWorkoutSession;

  constructor(props: IWorkoutSettings) {
    super();

    this.workoutBuilder = new HIITWorkoutBuilder();
    this.workoutSession = new HIITWorkoutSession(props);
  }

  updateWorkoutSessionValue(field: WorkoutSessionFields, value: any): void {
    this.workoutSession.updateValue(field, value);
  }

  getWorkoutSessionValues(): IWorkoutSessionForState {
    return this.workoutSession.getValues();
  }

  generateWorkoutSession(): void {
    console.log("getWorkoutSessionValues", this.workoutSession.getValues());
    console.log(this.workoutSession.roundsLength, " generateWorkoutSession this.workoutSession.roundsLength ");
    const roundsBodyParts = this.workoutBuilder.generateWorkout(this.workoutSession.getValues());

    this.updateWorkoutSessionValue(WorkoutSessionFields.roundsBodyParts, roundsBodyParts);
  }
}