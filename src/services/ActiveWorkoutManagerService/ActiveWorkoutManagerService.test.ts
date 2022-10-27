import ActiveWorkoutManagerService from "./ActiveWorkoutManagerService";
import { hiitDefaultSettings } from "../../data/workoutsDefaultSettings";
import { IActiveWorkoutState } from "./IActiveWorkoutState";
import IWorkoutSession from "../../interfaces/IWorkoutSession";

let activeWorkoutState: IActiveWorkoutState = {
  activeExerciseIndex: 0,
  activeRoundIndex: 0,
  isResting: false,
  isEnded: false
};
const workoutSession: IWorkoutSession = {
  ...hiitDefaultSettings,
  rounds: [],
  includeCardio: false
};

describe("ActiveWorkoutManagerService", function () {
  const activeWorkoutManager = new ActiveWorkoutManagerService({
    workoutSession
  });

  describe("moveToNextStep", () => {
    test("it should move to rest if wasn't resting before", () => {
      const result = activeWorkoutManager.moveToNextStep(activeWorkoutState);

      expect(result).toMatchObject({
        activeExerciseIndex: 0,
        activeRoundIndex: 0,
        isResting: true,
        isEnded: false
      });
    });

    test("it should move from rest to next exercise if round not finished", () => {
      const result = activeWorkoutManager.moveToNextStep({
        ...activeWorkoutState,
        isResting: true
      });

      expect(result).toMatchObject({
        activeExerciseIndex: 1,
        activeRoundIndex: 0,
        isResting: false,
        isEnded: false
      });
    });

    test("it should move from rest to next round and set ex = 0 if round finished and we are resting between rounds", () => {
      const result = activeWorkoutManager.moveToNextStep({
        ...activeWorkoutState,
        activeExerciseIndex: workoutSession.exercisesLength - 1,
        isResting: true
      });

      expect(result).toMatchObject({
        activeExerciseIndex: 0,
        activeRoundIndex: 1,
        isResting: false,
        isEnded: false
      });
    });
  });

  describe("moveToPreviousStep", () => {
    test("it should stay on same exercise if rest true, and set rest to false", () => {
      const result = activeWorkoutManager.moveToPreviousStep({
        activeExerciseIndex: 3,
        activeRoundIndex: 2,
        isResting: true,
        isEnded: false
      });

      expect(result).toMatchObject({
        activeExerciseIndex: 3,
        activeRoundIndex: 2,
        isResting: false,
        isEnded: false
      });
    });

    test("it should return to prev exercise 'rest' state if 'rest' was false", () => {
      const result = activeWorkoutManager.moveToPreviousStep({
        activeExerciseIndex: 3,
        activeRoundIndex: 2,
        isResting: false,
        isEnded: false
      });

      expect(result).toMatchObject({
        activeExerciseIndex: 2,
        activeRoundIndex: 2,
        isResting: true,
        isEnded: false
      });
    });

    test("it should return to prev round if we are on 0 index exercise, and set rest to true", () => {
      const result = activeWorkoutManager.moveToPreviousStep({
        activeExerciseIndex: 0,
        activeRoundIndex: 2,
        isResting: false,
        isEnded: false
      });

      expect(result).toMatchObject({
        activeExerciseIndex: hiitDefaultSettings.exercisesLength - 1,
        activeRoundIndex: 1,
        isResting: true,
        isEnded: false
      });
    });

    test("it should set the same state if nowhere to return", () => {
      const result = activeWorkoutManager.moveToPreviousStep({
        activeExerciseIndex: 0,
        activeRoundIndex: 0,
        isResting: false,
        isEnded: false
      });

      expect(result).toMatchObject({
        activeExerciseIndex: 0,
        activeRoundIndex: 0,
        isResting: false,
        isEnded: false
      });
    });
  });

  describe("isRestBetweenExercises", () => {
    test("should return true if rest is true and not last exercise", () => {
      const result = activeWorkoutManager.isRestBetweenExercises({
        activeExerciseIndex: 1,
        activeRoundIndex: 1,
        isResting: true,
        isEnded: false
      });

      expect(result).toBe(true);
    });

    test("should return false if rest is true but on last exercise", () => {
      const result = activeWorkoutManager.isRestBetweenExercises({
        activeExerciseIndex: workoutSession.exercisesLength - 1,
        activeRoundIndex: 1,
        isResting: true,
        isEnded: false
      });

      expect(result).toBe(false);
    });

    test("should return false if rest false", () => {
      const result = activeWorkoutManager.isRestBetweenExercises({
        activeExerciseIndex: workoutSession.exercisesLength - 1,
        activeRoundIndex: 1,
        isResting: false,
        isEnded: false
      });

      expect(result).toBe(false);
    });
  });

  describe("isRestBetweenRounds", () => {
    test("should return true if rest is true and on last exercise", () => {
      const result = activeWorkoutManager.isRestBetweenRounds({
        activeExerciseIndex: workoutSession.exercisesLength - 1,
        activeRoundIndex: 1,
        isResting: true,
        isEnded: false
      });

      expect(result).toBe(true);
    });

    test("should return false if rest is true but not on last exercise", () => {
      const result = activeWorkoutManager.isRestBetweenRounds({
        activeExerciseIndex: 1,
        activeRoundIndex: 1,
        isResting: true,
        isEnded: false
      });

      expect(result).toBe(false);
    });
  });

  describe("getIntervalForTimer", () => {
    test("should return rest interval if Rest is true", () => {
      const result = activeWorkoutManager.getIntervalForTimer({
        activeExerciseIndex: 1,
        activeRoundIndex: 1,
        isResting: true,
        isEnded: false
      });

      expect(result).toBe(workoutSession.restDuration);
    });

    test("should return work interval if Rest is false", () => {
      const result = activeWorkoutManager.getIntervalForTimer({
        activeExerciseIndex: 1,
        activeRoundIndex: 1,
        isResting: false,
        isEnded: false
      });

      expect(result).toBe(workoutSession.exerciseDuration);
    });

    test("should return rest between rounds interval if Rest is true and we are on the last exercise", () => {
      const result = activeWorkoutManager.getIntervalForTimer({
        activeExerciseIndex: workoutSession.exercisesLength - 1,
        activeRoundIndex: workoutSession.roundsLength - 2,
        isResting: true,
        isEnded: false
      });

      expect(result).toBe(workoutSession.betweenRoundsDuration);
    });
  });
});