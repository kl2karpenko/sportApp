import ActiveWorkoutManagerService from "./ActiveWorkoutManagerService";
import { hiitDefaultSettings } from "../../data/workoutsDefaultSettings";
import { IActiveWorkoutState } from "./IActiveWorkoutState";
import { testHiitWorkoutSession } from "../../mockedData/testWorkoutSession";
import { IWorkoutSessionState } from "../../store/workoutSession";

let activeWorkoutState: IActiveWorkoutState = {
  activeExerciseIndex: 0,
  activeRoundIndex: 0,
  isResting: false,
  isEnded: false
};
const workoutSession: IWorkoutSessionState = {
  ...testHiitWorkoutSession
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

  describe("isWorkoutFinished", () => {
    test("should return true if isEnded === true", () => {
      const result = activeWorkoutManager.isWorkoutFinished({
        activeExerciseIndex: 1,
        activeRoundIndex: 1,
        isResting: true,
        isEnded: true
      });

      expect(result).toBe(true);
    });

    test("should return false if isEnded === false", () => {
      const result = activeWorkoutManager.isWorkoutFinished({
        activeExerciseIndex: 1,
        activeRoundIndex: 1,
        isResting: false,
        isEnded: false
      });

      expect(result).toBe(false);
    });
  });

  describe("getCurrentRound", () => {
    test("should return current active round or empty object", () => {
      const result = activeWorkoutManager.getCurrentRound({
        activeExerciseIndex: 1,
        activeRoundIndex: 1,
        isResting: true,
        isEnded: true
      });

      expect(result).toBe(testHiitWorkoutSession.rounds[1]);
    });

    test("should return false if isEnded === false", () => {
      const result = activeWorkoutManager.getCurrentRound({
        activeExerciseIndex: 1,
        activeRoundIndex: 10,
        isResting: false,
        isEnded: false
      });

      expect(result).toEqual({});
    });
  });

  describe("getCurrentRoundExercisesList", () => {
    test("should return list of exercises for current round", () => {
      const result = activeWorkoutManager.getCurrentRoundExercisesList({
        activeExerciseIndex: 1,
        activeRoundIndex: 1,
        isResting: true,
        isEnded: true
      });

      expect(result).toBe(testHiitWorkoutSession.rounds[1]?.exercisesList);
    });

    test("should return empty array if round does not exist", () => {
      const result = activeWorkoutManager.getCurrentRoundExercisesList({
        activeExerciseIndex: 1,
        activeRoundIndex: 10,
        isResting: false,
        isEnded: false
      });

      expect(result).toEqual([]);
    });
  });

  describe("getActiveExercise", () => {
    test("should return current exercise for current round", () => {
      const activeEx = 3;
      const result = activeWorkoutManager.getActiveExercise({
        activeExerciseIndex: activeEx,
        activeRoundIndex: 1,
        isResting: true,
        isEnded: true
      });

      // @ts-ignore
      expect(result).toBe(testHiitWorkoutSession.rounds[1]?.exercisesList[activeEx]!);
    });
  });

  describe("getNextExercise", () => {
    test("should return next exercise in current round", () => {
      const result = activeWorkoutManager.getNextExercise({
        activeExerciseIndex: 3,
        activeRoundIndex: 2,
        isResting: true,
        isEnded: true
      });

      // @ts-ignore
      expect(result).toBe(workoutSession?.rounds[2]?.exercisesList[4]);
    });

    test("should return first exercise in next round", () => {
      const result = activeWorkoutManager.getNextExercise({
        activeExerciseIndex: workoutSession.exercisesLength - 1,
        activeRoundIndex: 2,
        isResting: true,
        isEnded: true
      });

      // @ts-ignore
      expect(result).toBe(workoutSession?.rounds[3]?.exercisesList[0]);
    });
  });

  describe("getNextRound", () => {
    test("should return next round if exists", () => {
      const result = activeWorkoutManager.getNextRound({
        activeExerciseIndex: 3,
        activeRoundIndex: 3,
        isResting: true,
        isEnded: true
      });

      expect(result).toBe(workoutSession?.rounds[4]);
    });

    test("should return empty array if round does not exists", () => {
      const result = activeWorkoutManager.getNextRound({
        activeExerciseIndex: 3,
        activeRoundIndex: workoutSession.roundsLength,
        isResting: true,
        isEnded: true
      });

      expect(result).toStrictEqual([]);
    });
  });

  describe("getNextRoundExercisesList", () => {
    test("should return next round exercises list if round exists", () => {
      const result = activeWorkoutManager.getNextRoundExercisesList({
        activeExerciseIndex: 3,
        activeRoundIndex: 3,
        isResting: true,
        isEnded: true
      });

      expect(result).toBe(workoutSession?.rounds[4]?.exercisesList);
    });

    test("should return empty array if round does not exists", () => {
      const result = activeWorkoutManager.getNextRoundExercisesList({
        activeExerciseIndex: 3,
        activeRoundIndex: workoutSession.roundsLength,
        isResting: true,
        isEnded: true
      });

      expect(result).toStrictEqual([]);
    });
  });
});