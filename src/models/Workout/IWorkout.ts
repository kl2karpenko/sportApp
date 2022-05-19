import IRound from "../Round/IRound";

export default interface IWorkout {
  rounds: IRound[];
  restDuration: number;

  getRounds(): IRound[];
  getRestDuration(): number;
}