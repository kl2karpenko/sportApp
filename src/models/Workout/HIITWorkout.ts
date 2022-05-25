import Workout from "./Workout";
import HIITWorkoutBuilder from "../WorkoutBuilder/HIITWorkoutBuilder";
import { IWorkoutSettings } from "../../interfaces/IWorkoutSettings";
import HIITWorkoutSession from "../WorkoutSession/HIITWorkoutSession";
import {WorkoutSessionFields} from "../WorkoutSession/WorkoutSessionFields";
import IWorkoutSessionForState from "../WorkoutSession/IWorkoutSessionForState";

export default class HIITWorkout extends Workout {
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

  getWorkoutSessionValue(): IWorkoutSessionForState {
    return this.workoutSession.getValues();
  }

  generateWorkoutSession(): void {
    const roundsBodyParts = this.workoutBuilder.getRandomBodyParts(this.workoutSession.roundsLength);

    this.updateWorkoutSessionValue(WorkoutSessionFields.roundsBodyParts, roundsBodyParts);
  }
}