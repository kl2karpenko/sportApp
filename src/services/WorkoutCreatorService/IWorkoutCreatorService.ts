import {WorkoutSessionFields} from "../WorkoutSessionService/WorkoutSessionFields";
import IExercise from "../../models/Exercise/IExercise";
import {TValues} from "../../interfaces_deprecated/TValues";
import {EBodyParts} from "../../data/bodyPartsForWorkout";

export default interface IWorkoutCreatorService {
  generateWorkout(): void;
  updateCurrentWorkoutSession(field: WorkoutSessionFields, value: any): void;
  updateCurrentWorkoutSessionRoundExercise(roundIndex: number, exInd: number, exercise: IExercise): void;
  updateCurrentWorkoutSessionRound(roundIndex: number, bodyPartName: TValues<typeof EBodyParts>): void;
}