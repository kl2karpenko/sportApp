import IRound from "../Round/IRound";
import Workout from "./Workout";

// Workout is an entity that held information about the rounds
export default class WorkoutTabata extends Workout {
  constructor(rounds: IRound[], restDuration: number) {
    super(rounds, restDuration);
  }

  getRounds(): IRound[] {
    return this.rounds;
  }

  getRestDuration(): number {
    return this.restDuration;
  }
}