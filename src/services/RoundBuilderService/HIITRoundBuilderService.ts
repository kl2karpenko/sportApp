import RoundBuilderService from "./RoundBuilderService";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";
import { TValues } from "../../interfaces_deprecated/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";
import HIITRound from "../../models/Round/HIITRound";
import HIITWorkoutAlgorithmService from "../WorkoutAlgorithmService/HIITWorkoutAlgorithmService";
import {WorkoutAlgorithms} from "../WorkoutAlgorithmService/WorkoutAlgorithms";

export default class HIITRoundBuilderService extends RoundBuilderService {
  public generate(workoutSession: IWorkoutSession, bodyPartsIdForEachRound: TValues<typeof BodyParts>[]): IRound[] {
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

    console.log(allRounds, " allRounds");

    return allRounds;
  }

  private generateRound(workoutSession: IWorkoutSession, bodyPartName: TValues<typeof BodyParts>): IRound {
    const { exercisesLength, restDuration, exerciseDuration } = workoutSession;
    const hiitAlgorithmService: HIITWorkoutAlgorithmService = new HIITWorkoutAlgorithmService(exercisesLength, bodyPartName);

    return new HIITRound({
      bodyId: bodyPartName,
      restDuration,
      workDuration: exerciseDuration,
      exercisesList: hiitAlgorithmService.getExercisesList(WorkoutAlgorithms.simple)
    });
  }
}