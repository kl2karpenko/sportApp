import Workout from "./Workout";
import HIITWorkoutBuilder from "../../builders/Workout/HIITWorkoutBuilder";
import { IWorkoutSettings } from "../../interfaces/IWorkoutSettings";
import HIITWorkoutSession from "../WorkoutSession/HIITWorkoutSession";
import {WorkoutSessionFields} from "../WorkoutSession/WorkoutSessionFields";

export default class HIITWorkout extends Workout {
  workoutBuilder: HIITWorkoutBuilder;
  workoutSession: HIITWorkoutSession;

  constructor(props: IWorkoutSettings) {
    super();

    this.workoutBuilder = new HIITWorkoutBuilder();
    this.workoutSession = new HIITWorkoutSession(props);
  }

  updateWorkoutSessionValue(field: WorkoutSessionFields, value: number): void {
    this.workoutSession.updateValue(field, value);
  }

  generateWorkoutSession(): void {
    const roundsEntities = this.workoutBuilder.getRandomBodyParts(this.workoutSession.roundsLength);

    console.log(roundsEntities, " roundsEntities");
  }
}