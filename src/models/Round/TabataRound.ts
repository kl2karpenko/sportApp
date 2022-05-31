import IRound from "./IRound";
import Exercise from "../Exercise/Exercise";
import {TValues} from "../../interfaces_deprecated/TValues";
import {BodyParts} from "../../data/bodyPartsForWorkout";
import IExercise from "../Exercise/IExercise";

export default class TabataRound implements IRound {
  bodyId: TValues<typeof BodyParts>;
  isActive: boolean = false;
  exercisesList: Set<IExercise>;
  restDuration: number;
  workDuration: number;
  exerciseRepeatTimes: number;

  constructor(props: {
    exercisesList: Set<IExercise>;
    exerciseRepeatTimes: number;
    restDuration: number;
    bodyId: TValues<typeof BodyParts>;
    workDuration: number
  }) {
    this.bodyId = props.bodyId;
    this.exerciseRepeatTimes = props.exerciseRepeatTimes;
    this.restDuration = props.restDuration;
    this.workDuration = props.workDuration;
    this.exercisesList = props.exercisesList;
  }

  getExercisesLength(): number {
    return this.exercisesList.size;
  }
}