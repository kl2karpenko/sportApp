import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { IBodyParts } from "../../models/BodyParts/IBodyParts";
import BodyParts from "../../models/BodyParts/BodyParts";
import IWorkoutSession from "../../interfaces/IWorkoutSession";
import IRound from "../../models/Round/IRound";

export default class WorkoutBuilderService {
  private bodyParts: IBodyParts = new BodyParts();

  generateWorkout(workoutSession: IWorkoutSession): Partial<IRound>[] {
    return [];
  }

  generateBodyParts(roundsLength: number): TValues<typeof EBodyParts>[] {
    if (roundsLength === 0) return [];
    const sortedList = this.bodyParts.getList().sort(() => Math.random() - 0.5);
    return sortedList.slice(0, roundsLength);
  }

  getBodyParts(): TValues<typeof EBodyParts>[] {
    return this.bodyParts.getList();
  }

  getBodyPartLabel(bodyName: TValues<typeof EBodyParts>): string {
    return this.bodyParts.getLabelBy(bodyName);
  }
}