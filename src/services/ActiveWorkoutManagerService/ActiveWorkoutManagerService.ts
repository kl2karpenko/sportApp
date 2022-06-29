import IWorkoutSession from "../../interfaces/IWorkoutSession";
import { IActiveWorkoutManagerService } from "./IActiveWorkoutManagerService";
import { IActiveWorkoutState } from "./IActiveWorkoutState";

export default class ActiveWorkoutManagerService {
  private workoutSession: IWorkoutSession;

  constructor(props: IActiveWorkoutManagerService) {
    this.workoutSession = props.workoutSession;
  }

  public moveToNextStep(activeWorkoutState: IActiveWorkoutState): IActiveWorkoutState {
    const { isResting, activeExerciseIndex, activeRoundIndex } = activeWorkoutState;
    const { roundsLength, exercisesLength } = this.workoutSession;

    // set to rest if it was not resting before
    if (!isResting) {
      return {
        ...activeWorkoutState,
        isResting: true,
        isEnded: false
      }
    }

    const isRoundOver = activeExerciseIndex === exercisesLength - 1;

    // set next exercise if we were resting before
    if (!isRoundOver) {
      return {
        ...activeWorkoutState,
        activeExerciseIndex: activeExerciseIndex + 1,
        isResting: false,
        isEnded: false
      };
    }

    // set next round and exercise to 0 if we were resting before
    return {
      ...activeWorkoutState,
      activeRoundIndex: activeRoundIndex + 1,
      activeExerciseIndex: 0,
      isResting: false,
      isEnded: false
    };
  }

  public moveToPreviousStep(activeWorkoutState: IActiveWorkoutState) {
    const { isResting, activeExerciseIndex, activeRoundIndex } = activeWorkoutState;
    const { roundsLength, exercisesLength } = this.workoutSession;

    if (isResting) {
      return {
        ...activeWorkoutState,
        isResting: false
      };
    }

    // move to previous exercise if it is not 1 one
    if (activeExerciseIndex !== 0) {
      return {
        ...activeWorkoutState,
        activeExerciseIndex: activeExerciseIndex - 1,
        isResting: true
      };
    }

    // move to previous round if this is not the first round, last exercise
    if (activeRoundIndex !== 0) {
      return {
        ...activeWorkoutState,
        activeExerciseIndex: exercisesLength - 1,
        activeRoundIndex: activeRoundIndex - 1,
        isResting: true
      }
    }

    return activeWorkoutState;
  }

  public getIntervalForTimer(activeWorkoutState: IActiveWorkoutState) {
    const { exerciseDuration, betweenRoundsDuration, restDuration } = this.workoutSession;

    if (this.isRestBetweenExercises(activeWorkoutState)) {
      return restDuration;
    }

    if (this.isRestBetweenRounds(activeWorkoutState)) {
      return betweenRoundsDuration;
    }

    return exerciseDuration;
  }

  public getDateForTimer(activeWorkoutState: IActiveWorkoutState) {
    const newInterval = this.getIntervalForTimer(activeWorkoutState);
    const time = new Date();
    time.setSeconds(time.getSeconds() + newInterval);
    return time;
  }

  public isRestBetweenExercises = (activeWorkoutState: IActiveWorkoutState): boolean => {
    const { isResting, activeExerciseIndex, activeRoundIndex } = activeWorkoutState;
    const { exercisesLength } = this.workoutSession;

    return isResting && activeExerciseIndex !== exercisesLength - 1;
  }

  public isRestBetweenRounds = (activeWorkoutState: IActiveWorkoutState): boolean => {
    const { isResting, activeExerciseIndex, activeRoundIndex } = activeWorkoutState;
    const { roundsLength, exercisesLength } = this.workoutSession;

    return isResting && activeExerciseIndex === exercisesLength - 1 && activeRoundIndex !== roundsLength - 1;
  }
}