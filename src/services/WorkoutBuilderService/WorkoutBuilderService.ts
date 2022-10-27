import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { IBodyParts } from "../../models/BodyParts/IBodyParts";
import BodyParts from "../../models/BodyParts/BodyParts";
import IWorkoutSession from "../../interfaces/IWorkoutSession";
import IRound from "../../models/Round/IRound";
import { IWorkoutSessionState } from "../../store/workoutSession";
import { TAllExercises } from "../../interfaces/TAllExercises";
import IExercise from "../../models/Exercise/IExercise";

export interface IWorkoutBuilderServiceConfig {
  workoutSession: IWorkoutSessionState;
  bodyPartsIdForEachRound: TValues<typeof EBodyParts>[];
}

export default class WorkoutBuilderService {
  private bodyParts: IBodyParts = new BodyParts();

  generateWorkout(workoutSession: IWorkoutSession): Partial<IRound>[] {
    return [];
  }
  
  generateWorkoutRounds(props: IWorkoutBuilderServiceConfig): Partial<IRound>[] {
    return [];
  }

  generateBodyParts(roundsLength: number, onlyCardio?: boolean): TValues<typeof EBodyParts>[] {
    if (roundsLength === 0) return [];

    if (onlyCardio) {
      return Array(roundsLength).fill("cardio");
    }

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