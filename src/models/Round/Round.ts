import IRound from "./IRound";
import IExercise from "../Exercise/IExercise";
import {TValues} from "../../interfaces_deprecated/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";

export default class Round implements IRound {
  bodyId: TValues<typeof EBodyParts>;
  isActive: boolean = false;
  exercisesList: Set<IExercise>;
  restDuration: number;
  workDuration: number;

  constructor(props: {
    exercisesList: Set<IExercise>;
    bodyId: TValues<typeof EBodyParts>;
    restDuration: number;
    workDuration: number
  }) {
    this.bodyId = props.bodyId;
    this.restDuration = props.restDuration;
    this.workDuration = props.workDuration;
    this.exercisesList = props.exercisesList;
  }

  public getExercisesLength(): number {
    return this.exercisesList.size;
  }

  public getExerciseByIndex(exIndex: number): IExercise {
    const list = Array.from(this.exercisesList);

    return list[exIndex];
  }

  public updateBodyId(bodyPartName: TValues<typeof EBodyParts>): void {
    this.bodyId = bodyPartName;
  }

  public updateExercises(exercises: Set<IExercise>): void {
    this.exercisesList = exercises;
  }

  public updateExerciseByIndex(exIndex: number, exercise: IExercise): void {
    const list = Array.from(this.exercisesList);

    const newList = [...list];
    newList[exIndex] = exercise;

    this.exercisesList = new Set([...newList]);
  }
}