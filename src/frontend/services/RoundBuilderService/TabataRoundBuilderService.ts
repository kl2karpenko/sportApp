import RoundBuilderService, { IRoundBuilderServiceConfig } from "./RoundBuilderService";
import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";
import IExercise from "../../models/Exercise/IExercise";
import TabataWorkoutExercisesGeneratorService from "../WorkoutExercisesGeneratorService/TabataWorkoutExercisesGeneratorService";
import { TAllExercises } from "../../interfaces/TAllExercises";
import { IWorkoutSessionState } from "../../store/workoutSession";

export default class TabataRoundBuilderService extends RoundBuilderService {
  public generate(props: IRoundBuilderServiceConfig): Partial<IRound>[] {
    const { workoutSession, bodyPartsIdForEachRound, exercises, cardioExercises } = props;
    const {
      roundsLength
    } = workoutSession;
    if (roundsLength <= 0) {
      throw new Error();
    }

    const allRounds: Partial<IRound>[] = [];
    for (let i = 0; i < roundsLength; i++) {
      allRounds.push(this.generateRound(workoutSession, bodyPartsIdForEachRound[i], exercises, cardioExercises));
    }

    return allRounds;
  }

  public generateRoundExercises(workoutSession: IWorkoutSessionState, bodyPartName: TValues<typeof EBodyParts>, exercises: TAllExercises, cardioExercises: Partial<IExercise>[]): Partial<IExercise>[] {
    const { includeCardio } = workoutSession;
    const workoutExercisesGenerator: TabataWorkoutExercisesGeneratorService = new TabataWorkoutExercisesGeneratorService({ exercisesLength: 2, bodyPartName, exercises, cardioExercises });

    const [ ex1, ex2, cardio ] = workoutExercisesGenerator.getExercisesList({ includeCardio });
    return [ ex1, ex1, ex1, ex1, ex2, ex2, ex2, ex2, cardio ];
  }

  public generateRound(workoutSession: IWorkoutSessionState, bodyPartName: TValues<typeof EBodyParts>, exercises: TAllExercises, cardioExercises: Partial<IExercise>[]): Partial<IRound> {
    const { restDuration, exerciseDuration } = workoutSession;

    return {
      bodyId: bodyPartName,
      restDuration,
      workDuration: exerciseDuration,
      exercisesList: this.generateRoundExercises(workoutSession, bodyPartName, exercises, cardioExercises),
      isActive: false
    };
  }
}