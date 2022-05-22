import RandomizerService from "../../services/RandomizerService";
import RoundBuilder from "../Round/RoundBuilder";
import bodyPartsForWorkout, { BodyParts } from "../../data/bodyPartsForWorkout";
import { TValues } from "../../interfaces/TValues";

export default class WorkoutBuilder {
  public randomizer: RandomizerService = new RandomizerService();
  public roundBuilder: RoundBuilder | null = null;
  public bodyPartsList: TValues<typeof BodyParts>[] = Object.keys(bodyPartsForWorkout) as TValues<typeof BodyParts>[];
  public bodyPartsListLabels: { [key in TValues<typeof BodyParts>]: string } = bodyPartsForWorkout;

  getLabelForBodyList(bodyName: TValues<typeof BodyParts>): string {
    return this.bodyPartsListLabels[bodyName];
  }
}