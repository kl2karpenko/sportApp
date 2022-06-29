import HIITWorkoutExercisesGeneratorService from "./HIITWorkoutExercisesGeneratorService";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { WorkoutAlgorithms } from "./WorkoutAlgorithms";
import { IExercisesList } from "../../models/ExercisesList/IExercisesList";
import ExercisesList from "../../models/ExercisesList/ExercisesList";

describe("HIITWorkoutExercisesGeneratorService", () => {
  let len = 6;
  const bodyPart = EBodyParts.abs;
  const allExercisesData: IExercisesList = new ExercisesList();
  let testWorkoutExercisesGeneratorService: HIITWorkoutExercisesGeneratorService;
  beforeEach(() => {
    testWorkoutExercisesGeneratorService = new HIITWorkoutExercisesGeneratorService(len, bodyPart);
  });

  describe("getShuffledList", () => {
    test("should return random shuffled list of all exercises", () => {
      const ex = testWorkoutExercisesGeneratorService.getShuffledList(
        testWorkoutExercisesGeneratorService.getListOfExercisesForCurrentBodyPart()
      );

      expect(ex.length).toBe(allExercisesData.getExercisesForBodyPart(bodyPart).length);
    });
  });

  describe("getExercisesList", () => {
    test("should return list of exercises based on an algorithm, default if algorithm is not defined", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesList();

      expect(list.length).toBe(0);
    });

    test("should return list of exercises based on an algorithm: simple", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesList(WorkoutAlgorithms.simple);

      expect(list.length).toBe(len);
    });

    test("should return list of exercises based on an algorithm: withPair", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesList(WorkoutAlgorithms.withPair);

      expect(list.length).toBe(len);
    });
  });

  describe("getExercisesListForSimpleAlgorithm", () => {
    test("should return correct number of exercises", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesListForSimpleAlgorithm();

      expect(list.length).toBe(len);
    });

    test("should return a list of exercises if there is no ability to create a unique list the exercises can be repeated", () => {
      testWorkoutExercisesGeneratorService = new HIITWorkoutExercisesGeneratorService(25, EBodyParts.abs);
      const list = testWorkoutExercisesGeneratorService.getExercisesListForSimpleAlgorithm();

      expect(list.length).toBe(25);
    });
  });

  describe("getExercisesListForWithPairAlgorithm", () => {
    test("should return correct number of exercises", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesListForWithPairAlgorithm();

      expect(list.length).toBe(len);
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
            expect(list.includes(pairEx)).toBe(true);
          }
        }
      }

      expect(list.length).toBe(len);
    });
  });

  describe("getExerciseIndexInList", () => {
    test("should return index of exercise", () => {
      const exercisesList = testWorkoutExercisesGeneratorService.getShuffledList(testWorkoutExercisesGeneratorService.getListOfExercisesForCurrentBodyPart());
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

      expect(result.length).toBe(len);
    });
  });
});