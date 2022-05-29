import IRound from "../../models/Round/IRound";
import IWorkoutService from "../WorkoutService/IWorkoutService";
import WorkoutBuilderService from "../WorkoutBuilderService/WorkoutBuilderService";
import WorkoutFactory from "../WorkoutFactory";
import { WorkoutType } from "../../interfaces_deprecated/WorkoutType";
import { IWorkoutSettings } from "../../interfaces_deprecated/IWorkoutSettings";
import RoundBuilderService from "../RoundBuilderService/RoundBuilderService";
import IWorkoutSessionService from "./IWorkoutSessionService";
import workoutDefaultSettings from "../../data/workoutDefaultSettings";
import WorkoutSessionService from "./WorkoutSessionService";

export default class TabataWorkoutSession extends WorkoutSessionService {

}