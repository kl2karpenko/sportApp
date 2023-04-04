import IExercise from "./IExercise";

export default class Exercise implements IExercise {
  id: string;
  label: string;
  isCardio?: boolean;
  img?: string;
  double?: boolean;
  video?: string;

  constructor(props: Partial<IExercise>) {
    this.id = props.id!;
    this.label = props.label!;
    this.img = props.img!;
    this.isCardio = props.isCardio!;
    this.double = props.double;
    this.video = props.video;
  }
}