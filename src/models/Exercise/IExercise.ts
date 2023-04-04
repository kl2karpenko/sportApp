export default interface IExercise {
  id: string;
  label: string;
  isCardio?: boolean;
  img?: string;
  double?: boolean;
  video?: string;
  description?: string;
}