export interface IWorkoutSession {
  round: number;
  exercise: number;
  inProgress: boolean;
  isResting: boolean;
  isDone: boolean;
  url?: string;
}