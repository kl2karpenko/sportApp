import IWorkoutSession from "../../interfaces/IWorkoutSession";
import { IActiveWorkoutManagerService } from "./IActiveWorkoutManagerService";
import { IActiveWorkoutState } from "./IActiveWorkoutState";
import IRound from "../../models/Round/IRound";
import IExercise from "../../models/Exercise/IExercise";
import { IWorkoutSessionState } from "../../store/workoutSession";

export default class ActiveWorkoutManagerService {
  private workoutSession: IWorkoutSessionState;

  constructor(props: IActiveWorkoutManagerService) {
    this.workoutSession = props.workoutSession;
  }

  private isWorkoutEnded(activeWorkoutState: IActiveWorkoutState): boolean {
    const { isResting, activeExerciseIndex, activeRoundIndex } = activeWorkoutState;
    const { roundsLength, exercisesLength } = this.workoutSession;
    return (roundsLength - 1) === activeRoundIndex && (activeExerciseIndex === (exercisesLength - 1)) && isResting;
  }

  public moveToNextStep(activeWorkoutState: IActiveWorkoutState): IActiveWorkoutState {
    const { isResting, activeExerciseIndex, activeRoundIndex } = activeWorkoutState;
    const { exercisesLength } = this.workoutSession;
    const isEnded = this.isWorkoutEnded(activeWorkoutState);

    // set to rest if it was not resting before
    if (!isResting) {
      return {
        ...activeWorkoutState,
        isResting: true,
        isEnded
      }
    }

    const isRoundOver = activeExerciseIndex === exercisesLength - 1;

    // set next exercise if we were resting before
    if (!isRoundOver) {
      return {
        ...activeWorkoutState,
        activeExerciseIndex: activeExerciseIndex + 1,
        isResting: false,
        isEnded
      };
    }

    // set next round and exercise to 0 if we were resting before
    return {
      ...activeWorkoutState,
      activeRoundIndex: activeRoundIndex + 1,
      activeExerciseIndex: 0,
      isResting: false,
      isEnded
    };
  }

  public moveToPreviousStep(activeWorkoutState: IActiveWorkoutState) {
    const { isResting, activeExerciseIndex, activeRoundIndex } = activeWorkoutState;
    const { exercisesLength } = this.workoutSession;
    const isEnded = this.isWorkoutEnded(activeWorkoutState);

    if (isResting) {
      return {
        ...activeWorkoutState,
        isResting: false,
        isEnded
      };
    }

    // move to previous exercise if it is not 1 one
    if (activeExerciseIndex !== 0) {
      return {
        ...activeWorkoutState,
        activeExerciseIndex: activeExerciseIndex - 1,
        isResting: true,
        isEnded
      };
    }

    // move to previous round if this is not the first round, last exercise
    if (activeRoundIndex !== 0) {
      return {
        ...activeWorkoutState,
        activeExerciseIndex: exercisesLength - 1,
        activeRoundIndex: activeRoundIndex - 1,
        isResting: true,
        isEnded
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

  public isWorkoutFinished = (activeWorkoutState: IActiveWorkoutState): boolean => {
    const { isEnded } = activeWorkoutState;

    return isEnded;
  }

  public getCurrentRound = (activeWorkoutState: IActiveWorkoutState): Partial<IRound> => {
    const { activeRoundIndex } = activeWorkoutState;

    return this.workoutSession?.rounds[activeRoundIndex] || {};
  }

  public getCurrentRoundExercisesList = (activeWorkoutState: IActiveWorkoutState): Partial<IExercise>[] => {
    return this.getCurrentRound(activeWorkoutState)?.exercisesList || [];
  }

  public getActiveExercise = (activeWorkoutState: IActiveWorkoutState): Partial<IExercise> => {
    const exList = this.getCurrentRoundExercisesList(activeWorkoutState);
    const { activeExerciseIndex } = activeWorkoutState;

    return exList[activeExerciseIndex] || {};
  }

  public getNextExercise = (activeWorkoutState: IActiveWorkoutState): Partial<IExercise> => {
    const exList = this.getCurrentRoundExercisesList(activeWorkoutState);
    const nextExList = this.getNextRoundExercisesList(activeWorkoutState);
    const { activeExerciseIndex } = activeWorkoutState;

    return exList[activeExerciseIndex + 1] || nextExList[0];
  }

  public getNextRound = (activeWorkoutState: IActiveWorkoutState): Partial<IRound> => {
    const { activeRoundIndex } = activeWorkoutState;

    return this.workoutSession?.rounds[activeRoundIndex + 1] || [];
  }

  public getNextRoundExercisesList = (activeWorkoutState: IActiveWorkoutState): Partial<IExercise>[] => {
    return this.getNextRound(activeWorkoutState)?.exercisesList || [];
  }
}