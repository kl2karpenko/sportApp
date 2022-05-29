import RandomizerService from "../RandomizerService";
import bodyPartsForWorkout, { BodyParts } from "../../data/bodyPartsForWorkout";
import { TValues } from "../../interfaces_deprecated/TValues";
import { IWorkoutBuilderService } from "./IWorkoutBuilderService";
import { IRandomizerService } from "../RandomizerService/IRandomizerService";
import { IRoundBuilderService } from "../RoundBuilderService/IRoundBuilderService";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";
import IRound from "../../models/Round/IRound";

export default abstract class WorkoutBuilderService implements IWorkoutBuilderService {
  public randomizer: IRandomizerService = new RandomizerService();
  public abstract roundBuilder: IRoundBuilderService;
  public bodyPartsList: TValues<typeof BodyParts>[] = Object.keys(bodyPartsForWorkout) as TValues<typeof BodyParts>[];
  public bodyPartsListLabels: { [key in TValues<typeof BodyParts>]: string } = bodyPartsForWorkout;

  getLabelForBodyList(bodyName: TValues<typeof BodyParts>): string {
    return this.bodyPartsListLabels[bodyName];
  }

  abstract generateWorkout(workoutSession: IWorkoutSession): IRound[];
}