import workoutTypes from "../../data/workoutTypesList";
import IExercise from "../Exercise/IExercise";
import RandomizerService from "../../services/RandomizerService";
import {IRoundBuilder} from "./IRoundBuilder";
import IWorkoutSessionForState from "../WorkoutSession/IWorkoutSessionForState";
import {TValues} from "../../interfaces/TValues";
import {BodyParts} from "../../data/bodyPartsForWorkout";
import IRound from "../Round/IRound";

export default abstract class RoundBuilder implements IRoundBuilder {
  public randomizer: RandomizerService = new RandomizerService();
  public exercisesList: { [key in TValues<typeof BodyParts>]: IExercise[] } = workoutTypes;
  public cardioExercisesList: IExercise[] = workoutTypes[BodyParts.cardio];
  public cardioExercisesListLength: number = this.cardioExercisesList.length;

  public abstract generate(workoutSession: IWorkoutSessionForState, bodyPartsIdForEachRound: TValues<typeof BodyParts>[]): IRound[];
}