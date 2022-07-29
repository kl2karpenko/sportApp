import WorkoutBuilderService, { IWorkoutBuilderServiceConfig } from "./WorkoutBuilderService";
import HIITRoundBuilderService from "../RoundBuilderService/HIITRoundBuilderService";
import IRound from "../../models/Round/IRound";
import { IWorkoutSessionState } from "../../store/workoutSession";
import { TAllExercises } from "../../interfaces/TAllExercises";
import IExercise from "../../models/Exercise/IExercise";

export default class HIITWorkoutBuilderService extends WorkoutBuilderService {
  private roundBuilder: HIITRoundBuilderService = new HIITRoundBuilderService();

  generateWorkoutRounds(props: IWorkoutBuilderServiceConfig): Partial<IRound>[] {
    return this.roundBuilder.generate(props);
  }

  generateWorkout(workoutSession: IWorkoutSessionState, exercises: TAllExercises, cardioExercises: Partial<IExercise>[]): Partial<IRound>[] {
    const {
      roundsLength,
    } = workoutSession;
    if (roundsLength === 0) throw new Error();

    const bodyPartsIdForEachRound = this.generateBodyParts(roundsLength);

    return this.generateWorkoutRounds({ workoutSession, bodyPartsIdForEachRound, exercises, cardioExercises });
  }
}