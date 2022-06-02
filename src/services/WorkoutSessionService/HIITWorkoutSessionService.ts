import WorkoutSessionService from "./WorkoutSessionService";
import IWorkoutSession from "./IWorkoutSession";
import HIITRound from "../../models/Round/HIITRound";
import IExercise from "../../models/Exercise/IExercise";
import {TValues} from "../../interfaces_deprecated/TValues";
import {EBodyParts} from "../../data/bodyPartsForWorkout";
import Exercise from "../../models/Exercise/Exercise";

export default class HIITWorkoutSessionService extends WorkoutSessionService {
  rounds: HIITRound[] = [];

  getValues(): IWorkoutSession {
    return {
      rounds: this.rounds,
      roundsLength: this.roundsLength,
      activeRoundIndex: this.activeRoundIndex,
      restDuration: this.restDuration,
      betweenRoundsDuration: this.betweenRoundsDuration,
      exerciseDuration: this.exerciseDuration,
      exercisesLength: this.exercisesLength,
      activeExerciseIndex: this.activeExerciseIndex
    };
  }

  updateRoundBodyPart(index: number, bodyPartName: TValues<typeof EBodyParts>): void {
    const round = this.getRoundByIndex(index);

    round.updateBodyId(bodyPartName);
  }

  updateRoundExerciseValue(roundIndex: number, exInd: number, exercise: IExercise): void {
    const round = this.getRoundByIndex(roundIndex);

    round.updateExerciseByIndex(exInd, new Exercise(exercise));
  }

  updateRoundExercises(roundIndex: number, exercises: Set<IExercise>): void {
    const round = this.getRoundByIndex(roundIndex);

    round.updateExercises(exercises)
  }
}