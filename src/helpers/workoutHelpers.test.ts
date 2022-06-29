import {
  checkIfWorkoutFinished,
  createRandomExercisesForAllRounds,
  createRandomExercisesForRound,
  generateListOfBodyPartsForAllRounds,
  ifExerciseAlreadyIncluded, isRestTime, setNextStep, setupExerciseWithPairIfNeeded, toNextExercise, toPreviousExercise
} from "./workoutHelpers";
import workoutsDefaultSettings from "../data/workoutsDefaultSettings";
import workoutTypesList from "../data/workoutTypesList";
import { IBodyPartsForWorkout } from "../interfaces_deprecated/IBodyPartsForWorkout";
import { defaultWorkoutSession } from "../SportApp";
import { IWorkoutGeneratedExercisesList } from "../interfaces_deprecated/IWorkoutDeprecatedObj";

describe("workoutHelpers", () => {
  describe("ifListIncludeExercise", () => {
    test("should return true if list include the text", () => {
      const list: IBodyPartsForWorkout[] = [{
        id: "ex1",
        label: "a",
        isCardio: false
      }];

      expect(ifExerciseAlreadyIncluded(list, {
        id: "ex1",
        label: "a",
        isCardio: false
      })).toBe(true);
    });

    test("should return false if list include the text", () => {
      const list = [{
        id: "ex1",
        label: "a",
        isCardio: false
      }];

      expect(ifExerciseAlreadyIncluded(list, {
        id: "ex2",
        label: "d",
        isCardio: false
      })).toBe(false);
    });
  });

  describe("generateListOfBodyPartsForAllRounds", () => {
    test("should create list of exercises for tabata, that are random and there is no repeats", () => {
      const listOfExercises = generateListOfBodyPartsForAllRounds(workoutsDefaultSettings);

      expect(listOfExercises.length).toBe(workoutsDefaultSettings.rounds);
    });
  });

  describe("setupExerciseWithPairIfNeeded", () => {
    test("should create random list of exercises for 'hands'", () => {
      const listOfExercisesForHands = workoutTypesList.hands;
      const createdList: IBodyPartsForWorkout[] = [];
      const randomListOfExercises = setupExerciseWithPairIfNeeded(listOfExercisesForHands, createdList, []);

      expect(randomListOfExercises.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("createRandomExercisesForRound", () => {
    const workoutTypesListEnums = Object.keys(workoutTypesList);
    test("should create list of exercises for each round, the same as number of exercises", () => {
      const result = createRandomExercisesForRound(workoutTypesListEnums[0], workoutsDefaultSettings, []);

      console.log(result, " result");

      expect(result.length).toBeGreaterThanOrEqual(workoutsDefaultSettings.exercises);
    });
  });

  describe("createRandomExercisesForAllRounds", () => {
    const workoutTypesListEnums = Object.keys(workoutTypesList);
    test("should create list of exercises for all rounds", () => {
      const result = createRandomExercisesForAllRounds([workoutTypesListEnums[0], workoutTypesListEnums[1]], workoutsDefaultSettings);

      result.forEach(({ exercises }: IWorkoutGeneratedExercisesList, index) =>
        expect(exercises.length).toBeGreaterThanOrEqual(workoutsDefaultSettings.exercises)
      );

      expect(result.length).toBeGreaterThanOrEqual(workoutsDefaultSettings.exercises);
    });

    test("should create list of exercises for all rounds without repeating the exercises", () => {
      const result = createRandomExercisesForAllRounds([workoutTypesListEnums[0], workoutTypesListEnums[0], workoutTypesListEnums[2], workoutTypesListEnums[1]], workoutsDefaultSettings);

      result.forEach(({ exercises }: IWorkoutGeneratedExercisesList, index) => expect(exercises.length).toBeGreaterThanOrEqual(workoutsDefaultSettings.exercises));
    });
  });

  describe("toNextExercise", () => {
    test("should move to next exercise", () => {
      const result = toNextExercise({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: true,
          round: workoutsDefaultSettings.rounds,
          exercise: 1
        },
        workoutSettings: workoutsDefaultSettings
      });

      expect(result.exercise).toBe(2);
      expect(result.isResting).toBe(false);
    });

    test("should move to next round", () => {
      const result = toNextExercise({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: true,
          round: 1,
          exercise: workoutsDefaultSettings.exercises
        },
        workoutSettings: {
          ...workoutsDefaultSettings,
          rounds: 2
        }
      });

      expect(result.round).toBe(2);
      expect(result.isResting).toBe(false);
      expect(result.exercise).toBe(1);
    });
  });

  describe("toPreviousExercise", () => {
    test("should move set rest to false, if it is true and stay at the same exercise", () => {
      const result = toPreviousExercise({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: true,
          round: 1,
          exercise: 2
        },
        workoutSettings: workoutsDefaultSettings
      });

      expect(result.exercise).toBe(2);
      expect(result.round).toBe(1);
      expect(result.isResting).toBe(false);
    });

    test("should move to previous exercise if not Resting to rest", () => {
      const result = toPreviousExercise({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: false,
          round: 1,
          exercise: 2
        },
        workoutSettings: workoutsDefaultSettings
      });

      expect(result.exercise).toBe(1);
      expect(result.round).toBe(1);
      expect(result.isResting).toBe(true);
    });

    test("should move to previous round if last exercise and not Resting", () => {
      const result = toPreviousExercise({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: false,
          round: 2,
          exercise: 1
        },
        workoutSettings: workoutsDefaultSettings
      });

      expect(result.exercise).toBe(2);
      expect(result.round).toBe(1);
      expect(result.isResting).toBe(true);
    });
  });

  describe("isRestTime", () => {
    test("should return true is Rest time", () => {
      const result = isRestTime({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: false,
          round: 1,
          exercise: 1
        },
        workoutSettings: {
          ...workoutsDefaultSettings,
          exercises: 3
        },
        previousSessionValues: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: false,
          round: 1,
          exercise: 1
        }
      });

      expect(result).toBe(true);
    });

    test("should return false if not a Rest time", () => {
      const result = isRestTime({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: false,
          round: 1,
          exercise: 2
        },
        workoutSettings: {
          ...workoutsDefaultSettings,
          exercises: 3
        },
        previousSessionValues: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: false,
          round: 1,
          exercise: 1
        }
      });

      expect(result).toBe(false);
    });
  });

  describe("setNextStep", () => {
    test("should move to exercise 2", () => {
      const result = setNextStep({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: true,
          round: 1,
          exercise: 1
        },
        workoutSettings: workoutsDefaultSettings,
        previousSessionValues: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: false,
          round: 1,
          exercise: 1
        }
      });

      expect(result.exercise).toBe(2);
      expect(result.isResting).toBe(false);
    });

    test("should move to next round", () => {
      const result = setNextStep({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: true,
          round: 1,
          exercise: workoutsDefaultSettings.exercises
        },
        workoutSettings: {
          ...workoutsDefaultSettings,
          rounds: 2
        },
        previousSessionValues: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: false,
          round: 1,
          exercise: workoutsDefaultSettings.exercises
        }
      });

      expect(result.round).toBe(2);
      expect(result.exercise).toBe(1);
    });
  });

  describe("checkIfWorkoutFinished", () => {
    test("should return true if exercises and rounds are finished + isResting is true", () => {
      const isFinished = checkIfWorkoutFinished({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: true,
          round: workoutsDefaultSettings.rounds,
          exercise: workoutsDefaultSettings.exercises
        },
        workoutSettings: workoutsDefaultSettings
      });

      expect(isFinished).toBe(true);
    });

    test("should return false if exercises and rounds are finished + isResting == false", () => {
      const isFinished = checkIfWorkoutFinished({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: false,
          round: workoutsDefaultSettings.rounds,
          exercise: workoutsDefaultSettings.exercises
        },
        workoutSettings: workoutsDefaultSettings
      });

      expect(isFinished).toBe(false);
    });

    test("should return false if exercises is not finished", () => {
      const isFinished = checkIfWorkoutFinished({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: false,
          round: workoutsDefaultSettings.rounds,
          exercise: 1
        },
        workoutSettings: workoutsDefaultSettings
      });

      expect(isFinished).toBe(false);
    });

    test("should return false if rounds is not finished", () => {
      const isFinished = checkIfWorkoutFinished({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: false,
          round: 0,
          exercise: workoutsDefaultSettings.exercises
        },
        workoutSettings: workoutsDefaultSettings
      });

      expect(isFinished).toBe(false);
    });
  });
});