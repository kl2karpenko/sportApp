import WorkoutSessionService from "./WorkoutSessionService";
import IWorkoutSession from "./IWorkoutSession";

export default class HIITWorkoutSessionService extends WorkoutSessionService {
  getValues(): IWorkoutSession {
    return {
      rounds: this.rounds,
      roundsLength: this.roundsLength,
      activeRoundIndex: this.activeRoundIndex,
      restDuration: this.restDuration,
      betweenRoundsDuration: this.betweenRoundsDuration,
      exerciseDuration: this.exerciseDuration,
      exercisesLength: this.exercisesLength
    };
  }
}