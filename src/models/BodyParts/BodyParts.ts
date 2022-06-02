import { TValues } from "../../interfaces_deprecated/TValues";
import bodyPartsForWorkout, {EBodyParts} from "../../data/bodyPartsForWorkout";
import { IBodyParts } from "./IBodyParts";

export default class BodyParts implements IBodyParts {
  private list: TValues<typeof EBodyParts>[] = Object.keys(bodyPartsForWorkout) as TValues<typeof EBodyParts>[];
  private labels: { [key in TValues<typeof EBodyParts>]: string } = bodyPartsForWorkout;

  getLabelBy(bodyName: TValues<typeof EBodyParts>): string {
    return this.labels[bodyName];
  }

  getList(): TValues<typeof EBodyParts>[] {
    return this.list;
  }

  getLabels(bodyName: TValues<typeof EBodyParts>): string {
    return this.labels[bodyName];
  }
}