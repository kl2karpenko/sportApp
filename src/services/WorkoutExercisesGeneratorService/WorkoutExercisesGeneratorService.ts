import {IWorkoutExercisesGeneratorService} from "./IWorkoutExercisesGeneratorService";
import IExercise from "../../models/Exercise/IExercise";
import {TValues} from "../../interfaces_deprecated/TValues";
import {EBodyParts} from "../../data/bodyPartsForWorkout";
import {WorkoutAlgorithms} from "./WorkoutAlgorithms";
import WorkoutRoundExercises from "../../models/WorkoutRoundExercises/WorkoutRoundExercises";
import {IWorkoutRoundExercises} from "../../models/WorkoutRoundExercises/IWorkoutRoundExercises";

// TODO: change!!!
export default class WorkoutExercisesGeneratorService implements IWorkoutExercisesGeneratorService {
  public workoutRoundExercises: IWorkoutRoundExercises;

  constructor(exercisesLength: number, bodyPartName: TValues<typeof EBodyParts>) {
    this.workoutRoundExercises = new WorkoutRoundExercises(exercisesLength, bodyPartName);
  }

  getExercisesList(algorithm?: WorkoutAlgorithms): Set<IExercise> {
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
    const listOfExercises = this.workoutRoundExercises.getListOfExerciseForBodyId();
    if (listOfExercises.length === 0) return new Set([]);

    const shuffledExercises = this.getShuffledList(listOfExercises);
    return new Set([ ...shuffledExercises.slice(0, this.workoutRoundExercises.getNumberOfExercisesInRound())]);
  }

  protected getExercisesListForWithPairAlgorithm(): Set<IExercise> {
    const exercisesList: Set<IExercise> = new Set([]);
    const listOfExercises = this.workoutRoundExercises.getListOfExerciseForBodyId();
    if (this.workoutRoundExercises.getNumberOfExercisesInRound() === 0) return exercisesList;

    const shuffledExercises = this.getShuffledList(listOfExercises);
    const newExercisesList = [...shuffledExercises.slice(0, this.workoutRoundExercises.getNumberOfExercisesInRound())];
    const newExercisesListLen = newExercisesList.length;

    for (let i = 0; i < newExercisesListLen; i++) {
      const currentExercise = newExercisesList[i];
      const pairExerciseId = currentExercise.pair;
      exercisesList.add(currentExercise);

      if (pairExerciseId) {
        exercisesList.add(shuffledExercises[this.getExerciseIndexInList(shuffledExercises, pairExerciseId)]);
      }
    }

    const finalExercisesList = Array.from(exercisesList);
    finalExercisesList.length = this.workoutRoundExercises.getNumberOfExercisesInRound();

    return new Set([...finalExercisesList]);
  }

  protected getShuffledList(list: IExercise[]): IExercise[] {
    return list.sort(() => Math.random() - 0.5);
  }

  protected getExerciseIndexInList(exercisesList: IExercise[], findId: string): number {
    return exercisesList.findIndex((el: IExercise, index: number) => {
      if (el.id === findId) return index;
    });
  }

  protected addCardioExercisesToList(exercisesList: Set<IExercise>, position: number = 2): Set<IExercise> {
    const arr = Array.from(exercisesList);
    const arrLen = arr.length;
    const shuffledCardioList = this.getShuffledList(this.workoutRoundExercises.getCardioExercisesList());
    let addingToPosition = 0;

    for (let i = 0; i < arrLen + addingToPosition; i = i + position) {
      addingToPosition++;
      arr.splice(i, 0, shuffledCardioList[i]);
    }

    return new Set([ ...arr.slice(0, arrLen)]);
  }
}