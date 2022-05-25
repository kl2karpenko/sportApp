import IRound from "../Round/IRound";
import IWorkout from "../Workout/IWorkout";
import WorkoutBuilder from "../WorkoutBuilder/WorkoutBuilder";
import WorkoutFactory from "../WorkoutFactory";
import { WorkoutType } from "../../interfaces/WorkoutType";
import { IWorkoutSettings } from "../../interfaces/IWorkoutSettings";
import RoundBuilder from "../RoundBuilder/RoundBuilder";
import IWorkoutSession from "./IWorkoutSession";
import workoutDefaultSettings from "../../data/workoutDefaultSettings";
import WorkoutSession from "./WorkoutSession";

export default class TabataWorkoutSession extends WorkoutSession {

}