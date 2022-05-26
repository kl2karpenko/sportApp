import workoutTypes from "../../data/workoutTypesList";
import IExercise from "../Exercise/IExercise";
import RandomizerService from "../../services/RandomizerService";
import {IBodyPartsForWorkout} from "../../interfaces/IBodyPartsForWorkout";

export default class RoundBuilder {
  public randomizer: RandomizerService = new RandomizerService();
  public exercisesList: { [key: string]: IExercise[] } = workoutTypes;

  public generateExercises(exercisesLen: number, bodyPartName: string): IBodyPartsForWorkout[] { return []; }
}