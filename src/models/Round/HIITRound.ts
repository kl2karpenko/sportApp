import IRound from "./IRound";
import IExercise from "../Exercise/IExercise";
import Exercise from "../Exercise/Exercise";

export default abstract class HIITRound implements IRound {
  bodyPart: string;
  isActive: boolean = false;
  exercisesList: Exercise[];
  restDuration: number;
  workDuration: number;

  constructor(props: {
    exercisesList: Exercise[];
    bodyPart: string;
    restDuration: number;
    workDuration: number
  }) {
    this.bodyPart = props.bodyPart;
    this.restDuration = props.restDuration;
    this.workDuration = props.workDuration;
    this.exercisesList = props.exercisesList;
  }

  getExercisesLength(): number {
    return this.exercisesList.length;
  }
}