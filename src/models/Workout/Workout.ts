import IRound from "../Round/IRound";
import IWorkout from "./IWorkout";

// Workout is an entity that held information about the rounds
export default abstract class Workout implements IWorkout {
  rounds: IRound[];
  restDuration: number;

  constructor(rounds: IRound[], restDuration: number) {
    this.rounds = rounds;
    this.restDuration = restDuration;
  }

  abstract getRounds(): IRound[];
  abstract getRestDuration(): number;
}