import IRound from "../Round/IRound";
import IWorkout from "../Workout/IWorkout";
import WorkoutBuilder from "../../builders/Workout/WorkoutBuilder";
import WorkoutFactory from "../WorkoutFactory";
import { WorkoutType } from "../../interfaces/WorkoutType";
import { IWorkoutSettings } from "../../interfaces/IWorkoutSettings";
import RoundBuilder from "../../builders/Round/RoundBuilder";
import IWorkoutSession from "./IWorkoutSession";
import workoutDefaultSettings from "../../data/workoutDefaultSettings";

export default class WorkoutSession implements IWorkoutSession {
  rounds: IRound[] = [];
  activeRoundIndex: number = 0;
  roundsLength: number = workoutDefaultSettings.rounds;
  restDuration: number = workoutDefaultSettings.rest_duration;
  betweenRoundsDuration: number = workoutDefaultSettings.rest_between_rounds;
  exerciseDuration: number = workoutDefaultSettings.exercise_duration;
  exercisesLength: number = workoutDefaultSettings.exercises;

  constructor({ exerciseDuration, exercisesLength, roundsLength, restDuration }: IWorkoutSettings) {
    this.exercisesLength = exercisesLength;
    this.exerciseDuration = exerciseDuration;
    this.roundsLength = roundsLength;
    this.restDuration = restDuration;
  }

  getRoundByIndex(index: number): IRound {
    return this.rounds[index];
  }

  setActiveRoundIndex(index: number): void {
    this.activeRoundIndex = index;
  }
}