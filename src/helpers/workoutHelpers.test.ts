import {
  generateListOfBodyPartsForAllRounds,
  createRandomExercisesForRound,
  ifExerciseAlreadyIncluded,
  setupExerciseWithPairIfNeeded,
  checkIfWorkoutFinished, setNextStep, toNextExercise, toPreviousExercise, isRestTime, createRandomExercisesForAllRounds
} from "./workoutHelpers";
import workoutDefaultSettings from "../data/workoutDefaultSettings";
import workoutTypesList from "../data/workoutTypesList";
import {IBodyPartsForWorkout} from "../interfaces_deprecated/IBodyPartsForWorkout";
import {defaultWorkoutSession} from "../SportApp";
import {IWorkoutGeneratedExercisesList} from "../interfaces_deprecated/IWorkoutDeprecatedObj";

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
      const listOfExercises = generateListOfBodyPartsForAllRounds(workoutDefaultSettings);

      expect(listOfExercises.length).toBe(workoutDefaultSettings.rounds);
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
      const result = createRandomExercisesForRound(workoutTypesListEnums[0], workoutDefaultSettings, []);

      console.log(result, " result");

      expect(result.length).toBeGreaterThanOrEqual(workoutDefaultSettings.exercises);
    });
  });

  describe("createRandomExercisesForAllRounds", () => {
    const workoutTypesListEnums = Object.keys(workoutTypesList);
    test("should create list of exercises for all rounds", () => {
      const result = createRandomExercisesForAllRounds([workoutTypesListEnums[0], workoutTypesListEnums[1]], workoutDefaultSettings);

      result.forEach(({ exercises }: IWorkoutGeneratedExercisesList, index) =>
        expect(exercises.length).toBeGreaterThanOrEqual(workoutDefaultSettings.exercises)
      );

      expect(result.length).toBeGreaterThanOrEqual(workoutDefaultSettings.exercises);
    });

    test("should create list of exercises for all rounds without repeating the exercises", () => {
      const result = createRandomExercisesForAllRounds([workoutTypesListEnums[0], workoutTypesListEnums[0], workoutTypesListEnums[2], workoutTypesListEnums[1]], workoutDefaultSettings);

      result.forEach(({ exercises }: IWorkoutGeneratedExercisesList, index) => expect(exercises.length).toBeGreaterThanOrEqual(workoutDefaultSettings.exercises));
    });
  });

  describe("toNextExercise", () => {
    test("should move to next exercise", () => {
      const result = toNextExercise({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: true,
          round: workoutDefaultSettings.rounds,
          exercise: 1
        },
        workoutSettings: workoutDefaultSettings
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
          exercise: workoutDefaultSettings.exercises
        },
        workoutSettings: {
          ...workoutDefaultSettings,
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
        workoutSettings: workoutDefaultSettings
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
        workoutSettings: workoutDefaultSettings
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
        workoutSettings: workoutDefaultSettings
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
          ...workoutDefaultSettings,
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
          ...workoutDefaultSettings,
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
        workoutSettings: workoutDefaultSettings,
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
          exercise: workoutDefaultSettings.exercises
        },
        workoutSettings: {
          ...workoutDefaultSettings,
          rounds: 2
        },
        previousSessionValues: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: false,
          round: 1,
          exercise: workoutDefaultSettings.exercises
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
          round: workoutDefaultSettings.rounds,
          exercise: workoutDefaultSettings.exercises
        },
        workoutSettings: workoutDefaultSettings
      });

      expect(isFinished).toBe(true);
    });

    test("should return false if exercises and rounds are finished + isResting == false", () => {
      const isFinished = checkIfWorkoutFinished({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: false,
          round: workoutDefaultSettings.rounds,
          exercise: workoutDefaultSettings.exercises
        },
        workoutSettings: workoutDefaultSettings
      });

      expect(isFinished).toBe(false);
    });

    test("should return false if exercises is not finished", () => {
      const isFinished = checkIfWorkoutFinished({
        currentWorkoutSession: {
          ...defaultWorkoutSession,
          inProgress: true,
          isResting: false,
          round: workoutDefaultSettings.rounds,
          exercise: 1
        },
        workoutSettings: workoutDefaultSettings
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
          exercise: workoutDefaultSettings.exercises
        },
        workoutSettings: workoutDefaultSettings
      });

      expect(isFinished).toBe(false);
    });
  });
});