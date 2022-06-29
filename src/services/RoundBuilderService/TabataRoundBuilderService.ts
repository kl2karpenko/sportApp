import RoundBuilderService from "./RoundBuilderService";
import IWorkoutSession from "../../interfaces/IWorkoutSession";
import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";
import IExercise from "../../models/Exercise/IExercise";
import WorkoutExercisesGeneratorService from "../WorkoutExercisesGeneratorService/WorkoutExercisesGeneratorService";
import { WorkoutAlgorithms } from "../WorkoutExercisesGeneratorService/WorkoutAlgorithms";

export default class TabataRoundBuilderService extends RoundBuilderService {
  public generate(workoutSession: IWorkoutSession, bodyPartsIdForEachRound: TValues<typeof EBodyParts>[]): Partial<IRound>[] {
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

  public generateRoundExercises(workoutSession: IWorkoutSession, bodyPartName: TValues<typeof EBodyParts>): IExercise[] {
    const workoutExercisesGenerator: WorkoutExercisesGeneratorService = new WorkoutExercisesGeneratorService(2, bodyPartName);

    const [ ex1, ex2 ] = workoutExercisesGenerator.getExercisesList(WorkoutAlgorithms.simple);
    return [ex1, ex1, ex1, ex1, ex2, ex2, ex2, ex2];
  }

  public generateRound(workoutSession: IWorkoutSession, bodyPartName: TValues<typeof EBodyParts>): Partial<IRound> {
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