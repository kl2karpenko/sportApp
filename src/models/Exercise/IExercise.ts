export default interface IExercise {
  id: string;
  label: string;
  isCardio: boolean;
  pair?: string;
  video?: string;
  description?: string;
}