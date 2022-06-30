import IExercise from "../../models/Exercise/IExercise";
import { WorkoutAlgorithms } from "./WorkoutAlgorithms";
import WorkoutExercisesGeneratorService from "./WorkoutExercisesGeneratorService";

export interface IHiitWorkoutGetExercisesListConfig {
  includeCardio?: boolean;
  cardioStep?: number;
  algorithm?: WorkoutAlgorithms;
}

export default class HIITWorkoutExercisesGeneratorService extends WorkoutExercisesGeneratorService {
  public getExercisesList(props: IHiitWorkoutGetExercisesListConfig = { includeCardio: true, cardioStep: 2, algorithm: WorkoutAlgorithms.simple }): IExercise[] {
    switch (props?.algorithm) {
    case WorkoutAlgorithms.simple:
      return this.getExercisesListForSimpleAlgorithm(props);
    case WorkoutAlgorithms.withPair:
      return this.getExercisesListForWithPairAlgorithm(props);
    default:
      return [];
    }
  }

  protected getExercisesListForSimpleAlgorithm(props: IHiitWorkoutGetExercisesListConfig): IExercise[] {
    const listOfExercises = this.listOfExercisesForCurrentBodyPart;
    if (listOfExercises.length === 0) return [];

    const shuffledExercises = this.getShuffledList(listOfExercises);
    let allExercises = [ ...shuffledExercises ];
    
    if (props?.includeCardio) {
      allExercises = this.addCardioExercisesToList(allExercises, props?.cardioStep);
    }

    allExercises.length = this.exercisesInRoundLength;

    return allExercises;
  }

  protected getExercisesListForWithPairAlgorithm(props: IHiitWorkoutGetExercisesListConfig): IExercise[] {
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

    if (props?.includeCardio) {
      exercisesList = this.addCardioExercisesToList(exercisesList, props?.cardioStep);
    }

    exercisesList.length = this.exercisesInRoundLength;

    return exercisesList;
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