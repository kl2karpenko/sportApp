import IExercise from "./IExercise";

export default class Exercise implements IExercise {
  id: string;
  label: string;
  isCardio: boolean;
  pair?: string;
  video?: string;

  constructor(props: IExercise) {
    this.id = props.id;
    this.label = props.label;
    this.isCardio = props.isCardio;
    this.pair = props.pair;
    this.video = props.video;
  }
}