import WorkoutCreatorService from "./WorkoutCreatorService";
import { IWorkoutSettings } from "../../interfaces_deprecated/IWorkoutSettings";
import HIITWorkoutSessionService from "../WorkoutSessionService/HIITWorkoutSessionService";
import {WorkoutSessionFields} from "../WorkoutSessionService/WorkoutSessionFields";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";
import HIITRoundBuilderService from "../RoundBuilderService/HIITRoundBuilderService";
import IRound from "../../models/Round/IRound";
import {TValues} from "../../interfaces_deprecated/TValues";
import {EBodyParts} from "../../data/bodyPartsForWorkout";
import IExercise from "../../models/Exercise/IExercise";

export default class HIITWorkoutCreatorService extends WorkoutCreatorService {
  private roundBuilder: HIITRoundBuilderService = new HIITRoundBuilderService();
  workoutSession: HIITWorkoutSessionService;

  constructor(props: IWorkoutSettings) {
    super(props);

    this.workoutSession = new HIITWorkoutSessionService(props);
  }

  generateWorkoutRounds(workoutSession: IWorkoutSession): IRound[] {
    const {
      roundsLength
    } = workoutSession;
    if (roundsLength === 0) throw new Error();

    const bodyPartsIdForEachRound = this.generateBodyParts(roundsLength);

    return this.roundBuilder.generate(workoutSession, bodyPartsIdForEachRound);
  }

  generateWorkout(): void {
    this.workoutSession.updateValue(WorkoutSessionFields.rounds, this.generateWorkoutRounds(this.workoutSession.getValues()));
  }

  updateCurrentWorkoutSession(field: WorkoutSessionFields, value: any): void {
    this.workoutSession.updateValue(field, value);
  }

  getCurrentWorkoutSession(): IWorkoutSession {
    return this.workoutSession.getValues();
  }

  updateCurrentWorkoutSessionRoundExercise(roundIndex: number, exInd: number, exercise: IExercise): void {
    this.workoutSession.updateRoundExerciseValue(roundIndex, exInd, exercise);
  }

  updateCurrentWorkoutSessionRound(roundIndex: number, bodyPartName: TValues<typeof EBodyParts>): void {
    this.workoutSession.updateRoundBodyPart(roundIndex, bodyPartName);
    // TODO: is this should be here??????
    this.workoutSession.updateRoundExercises(roundIndex, this.roundBuilder.generateRoundExercises(this.workoutSession, bodyPartName));
  }
}