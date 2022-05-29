import RoundBuilderService from "./RoundBuilderService";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";
import { TValues } from "../../interfaces_deprecated/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";
import IRound from "../../models/Round/IRound";
import HIITRound from "../../models/Round/HIITRound";
import IExercise from "../../models/Exercise/IExercise";

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
    const round: IRound = {
      bodyId: bodyPartName,
      isActive: false,
      restDuration,
      workDuration: exerciseDuration,
      exercisesList: []
    };

    const listOfExercisesForThisBodyPart = this.exercisesList[bodyPartName];
    const allExercisesForThisBodyLen = listOfExercisesForThisBodyPart.length;
    let randomExercises: IExercise[] = [];

    // TODO: move this to the separate logic
    for (let ex = 0; ex < exercisesLength; ex ++) {
      round.exercisesList.push(listOfExercisesForThisBodyPart[this.randomizerService.getRandomInt(1, allExercisesForThisBodyLen - 1)])
      // setupExerciseWithPairIfNeeded(listOfExercisesForThisBodyPart, randomListOfExercises, []);
    }
    // TODO: move this to the separate logic

    console.log(this.cardioExercisesList, this.cardioExercisesListLength, " listOfCardioExercises ");
    console.log(listOfExercisesForThisBodyPart, " listOfExercisesForThisBodyPart ");

    return new HIITRound(round);
  }
}