import IExercise from "../Exercise/IExercise";
import {TValues} from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import Round from "./Round";
import IRound from "./IRound";

export default class HIITRound extends Round implements IRound {
  constructor(props: {
    exercisesList: IExercise[];
    bodyId: TValues<typeof EBodyParts>;
    restDuration: number;
    workDuration: number
  }) {
    super(props);
  }
}