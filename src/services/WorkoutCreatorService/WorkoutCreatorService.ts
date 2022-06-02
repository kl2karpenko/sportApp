import IWorkoutCreatorService from "./IWorkoutCreatorService";
import {TValues} from "../../interfaces_deprecated/TValues";
import {EBodyParts} from "../../data/bodyPartsForWorkout";
import {IBodyParts} from "../../models/BodyParts/IBodyParts";
import BodyParts from "../../models/BodyParts/BodyParts";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";
import WorkoutSessionService from "../WorkoutSessionService/WorkoutSessionService";
import {IWorkoutSettings} from "../../interfaces_deprecated/IWorkoutSettings";
import {WorkoutSessionFields} from "../WorkoutSessionService/WorkoutSessionFields";
import IExercise from "../../models/Exercise/IExercise";
import IWorkoutSessionService from "../WorkoutSessionService/IWorkoutSessionService";

export default class WorkoutCreatorService implements IWorkoutCreatorService {
  private bodyParts: IBodyParts = new BodyParts();
  workoutSession: IWorkoutSessionService;

  constructor(props: IWorkoutSettings) {
    this.workoutSession = new WorkoutSessionService(props);
  }

  generateWorkout(): void {}
  updateCurrentWorkoutSession(field: WorkoutSessionFields, value: any): void {}
  updateCurrentWorkoutSessionRoundExercise(roundIndex: number, exInd: number, exercise: IExercise): void {}
  updateCurrentWorkoutSessionRound(roundIndex: number, bodyPartName: TValues<typeof EBodyParts>): void {}

  generateBodyParts(roundsLength: number): TValues<typeof EBodyParts>[] {
    if (roundsLength === 0) return [];
    const sortedList = this.bodyParts.getList().sort(() => Math.random() - 0.5);
    return sortedList.slice(0, roundsLength)
  }

  getBodyParts(): TValues<typeof EBodyParts>[] {
    return this.bodyParts.getList();
  }

  getBodyPartLabel(bodyName: TValues<typeof EBodyParts>): string {
    return this.bodyParts.getLabelBy(bodyName);
  }

  getCurrentWorkoutSession(): IWorkoutSession {
    return this.workoutSession.getValues();
  }
}