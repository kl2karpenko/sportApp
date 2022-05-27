import RandomizerService from "../../services/RandomizerService";
import RoundBuilder from "../RoundBuilder/RoundBuilder";
import { TValues } from "../../interfaces/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";

export interface IWorkoutBuilder {
  randomizer: RandomizerService;
  roundBuilder: RoundBuilder;
  bodyPartsList: TValues<typeof BodyParts>[];
  bodyPartsListLabels: { [key in TValues<typeof BodyParts>]: string };

  getLabelForBodyList(bodyName: TValues<typeof BodyParts>): string;
}