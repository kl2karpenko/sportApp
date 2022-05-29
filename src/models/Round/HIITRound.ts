import IRound from "./IRound";
import IExercise from "../Exercise/IExercise";
import Exercise from "../Exercise/Exercise";
import {TValues} from "../../interfaces_deprecated/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";

export default class HIITRound implements IRound {
  bodyId: TValues<typeof BodyParts>;
  isActive: boolean = false;
  exercisesList: Exercise[];
  restDuration: number;
  workDuration: number;

  constructor(props: {
    exercisesList: IExercise[];
    bodyId: TValues<typeof BodyParts>;
    restDuration: number;
    workDuration: number
  }) {
    this.bodyId = props.bodyId;
    this.restDuration = props.restDuration;
    this.workDuration = props.workDuration;
    this.exercisesList = props.exercisesList;
  }

  public getExercisesLength(): number {
    return this.exercisesList.length;
  }

  private setIsActive(): void {
    this.isActive = true;
  }
}