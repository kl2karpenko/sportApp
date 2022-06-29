import { IWorkoutExercisesGeneratorService } from "./IWorkoutExercisesGeneratorService";
import IExercise from "../../models/Exercise/IExercise";
import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { WorkoutAlgorithms } from "./WorkoutAlgorithms";
import { IExercisesList } from "../../models/ExercisesList/IExercisesList";
import ExercisesList from "../../models/ExercisesList/ExercisesList";

// TODO: split this and rename for HIITWorkoutExercisesGeneratorService as for Tabata this should be different!!!
export default class WorkoutExercisesGeneratorService implements IWorkoutExercisesGeneratorService {
  private listOfExercisesForCurrentBodyPart: IExercise[];
  private bodyPartName: TValues<typeof EBodyParts>;
  private exercisesInRoundLength: number;
  private allExercisesData: IExercisesList = new ExercisesList();

  constructor(exercisesLength: number, bodyPartName: TValues<typeof EBodyParts>) {
    this.exercisesInRoundLength = exercisesLength;
    this.bodyPartName = bodyPartName;
    this.listOfExercisesForCurrentBodyPart = this.allExercisesData.getExercisesForBodyPart(bodyPartName);
  }

  public getExercisesList(algorithm?: WorkoutAlgorithms, includeCardio: boolean = true): IExercise[] {
    switch (algorithm) {
    case WorkoutAlgorithms.simple:
      return this.getExercisesListForSimpleAlgorithm(includeCardio);
    case WorkoutAlgorithms.withPair:
      return this.getExercisesListForWithPairAlgorithm(includeCardio);
    default:
      return [];
    }
  }

  public getListOfExercisesForCurrentBodyPart() {
    return this.listOfExercisesForCurrentBodyPart;
  }

  protected getExercisesListForSimpleAlgorithm(includeCardio: boolean = true): IExercise[] {
    const listOfExercises = this.listOfExercisesForCurrentBodyPart;
    if (listOfExercises.length === 0) return [];

    const shuffledExercises = this.getShuffledList(listOfExercises);
    let allExercises = [ ...shuffledExercises ];
    
    if (includeCardio) {
      allExercises = this.addCardioExercisesToList(allExercises, 2);
    }

    allExercises.length = this.exercisesInRoundLength;

    return allExercises;
  }

  protected getExercisesListForWithPairAlgorithm(includeCardio: boolean = true): IExercise[] {
    let exercisesList: IExercise[] = [];
    const listOfExercises = this.listOfExercisesForCurrentBodyPart;
    if (this.exercisesInRoundLength === 0) return exercisesList;

    const shuffledExercises = this.getShuffledList(listOfExercises);
    const newExercisesList = [...shuffledExercises.slice(0, this.exercisesInRoundLength)];
    const newExercisesListLen = newExercisesList.length;

    for (let i = 0; i < newExercisesListLen; i++) {
      const currentExercise = newExercisesList[i];
      const pairExerciseId = currentExercise.pair;
      exercisesList.push(currentExercise);

      if (pairExerciseId) {
        exercisesList.push(shuffledExercises[this.getExerciseIndexInList(shuffledExercises, pairExerciseId)]);
      }
    }

    if (includeCardio) {
      exercisesList = this.addCardioExercisesToList(exercisesList, 2);
    }

    exercisesList.length = this.exercisesInRoundLength;

    return exercisesList;
  }

  protected getShuffledList(list: IExercise[]): IExercise[] {
    return [...list].sort(() => Math.random() - 0.5);
  }

  protected getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  protected getExerciseIndexInList(exercisesList: IExercise[], findId: string): number {
    return exercisesList.findIndex((el: IExercise, index: number) => {
      if (el.id === findId) return index;
    });
  }

  protected addCardioExercisesToList(exercisesList: IExercise[], step: number = 2): IExercise[] {
    const arrLen = exercisesList.length;
    const shuffledCardioList = this.getShuffledList(this.allExercisesData.getCardioExercisesList());
    let addingToPosition = 0;

    for (let i = 0; i < arrLen + addingToPosition; i = i + step) {
      addingToPosition++;
      exercisesList.splice(i, 0, shuffledCardioList[i]);
    }

    return exercisesList.slice(0, arrLen);
  }
}