import RoundBuilderService from "./RoundBuilderService";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";
import { TValues } from "../../interfaces_deprecated/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";
import HIITRound from "../../models/Round/HIITRound";
import { WorkoutAlgorithms } from "../WorkoutExercisesGeneratorService/WorkoutAlgorithms";
import WorkoutExercisesGeneratorService from "../WorkoutExercisesGeneratorService/WorkoutExercisesGeneratorService";
import IExercise from "../../models/Exercise/IExercise";

export default class HIITRoundBuilderService extends RoundBuilderService {
  public generate(workoutSession: IWorkoutSession, bodyPartsIdForEachRound: TValues<typeof EBodyParts>[]): IRound[] {
    const {
      roundsLength
    } = workoutSession;
    if (roundsLength <= 0) {
      throw new Error();
    }

    const allRounds: IRound[] = [];

    for (let i = 0; i < roundsLength; i++) {
      allRounds.push(this.generateRound(workoutSession, bodyPartsIdForEachRound[i]));
    }

    return allRounds;
  }

  public generateRoundExercises(workoutSession: IWorkoutSession, bodyPartName: TValues<typeof EBodyParts>): Set<IExercise> {
    const { exercisesLength } = workoutSession;
    const workoutExercisesGenerator: WorkoutExercisesGeneratorService = new WorkoutExercisesGeneratorService(exercisesLength, bodyPartName);

    return workoutExercisesGenerator.getExercisesList(WorkoutAlgorithms.simple);
  }

  public generateRound(workoutSession: IWorkoutSession, bodyPartName: TValues<typeof EBodyParts>): IRound {
    const { exercisesLength, restDuration, exerciseDuration } = workoutSession;

    return new HIITRound({
      bodyId: bodyPartName,
      restDuration,
      workDuration: exerciseDuration,
      exercisesList: this.generateRoundExercises(workoutSession, bodyPartName)
    });
  }
}