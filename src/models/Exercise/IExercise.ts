export default interface IExercise {
  index: number;
  id: string;
  duration: number;
  isCardio: boolean;
  pairExercise?: string;
  video?: string;
}