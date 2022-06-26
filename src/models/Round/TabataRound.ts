import IRound from "./IRound";
import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import IExercise from "../Exercise/IExercise";
import Round from "./Round";

export default class TabataRound extends Round implements IRound {
  exerciseRepeatTimes: number;

  constructor(props: {
    // TODO: this should be different for tabata and hiit
    exercisesList: IExercise[];
    exerciseRepeatTimes: number;
    restDuration: number;
    bodyId: TValues<typeof EBodyParts>;
    workDuration: number
  }) {
    super(props);

    this.exerciseRepeatTimes = props.exerciseRepeatTimes;
  }
}