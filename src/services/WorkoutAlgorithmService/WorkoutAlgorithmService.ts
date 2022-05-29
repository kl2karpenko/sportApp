import {IWorkoutAlgorithmService} from "./IWorkoutAlgorithmService";
import {WorkoutAlgorithms} from "./WorkoutAlgorithms";
import IExercise from "../../models/Exercise/IExercise";
import {TValues} from "../../interfaces_deprecated/TValues";
import {BodyParts} from "../../data/bodyPartsForWorkout";
import workoutTypes from "../../data/workoutTypesList";
import {IRandomizerService} from "../RandomizerService/IRandomizerService";
import RandomizerService from "../RandomizerService";

export default class WorkoutAlgorithmService implements IWorkoutAlgorithmService {
  public exercisesList: { [key in TValues<typeof BodyParts>]: IExercise[] } = workoutTypes;
  public cardioExercisesList: IExercise[] = workoutTypes[BodyParts.cardio];
  public cardioExercisesListLength: number = this.cardioExercisesList.length;
  public listOfExercisesForCurrentBodyPart: IExercise[] = [];
  public allExercisesForThisBodyLen: number = 0;
  public bodyPartName: TValues<typeof BodyParts> = BodyParts.cardio;
  public exercisesLength: number = 0;
  randomizerService: IRandomizerService = new RandomizerService();

  constructor(exercisesLength: number, bodyPartName: TValues<typeof BodyParts>) {
    this.exercisesLength = exercisesLength;
    this.bodyPartName = bodyPartName;
    this.listOfExercisesForCurrentBodyPart = this.exercisesList[bodyPartName];
    this.allExercisesForThisBodyLen = this.listOfExercisesForCurrentBodyPart.length;
  }

  getExercisesList(algorithm: WorkoutAlgorithms, exercisesLength: number, bodyPartName: TValues<typeof BodyParts>): IExercise[] {
    return [];
  }
}