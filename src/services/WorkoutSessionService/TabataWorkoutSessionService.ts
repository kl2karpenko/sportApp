import WorkoutSessionService from "./WorkoutSessionService";
import TabataRound from "../../models/Round/TabataRound";
import IWorkoutSession from "./IWorkoutSession";
import IExercise from "../../models/Exercise/IExercise";

export default class TabataWorkoutSessionService extends WorkoutSessionService {
  rounds: TabataRound[] = [];

  getValues(): IWorkoutSession {
    return {
      rounds: this.rounds,
      roundsLength: this.roundsLength,
      activeRoundIndex: this.activeRoundIndex,
      activeExerciseIndex: this.activeExerciseIndex,
      restDuration: this.restDuration,
      betweenRoundsDuration: this.betweenRoundsDuration,
      exerciseDuration: this.exerciseDuration,
      exercisesLength: this.exercisesLength
    };
  }

  getRoundByIndex(index: number): TabataRound {
    return this.rounds[index];
  }

  updateRoundExerciseValue(roundIndex: number, exInd: number, exercise: IExercise): void {
    const round: TabataRound = this.getRoundByIndex(roundIndex);

    // round.updateExerciseByIndex(exInd, exercise)
  }
}