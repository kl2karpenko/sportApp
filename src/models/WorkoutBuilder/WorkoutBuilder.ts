import RandomizerService from "../../services/RandomizerService";
import bodyPartsForWorkout, { BodyParts } from "../../data/bodyPartsForWorkout";
import { TValues } from "../../interfaces/TValues";
import { IWorkoutBuilder } from "./IWorkoutBuilder";
import { IRandomizerService } from "../../services/IRandomizerService";
import { IRoundBuilder } from "../RoundBuilder/IRoundBuilder";

export default abstract class WorkoutBuilder implements IWorkoutBuilder {
  public randomizer: IRandomizerService = new RandomizerService();
  public abstract roundBuilder: IRoundBuilder;
  public bodyPartsList: TValues<typeof BodyParts>[] = Object.keys(bodyPartsForWorkout) as TValues<typeof BodyParts>[];
  public bodyPartsListLabels: { [key in TValues<typeof BodyParts>]: string } = bodyPartsForWorkout;

  getLabelForBodyList(bodyName: TValues<typeof BodyParts>): string {
    return this.bodyPartsListLabels[bodyName];
  }
}