import { IWorkoutSessionState } from "../../store/workoutSession";

export interface IActiveWorkoutManagerService {
  workoutSession: IWorkoutSessionState;
}