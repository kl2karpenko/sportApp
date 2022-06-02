import { TValues } from "../../interfaces_deprecated/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import IExercise from "../Exercise/IExercise";
import {IWorkoutRoundExercises} from "./IWorkoutRoundExercises";
import {IExercisesList} from "../ExercisesList/IExercisesList";
import ExercisesList from "../ExercisesList/ExercisesList";
import Exercise from "../Exercise/Exercise";

export default class WorkoutRoundExercises implements IWorkoutRoundExercises {
  private listOfExercisesForCurrentBodyPart: IExercise[];
  private bodyPartName: TValues<typeof EBodyParts>;
  private exercisesInRoundLength: number;
  private allExercisesData: IExercisesList = new ExercisesList();

  constructor(exercisesLength: number, bodyPartName: TValues<typeof EBodyParts>) {
    this.exercisesInRoundLength = exercisesLength;
    this.bodyPartName = bodyPartName;
    this.listOfExercisesForCurrentBodyPart = this.allExercisesData.getExercisesForBodyPart(bodyPartName);
  }

  isExerciseCardio(exercise: IExercise): boolean {
    return new Exercise(exercise).id.includes("cardio");
  }

  getCardioExercisesList(): IExercise[] {
    return this.allExercisesData.getCardioExercisesList();
  }

  getAllExercises(): IExercisesList {
    return this.allExercisesData;
  }

  getBodyPartId(): TValues<typeof EBodyParts> {
    return this.bodyPartName;
  }

  getListOfExerciseForBodyId(): IExercise[] {
    return this.listOfExercisesForCurrentBodyPart;
  }

  getNumberOfExercisesInRound(): number {
    return this.exercisesInRoundLength;
  }
}