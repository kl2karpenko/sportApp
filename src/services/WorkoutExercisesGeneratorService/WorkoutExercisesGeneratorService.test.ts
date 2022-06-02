import WorkoutExercisesGeneratorService from "./WorkoutExercisesGeneratorService";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { WorkoutAlgorithms } from "./WorkoutAlgorithms";

describe("WorkoutExercisesGeneratorService", () => {
  let len = 6;
  let testWorkoutExercisesGeneratorService: WorkoutExercisesGeneratorService;
  beforeEach(() => {
    testWorkoutExercisesGeneratorService = new WorkoutExercisesGeneratorService(len, EBodyParts.abs);
  });

  describe("getShuffledList", () => {
    test("should return random shuffled list of all exercises", () => {
      const ex = testWorkoutExercisesGeneratorService.getShuffledList(testWorkoutExercisesGeneratorService.workoutRoundExercises.listOfExercisesForCurrentBodyPart);

      expect(ex.length).toBe(testWorkoutExercisesGeneratorService.workoutRoundExercises.listOfExercisesForCurrentBodyPart.length);
    });
  });

  describe("getExercisesList", () => {
    test("should return list of exercises based on an algorithm, default if algorithm is not defined", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesList();

      expect(list.size).toBe(0);
    });

    test("should return list of exercises based on an algorithm: simple", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesList(WorkoutAlgorithms.simple);

      expect(list.size).toBe(len);
    });

    test("should return list of exercises based on an algorithm: withPair", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesList(WorkoutAlgorithms.withPair);

      expect(list.size).toBe(len);
    });
  });

  describe("getExercisesListForSimpleAlgorithm", () => {
    test("should return correct number of exercises", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesListForSimpleAlgorithm();

      expect(list.size).toBe(len);
    });

    test("should return a list of exercises if there is no ability to create a unique list the exercises can be repeated", () => {
      testWorkoutExercisesGeneratorService = new WorkoutExercisesGeneratorService(25, EBodyParts.abs);
      const list = testWorkoutExercisesGeneratorService.getExercisesListForSimpleAlgorithm();

      expect(list.size).toBe(24);
    });
  });

  describe("getExercisesListForWithPairAlgorithm", () => {
    test("should return correct number of exercises", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesListForWithPairAlgorithm();

      expect(list.size).toBe(len);
    });

    test("should return exercises with the pair exercises stand next to them in list", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesListForWithPairAlgorithm();
      const arr = Array.from(list);

      for (const ex of list.values()) {
        if (ex.pair) {
          const pairExIndex = testWorkoutExercisesGeneratorService.getExerciseIndexInList(arr, ex.pair);
          const pairEx = arr[pairExIndex];

          if (pairExIndex !== -1) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(list.has(pairEx)).toBe(true);
          }
        }
      }

      expect(list.size).toBe(len);
    });
  });

  describe("getExerciseIndexInList", () => {
    test("should return index of exercise", () => {
      const exercisesList = testWorkoutExercisesGeneratorService.getShuffledList(testWorkoutExercisesGeneratorService.workoutRoundExercises.listOfExercisesForCurrentBodyPart);
      const index = 4;
      const ex = exercisesList[index];
      const indexFound = testWorkoutExercisesGeneratorService.getExerciseIndexInList(exercisesList, ex.id);

      expect(indexFound).toBe(index);
    });
  });

  describe("addCardioExercisesToList", () => {
    test("should return correct number of exercises", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesList(WorkoutAlgorithms.withPair);
      const result = testWorkoutExercisesGeneratorService.addCardioExercisesToList(list, 3);

      expect(result.size).toBe(len);
    });
  });
});