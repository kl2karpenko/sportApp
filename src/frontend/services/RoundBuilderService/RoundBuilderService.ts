import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";
import { TAllExercises } from "../../interfaces/TAllExercises";
import IExercise from "../../models/Exercise/IExercise";
import { IWorkoutSessionState } from "../../store/workoutSession";

export interface IRoundBuilderServiceConfig {
  workoutSession: IWorkoutSessionState;
  bodyPartsIdForEachRound: TValues<typeof EBodyParts>[];
  exercises: TAllExercises;
  cardioExercises: Partial<IExercise>[];
}

export default abstract class RoundBuilderService {
  abstract generate(props: IRoundBuilderServiceConfig): Partial<IRound>[];
}