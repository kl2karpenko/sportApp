import IRound from "../../models/Round/IRound";
import { IWorkoutSettings } from "../../interfaces_deprecated/IWorkoutSettings";
import IWorkoutSessionService from "./IWorkoutSessionService";
import { WorkoutSessionFields } from "./WorkoutSessionFields";
import HIITRound from "../../models/Round/HIITRound";

export default class WorkoutSessionService implements IWorkoutSessionService {
  rounds: IRound[] = [];
  activeRoundIndex: number = 0;
  activeExerciseIndex: number = 0;
  roundsLength: number = 1;
  exercisesLength: number = 1;
  restDuration: number = 20;
  exerciseDuration: number = 20;
  betweenRoundsDuration: number = 60;

  constructor({ exerciseDuration, exercisesLength, roundsLength, restDuration, betweenRoundsDuration }: IWorkoutSettings) {
    this.exercisesLength = exercisesLength;
    this.exerciseDuration = exerciseDuration;
    this.roundsLength = roundsLength;
    this.restDuration = restDuration;
    this.betweenRoundsDuration = betweenRoundsDuration;
  }

  getRoundByIndex(index: number): IRound {
    return this.rounds[index];
  }

  getActiveRoundIndex(): number {
    return this.activeRoundIndex;
  }

  setActiveRoundIndex(index: number): void {
    this.activeRoundIndex = index;
  }

  getActiveExerciseIndex(): number {
    return this.activeExerciseIndex;
  }

  setActiveExerciseIndex(index: number): void {
    this.activeExerciseIndex = index;
  }

  updateValue(field: WorkoutSessionFields, value: any): void {
    this[field] = value;
  }

  getValue(field: WorkoutSessionFields): any {
    return this[field];
  }

  getValues(): any {
    return {};
  }
}