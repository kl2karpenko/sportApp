import IRound from "./IRound";
import IExercise from "../Exercise/IExercise";
import Exercise from "../Exercise/Exercise";

export default abstract class TabataRound implements IRound {
  isActive: boolean = false;
  exercisesList: Exercise[];
  restDuration: number;
  workDuration: number;
  exerciseRepeatTimes: number;

  constructor(props: {
    exercisesList: Exercise[];
    exerciseRepeatTimes: number;
    restDuration: number;
    workDuration: number
  }) {
    this.exerciseRepeatTimes = props.exerciseRepeatTimes;
    this.restDuration = props.restDuration;
    this.workDuration = props.workDuration;
    this.exercisesList = props.exercisesList;
  }

  getExercisesLength(): number {
    return this.exercisesList.length;
  }
}