import WorkoutSession from "./WorkoutSession";
import IWorkoutSessionForState from "./IWorkoutSessionForState";

export default class HIITWorkoutSession extends WorkoutSession {
  getValues(): IWorkoutSessionForState {
    return {
      rounds: this.rounds,
      roundsBodyParts: this.roundsBodyParts,
      roundsLength: this.roundsLength,
      activeRoundIndex: this.activeRoundIndex,
      restDuration: this.restDuration,
      betweenRoundsDuration: this.betweenRoundsDuration,
      exerciseDuration: this.exerciseDuration,
      exercisesLength: this.exercisesLength
    };
  }
}