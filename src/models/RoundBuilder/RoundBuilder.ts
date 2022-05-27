import workoutTypes from "../../data/workoutTypesList";
import IExercise from "../Exercise/IExercise";
import RandomizerService from "../../services/RandomizerService";
import {IBodyPartsForWorkout} from "../../interfaces/IBodyPartsForWorkout";
import {IRoundBuilder} from "./IRoundBuilder";

export default abstract class RoundBuilder implements IRoundBuilder {
  public randomizer: RandomizerService = new RandomizerService();
  public exercisesList: { [key: string]: IExercise[] } = workoutTypes;

  public abstract generateExercises(exercisesLen: number, bodyPartName: string): IBodyPartsForWorkout[];
}