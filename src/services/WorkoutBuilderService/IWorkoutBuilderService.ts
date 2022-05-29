import RandomizerService from "../RandomizerService";
import { TValues } from "../../interfaces_deprecated/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";
import IRound from "../../models/Round/IRound";
import { IRoundBuilderService } from "../RoundBuilderService/IRoundBuilderService";

export interface IWorkoutBuilderService {
  randomizer: RandomizerService;
  roundBuilder: IRoundBuilderService;
  bodyPartsList: TValues<typeof BodyParts>[];
  bodyPartsListLabels: { [key in TValues<typeof BodyParts>]: string };

  getLabelForBodyList(bodyName: TValues<typeof BodyParts>): string;
  generateWorkout(workoutSession: IWorkoutSession): IRound[];
}