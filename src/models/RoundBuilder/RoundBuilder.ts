import workoutTypes from "../../data/workoutTypesList";
import IExercise from "../Exercise/IExercise";
import RandomizerService from "../../services/RandomizerService";

export default class RoundBuilder {
  public randomizer: RandomizerService = new RandomizerService();
  public exercisesList: { [key: string]: IExercise[] } = workoutTypes;

  public generateRandomRound(exercisesLen: number) {
    return [];
  }
}