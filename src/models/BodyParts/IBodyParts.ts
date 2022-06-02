import {TValues} from "../../interfaces_deprecated/TValues";
import {EBodyParts} from "../../data/bodyPartsForWorkout";

export interface IBodyParts {
  getLabelBy(bodyName: TValues<typeof EBodyParts>): string;
  getList(): TValues<typeof EBodyParts>[];
  getLabels(bodyName: TValues<typeof EBodyParts>): string;
}