import RoundBuilderService, { IRoundBuilderServiceConfig } from "./RoundBuilderService";
import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";
import { WorkoutAlgorithms } from "../WorkoutExercisesGeneratorService/WorkoutAlgorithms";
import HIITWorkoutExercisesGeneratorService from "../WorkoutExercisesGeneratorService/HIITWorkoutExercisesGeneratorService";
import IExercise from "../../models/Exercise/IExercise";
import { IWorkoutSessionState } from "../../store/workoutSession";
import { TAllExercises } from "../../interfaces/TAllExercises";

export default class HIITRoundBuilderService extends RoundBuilderService {
  public generate(props: IRoundBuilderServiceConfig): Partial<IRound>[] {
    const { workoutSession, bodyPartsIdForEachRound } = props;
    const {
      roundsLength
    } = workoutSession;

    if (roundsLength <= 0) {
      throw new Error();
    }

    const allRounds: Partial<IRound>[] = [];

    for (let i = 0; i < roundsLength; i++) {
      allRounds.push(this.generateRound(workoutSession, bodyPartsIdForEachRound[i]));
    }

    return allRounds;
  }

  public generateRoundExercises(workoutSession: IWorkoutSessionState, bodyPartName: TValues<typeof EBodyParts>): Partial<IExercise>[] {
    const { exercisesLength, includeCardio, cardioStep, allExercises, allExercises: { cardio: cardioExercises }, workoutType } = workoutSession;
    const exercises = allExercises[workoutType];
    const workoutExercisesGenerator: HIITWorkoutExercisesGeneratorService = new HIITWorkoutExercisesGeneratorService({ exercisesLength: exercisesLength, bodyPartName, exercises, cardioExercises });

    return workoutExercisesGenerator.getExercisesList({ algorithm: WorkoutAlgorithms.simple, includeCardio, cardioStep });
  }

  public generateRound(workoutSession: IWorkoutSessionState, bodyPartName: TValues<typeof EBodyParts>): Partial<IRound> {
    const { restDuration, exerciseDuration } = workoutSession;

    return {
      bodyId: bodyPartName,
      restDuration,
      workDuration: exerciseDuration,
      exercisesList: this.generateRoundExercises(workoutSession, bodyPartName),
      isActive: false
    };
  }
}