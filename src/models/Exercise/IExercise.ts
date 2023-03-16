export default interface IExercise {
  id: string;
  label: string;
  isCardio: boolean;
  img?: string;
  pair?: string;
  video?: string;
  description?: string;
}