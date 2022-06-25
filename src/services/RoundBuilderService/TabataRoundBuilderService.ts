import RoundBuilderService from "./RoundBuilderService";
import IWorkoutSession from "../../interfaces/IWorkoutSession";
import { TValues } from "../../interfaces_deprecated/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";
import IExercise from "../../models/Exercise/IExercise";
import WorkoutExercisesGeneratorService from "../WorkoutExercisesGeneratorService/WorkoutExercisesGeneratorService";
import {WorkoutAlgorithms} from "../WorkoutExercisesGeneratorService/WorkoutAlgorithms";
import TabataRound from "../../models/Round/TabataRound";

export default class TabataRoundBuilderService extends RoundBuilderService {
  public generate(workoutSession: IWorkoutSession, bodyPartsIdForEachRound: TValues<typeof EBodyParts>[]): IRound[] { return []; }

  public generateRoundExercises(workoutSession: IWorkoutSession, bodyPartName: TValues<typeof EBodyParts>): IExercise[] {
    const { exercisesLength } = workoutSession;
    const workoutExercisesGenerator: WorkoutExercisesGeneratorService = new WorkoutExercisesGeneratorService(exercisesLength, bodyPartName);

    return workoutExercisesGenerator.getExercisesList(WorkoutAlgorithms.simple)
  }

  public generateRound(workoutSession: IWorkoutSession, bodyPartName: TValues<typeof EBodyParts>): IRound {
    const { exercisesLength, restDuration, exerciseDuration } = workoutSession;
    const workoutExercisesGenerator: WorkoutExercisesGeneratorService = new WorkoutExercisesGeneratorService(exercisesLength, bodyPartName);

    return new TabataRound({
      bodyId: bodyPartName,
      restDuration,
      workDuration: exerciseDuration,
      exerciseRepeatTimes: 8,
      exercisesList: this.generateRoundExercises(workoutSession, bodyPartName)
    });
  }
}