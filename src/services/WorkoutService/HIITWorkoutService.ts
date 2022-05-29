import BasicWorkoutService from "./BasicWorkoutService";
import HIITWorkoutBuilderService from "../WorkoutBuilderService/HIITWorkoutBuilderService";
import { IWorkoutSettings } from "../../interfaces_deprecated/IWorkoutSettings";
import HIITWorkoutSessionService from "../WorkoutSessionService/HIITWorkoutSessionService";
import {WorkoutSessionFields} from "../WorkoutSessionService/WorkoutSessionFields";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";

export default class HIITWorkoutService extends BasicWorkoutService {
  workoutBuilder: HIITWorkoutBuilderService;
  workoutSession: HIITWorkoutSessionService;

  constructor(props: IWorkoutSettings) {
    super();

    this.workoutBuilder = new HIITWorkoutBuilderService();
    this.workoutSession = new HIITWorkoutSessionService(props);
  }

  updateWorkoutSessionValue(field: WorkoutSessionFields, value: any): void {
    this.workoutSession.updateValue(field, value);
  }

  getWorkoutSessionValues(): IWorkoutSession {
    return this.workoutSession.getValues();
  }

  generateWorkoutSession(): void {
    const rounds = this.workoutBuilder.generateWorkout(this.workoutSession.getValues());

    this.updateWorkoutSessionValue(WorkoutSessionFields.rounds, rounds);
  }
}