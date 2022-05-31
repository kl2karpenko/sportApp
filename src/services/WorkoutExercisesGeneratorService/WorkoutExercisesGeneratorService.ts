import {IWorkoutExercisesGeneratorService} from "./IWorkoutExercisesGeneratorService";
import IExercise from "../../models/Exercise/IExercise";
import {TValues} from "../../interfaces_deprecated/TValues";
import {BodyParts} from "../../data/bodyPartsForWorkout";
import workoutTypes from "../../data/workoutTypesList";
import {IRandomizerService} from "../RandomizerService/IRandomizerService";
import RandomizerService from "../RandomizerService";
import {WorkoutAlgorithms} from "./WorkoutAlgorithms";

export default class WorkoutExercisesGeneratorService implements IWorkoutExercisesGeneratorService {
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

  getExercisesList(algorithm: WorkoutAlgorithms): Set<IExercise> {
    switch (algorithm) {
    case WorkoutAlgorithms.simple:
      return this.getExercisesListForSimpleAlgorithm();
    case WorkoutAlgorithms.withPair:
      return this.getExercisesListForWithPairAlgorithm();
    default:
      return new Set([]);
    }
  }

  protected getExercisesListForSimpleAlgorithm(): Set<IExercise> {
    const exercisesList: Set<IExercise> = new Set();
    if (this.exercisesLength === 0) return exercisesList;

    let failedAttemptsToGenerateExclusiveExercises = false;

    while (exercisesList.size < this.exercisesLength && !failedAttemptsToGenerateExclusiveExercises) {
      try {
        exercisesList.add(this.generateExclusiveExercise(exercisesList));
      } catch (e) {
        exercisesList.add(this.getRandomExercise());
        failedAttemptsToGenerateExclusiveExercises = true;
      }
    }

    return exercisesList;
  }

  protected getExercisesListForWithPairAlgorithm(): Set<IExercise> {
    const exercisesList: Set<IExercise> = new Set();
    if (this.exercisesLength === 0) return exercisesList;

    for (let ex = 0; ex < this.exercisesLength; ex ++) {
      exercisesList.add(this.getExercise(exercisesList));
    }

    return exercisesList;
  }

  getExercise(exercisesList: Set<IExercise>, exclusive: boolean = true): IExercise {
    if (exclusive) {
      try {
        return this.generateExclusiveExercise(exercisesList);
      } catch (e) {
        return this.getRandomExercise();
      }
    }

    return this.getRandomExercise();
  }

  generateExclusiveExercise(exercisesList: Set<IExercise>): IExercise {
    let attempts = 0;

    while (exercisesList.size < this.exercisesLength && attempts !== this.exercisesLength) {
      const randomExercise = this.getRandomExercise();
      console.log(attempts, " attempts ");

      if (!exercisesList.has(randomExercise)) {
        return randomExercise;
      }
      attempts++;
    }

    throw Error("Cannot generate an exclusive exercise");
  }

  getRandomExercise(): IExercise {
    const randomInt = this.randomizerService.getRandomInt(0, this.allExercisesForThisBodyLen - 1);
    return this.listOfExercisesForCurrentBodyPart[randomInt];
  }
}