import {IWorkoutExercisesGeneratorService} from "./IWorkoutExercisesGeneratorService";
import IExercise from "../../models/Exercise/IExercise";
import {TValues} from "../../interfaces_deprecated/TValues";
import {EBodyParts} from "../../data/bodyPartsForWorkout";
import {WorkoutAlgorithms} from "./WorkoutAlgorithms";
import WorkoutRoundExercises from "../../models/WorkoutRoundExercises/WorkoutRoundExercises";
import {IWorkoutRoundExercises} from "../../models/WorkoutRoundExercises/IWorkoutRoundExercises";

export default class WorkoutExercisesGeneratorService implements IWorkoutExercisesGeneratorService {
  public workoutRoundExercises: IWorkoutRoundExercises;

  constructor(exercisesLength: number, bodyPartName: TValues<typeof EBodyParts>) {
    this.workoutRoundExercises = new WorkoutRoundExercises(exercisesLength, bodyPartName);
  }

  getExercisesList(algorithm?: WorkoutAlgorithms): IExercise[] {
    switch (algorithm) {
    case WorkoutAlgorithms.simple:
      return this.getExercisesListForSimpleAlgorithm();
    case WorkoutAlgorithms.withPair:
      return this.getExercisesListForWithPairAlgorithm();
    default:
      return [];
    }
  }

  protected getExercisesListForSimpleAlgorithm(): IExercise[] {
    const listOfExercises = this.workoutRoundExercises.getListOfExerciseForBodyId();
    if (listOfExercises.length === 0) return [];

    const shuffledExercises = this.getShuffledList(listOfExercises);
    return [ ...shuffledExercises.slice(0, this.workoutRoundExercises.getNumberOfExercisesInRound())];
  }

  protected getExercisesListForWithPairAlgorithm(): IExercise[] {
    const exercisesList: IExercise[] = [];
    const listOfExercises = this.workoutRoundExercises.getListOfExerciseForBodyId();
    if (this.workoutRoundExercises.getNumberOfExercisesInRound() === 0) return exercisesList;

    const shuffledExercises = this.getShuffledList(listOfExercises);
    const newExercisesList = [...shuffledExercises.slice(0, this.workoutRoundExercises.getNumberOfExercisesInRound())];
    const newExercisesListLen = newExercisesList.length;

    for (let i = 0; i < newExercisesListLen; i++) {
      const currentExercise = newExercisesList[i];
      const pairExerciseId = currentExercise.pair;
      exercisesList.push(currentExercise);

      if (pairExerciseId) {
        exercisesList.push(shuffledExercises[this.getExerciseIndexInList(shuffledExercises, pairExerciseId)]);
      }
    }

    exercisesList.length = this.workoutRoundExercises.getNumberOfExercisesInRound();

    return exercisesList;
  }

  protected getShuffledList(list: IExercise[]): IExercise[] {
    return list.sort(() => Math.random() - 0.5);
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

  protected addCardioExercisesToList(exercisesList: IExercise[], position: number = 2): IExercise[] {
    const arrLen = exercisesList.length;
    const shuffledCardioList = this.getShuffledList(this.workoutRoundExercises.getCardioExercisesList());
    let addingToPosition = 0;

    for (let i = 0; i < arrLen + addingToPosition; i = i + position) {
      addingToPosition++;
      exercisesList.splice(i, 0, shuffledCardioList[i]);
    }

    return exercisesList.slice(0, arrLen);
  }
}