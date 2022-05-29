import {WorkoutAlgorithms} from "./WorkoutAlgorithms";
import IExercise from "../../models/Exercise/IExercise";
import WorkoutAlgorithmService from "./WorkoutAlgorithmService";
import {TValues} from "../../interfaces_deprecated/TValues";
import {BodyParts} from "../../data/bodyPartsForWorkout";

export default class HIITWorkoutAlgorithmService extends WorkoutAlgorithmService {
  getExercisesList(algorithm: WorkoutAlgorithms, exercisesLength: number, bodyPartName: TValues<typeof BodyParts>): IExercise[] {
    if (exercisesLength === 0) return [];

    switch (algorithm) {
    case WorkoutAlgorithms.simple:
      return this.getExercisesListForSimpleAlgorithm(exercisesLength);
    case WorkoutAlgorithms.noRepeat:
      return this.getExercisesListForNoRepeatAlgorithm(exercisesLength);
    default:
      return [];
    }
  }

  protected getExercisesListForSimpleAlgorithm(): IExercise[] {
    const exercisesList: IExercise[] = [];

    for (let ex = 0; ex < this.exercisesLength; ex ++) {
      exercisesList.push(this.listOfExercisesForCurrentBodyPart[this.randomizerService.getRandomInt(1, this.allExercisesForThisBodyLen - 1)])
    }

    return exercisesList;
  }

  protected getExercisesListForNoRepeatAlgorithm(): IExercise[] {
    const exercisesList: IExercise[] = [];

    for (let ex = 0; ex < this.exercisesLength; ex ++) {
      const randomExercise = this.generateExclusiveExercise(exercisesList);

      exercisesList.push(randomExercise);
    }

    return exercisesList;
  }

  protected generateExclusiveExercise(exercisesList: IExercise[]): IExercise {
    let repeatsLen = 0;

    while (repeatsLen < this.allExercisesForThisBodyLen) {
      const randomExercise = this.listOfExercisesForCurrentBodyPart[this.randomizerService.getRandomInt(1, this.allExercisesForThisBodyLen - 1)];

      if (!exercisesList.includes(randomExercise)) {
        return randomExercise;
      }
      repeatsLen++;
    }

    throw Error("Cannot generate an exclusive exercise");
  }

  protected checkIfExerciseAlreadyInTheList(exercise: IExercise, exercisesList: IExercise[]): boolean {
    return exercisesList.includes(exercise);
  }
}