import RoundBuilder from "./RoundBuilder";
import { IBodyPartsForWorkout } from "../../interfaces/IBodyPartsForWorkout";
import { setupExerciseWithPairIfNeeded } from "../../helpers/workoutHelpers";

export default class HIITRoundBuilder extends RoundBuilder {
  public generateExercises(exercisesLen: number, bodyPartName: string): IBodyPartsForWorkout[] {
    const listOfExercisesForThisBodyPart = this.exercisesList[bodyPartName as string];
    const lenOfAllExercises = listOfExercisesForThisBodyPart.length;
    let randomListOfExercises: IBodyPartsForWorkout[] = [];

    if (listOfExercisesForThisBodyPart && lenOfAllExercises && lenOfAllExercises >= exercisesLen) {
      while (randomListOfExercises.length < exercisesLen) {
        setupExerciseWithPairIfNeeded(listOfExercisesForThisBodyPart, randomListOfExercises, []);
      }
    } else {
      console.log("not enough exercises");
    }

    randomListOfExercises.slice(0, exercisesLen + 1);

    return randomListOfExercises;
  }
}