import RandomizerService from "../../services/RandomizerService";
import IExercise from "../Exercise/IExercise";
import { IBodyPartsForWorkout } from "../../interfaces/IBodyPartsForWorkout";

export interface IRoundBuilder {
  randomizer: RandomizerService;
  exercisesList: { [key: string]: IExercise[] };

  generateExercises(exercisesLen: number, bodyPartName: string): IBodyPartsForWorkout[];
}