import IRound from "../Round/IRound";
import IWorkout from "../Workout/IWorkout";
import WorkoutBuilder from "../WorkoutBuilder/WorkoutBuilder";
import WorkoutFactory from "../WorkoutFactory";
import { WorkoutType } from "../../interfaces/WorkoutType";
import { IWorkoutSettings } from "../../interfaces/IWorkoutSettings";
import RoundBuilder from "../RoundBuilder/RoundBuilder";
import IWorkoutSession from "./IWorkoutSession";
import workoutDefaultSettings from "../../data/workoutDefaultSettings";
import {WorkoutSessionFields} from "./WorkoutSessionFields";
import {TValues} from "../../interfaces/TValues";
import {BodyParts} from "../../data/bodyPartsForWorkout";
import IWorkoutSessionForState from "./IWorkoutSessionForState";

export default class WorkoutSession implements IWorkoutSession {
  rounds: IRound[] = [];
  roundsBodyParts: TValues<typeof BodyParts>[] = [];
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

  getValues(): IWorkoutSessionForState {
    return {
      rounds: this.rounds,
      roundsBodyParts: this.roundsBodyParts,
      roundsLength: this.roundsLength,
      activeRoundIndex: this.activeRoundIndex,
      restDuration: this.restDuration,
      betweenRoundsDuration: this.betweenRoundsDuration,
      exerciseDuration: this.exerciseDuration,
      exercisesLength: this.exercisesLength
    };
  }
}