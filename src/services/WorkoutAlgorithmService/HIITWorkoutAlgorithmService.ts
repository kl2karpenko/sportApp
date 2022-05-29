import {WorkoutAlgorithms} from "./WorkoutAlgorithms";
import IExercise from "../../models/Exercise/IExercise";
import WorkoutAlgorithmService from "./WorkoutAlgorithmService";

export default class HIITWorkoutAlgorithmService extends WorkoutAlgorithmService {
  getExercisesList(algorithm: WorkoutAlgorithms): IExercise[] {
    switch (algorithm) {
    case WorkoutAlgorithms.simple:
      return this.getExercisesListForSimpleAlgorithm();
    case WorkoutAlgorithms.noRepeat:
      return this.getExercisesListForNoRepeatAlgorithm();
    default:
      return [];
    }
  }

  protected getExercisesListForSimpleAlgorithm(): IExercise[] {
    if (this.exercisesLength === 0) return [];
    const exercisesList: IExercise[] = [];

    for (let ex = 0; ex < this.exercisesLength; ex ++) {
      exercisesList.push(this.getRandomExercise())
    }

    return exercisesList;
  }

  protected getExercisesListForNoRepeatAlgorithm(): IExercise[] {
    if (this.exercisesLength === 0) return [];
    const exercisesList: IExercise[] = [];

    for (let ex = 0; ex < this.exercisesLength; ex ++) {
      try {
        const randomExercise = this.generateExclusiveExercise(exercisesList);
        exercisesList.push(randomExercise)
      } catch (e) {
        exercisesList.push(this.getRandomExercise());
        // throw e;
      }
    }

    return exercisesList;
  }

  protected generateExclusiveExercise(exercisesList: IExercise[]): IExercise {
    let repeatsLen = 0;

    while (repeatsLen < this.allExercisesForThisBodyLen) {
      const randomExercise = this.getRandomExercise();

      if (!exercisesList.includes(randomExercise)) {
        return randomExercise;
      }
      repeatsLen++;
    }

    throw Error("Cannot generate an exclusive exercise");
  }

  protected getRandomExercise(): IExercise {
    return this.listOfExercisesForCurrentBodyPart[this.randomizerService.getRandomInt(1, this.allExercisesForThisBodyLen - 1)];
  }

  protected checkIfExerciseAlreadyInTheList(exercise: IExercise, exercisesList: IExercise[]): boolean {
    return exercisesList.includes(exercise);
  }
}