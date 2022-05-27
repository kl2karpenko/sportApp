import RandomizerService from "../../services/RandomizerService";
import IExercise from "../Exercise/IExercise";
import IWorkoutSessionForState from "../WorkoutSession/IWorkoutSessionForState";
import { TValues } from "../../interfaces/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../Round/IRound";

export interface IRoundBuilder {
  randomizer: RandomizerService;
  exercisesList: { [key: string]: IExercise[] };

  generate(workoutSession: IWorkoutSessionForState, bodyPartsIdForEachRound: TValues<typeof BodyParts>[]): IRound[];
}