import { IWorkoutSettings } from "../../interfaces/IWorkoutSettings";
import { IActiveWorkoutState } from "../ActiveWorkoutManagerService/IActiveWorkoutState";

export interface IWorkoutTimerServiceProps { workoutSettings: IWorkoutSettings; activeWorkoutState: IActiveWorkoutState; substract?: number; }

export class WorkoutTimerService {
  public timeLeft: string = "";

  constructor({ workoutSettings, activeWorkoutState }: IWorkoutTimerServiceProps) {
    this.calculateWorkoutDuration({ workoutSettings, activeWorkoutState });
  }

  calculateWorkoutDuration({ workoutSettings, activeWorkoutState, substract }: IWorkoutTimerServiceProps) {
    const singleExerciseDurationMs = (workoutSettings.exerciseDuration + workoutSettings.restDuration);
    const roundDurationMs = (workoutSettings.exercisesLength * singleExerciseDurationMs + workoutSettings.betweenRoundsDuration);
    const timeLeftMs = workoutSettings.roundsLength * roundDurationMs;
    const secondToSubstract = (singleExerciseDurationMs * (activeWorkoutState.activeExerciseIndex + 1)) + roundDurationMs * (activeWorkoutState.activeRoundIndex + 1)

    this.convertMillisecondsToHoursMinutesSeconds(timeLeftMs - secondToSubstract + (substract || 0) - workoutSettings.betweenRoundsDuration);
  }

  convertMillisecondsToHoursMinutesSeconds = (time: number) => {
    // @ts-ignore
    const hours = Math.floor(time / 3600);
    // @ts-ignore
    const minutes = Math.floor((time % 3600) / 60);
    // @ts-ignore
    const seconds = Math.floor(((time % 360) % 60));
    this.timeLeft = `${hours}h ${minutes}m ${seconds}s`;
  }
}

export default (props: IWorkoutTimerServiceProps) => new WorkoutTimerService(props);