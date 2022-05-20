import RandomizerService from "../../services/RandomizerService";
import RoundBuilder from "../Round/RoundBuilder";
import bodyPartsForWorkout from "../../data/bodyPartsForWorkout";

export default class WorkoutBuilder {
  public randomizer: RandomizerService = new RandomizerService();
  public roundBuilder: RoundBuilder | null = null;
  public bodyPartsList: string[] = Object.keys(bodyPartsForWorkout);
}