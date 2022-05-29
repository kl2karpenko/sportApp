import IRound from "../../models/Round/IRound";
import IWorkoutService from "../WorkoutService/IWorkoutService";
import WorkoutBuilderService from "../WorkoutBuilderService/WorkoutBuilderService";
import WorkoutFactory from "../WorkoutFactory";
import { WorkoutType } from "../../interfaces_deprecated/WorkoutType";
import { IWorkoutSettings } from "../../interfaces_deprecated/IWorkoutSettings";
import RoundBuilderService from "../RoundBuilderService/RoundBuilderService";
import IWorkoutSessionService from "./IWorkoutSessionService";
import workoutDefaultSettings from "../../data/workoutDefaultSettings";
import {WorkoutSessionFields} from "./WorkoutSessionFields";
import {TValues} from "../../interfaces_deprecated/TValues";
import {BodyParts} from "../../data/bodyPartsForWorkout";
import IWorkoutSession from "./IWorkoutSession";

export default class WorkoutSessionService implements IWorkoutSessionService {
  rounds: IRound[] = [];
  activeRoundIndex: number = 0;
  roundsLength: number = workoutDefaultSettings.rounds;
  exercisesLength: number = workoutDefaultSettings.exercises;
  restDuration: number = workoutDefaultSettings.rest_duration;
  exerciseDuration: number = workoutDefaultSettings.exercise_duration;
  betweenRoundsDuration: number = workoutDefaultSettings.rest_between_rounds;

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

  setActiveRoundIndex(index: number): void {
    this.activeRoundIndex = index;
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