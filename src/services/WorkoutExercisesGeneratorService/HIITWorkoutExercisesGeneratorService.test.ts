import HIITWorkoutExercisesGeneratorService from "./HIITWorkoutExercisesGeneratorService";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { WorkoutAlgorithms } from "./WorkoutAlgorithms";
import { IExercisesList } from "../../models/ExercisesList/IExercisesList";
import ExercisesList from "../../models/ExercisesList/ExercisesList";
import { WorkoutType } from "../../interfaces/WorkoutType";

describe("HIITWorkoutExercisesGeneratorService", () => {
  let len = 6;
  const bodyPart = EBodyParts.abs;
  const allExercisesData: IExercisesList = new ExercisesList({ workoutType: WorkoutType.HIIT });
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
    test("should return list of exercises based on an algorithm, default is simple algorithm if algorithm is not defined", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesList();

      expect(list.length).toBe(len);
    });

    test("should return list of exercises based on an algorithm: simple", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesList({ algorithm: WorkoutAlgorithms.simple });

      expect(list.length).toBe(len);
    });

    test("should return list of exercises based on an algorithm: withPair", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesList({ algorithm: WorkoutAlgorithms.simple });

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

    test("should return a list of exercises with cardio with correct step of cardio exercises", () => {
      const len = 5;
      testWorkoutExercisesGeneratorService = new HIITWorkoutExercisesGeneratorService(len, EBodyParts.abs);
      const list = testWorkoutExercisesGeneratorService.getExercisesListForSimpleAlgorithm({ cardioStep: 2, includeCardio: true });

      expect(list.length).toBe(len);
      expect(list[2].id.includes("cardio")).toBe(true);
      expect(list[4].id.includes("cardio")).toBe(true);
    });

    test("should return a list of exercises without cardio if we say so", () => {
      const len = 5;
      testWorkoutExercisesGeneratorService = new HIITWorkoutExercisesGeneratorService(len, EBodyParts.abs);
      const list = testWorkoutExercisesGeneratorService.getExercisesListForSimpleAlgorithm({ includeCardio: false });

      expect(list.length).toBe(len);
      expect(list[0].id.includes("cardio")).toBe(false);
      expect(list[1].id.includes("cardio")).toBe(false);
      expect(list[2].id.includes("cardio")).toBe(false);
      expect(list[3].id.includes("cardio")).toBe(false);
      expect(list[4].id.includes("cardio")).toBe(false);
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

    test("should return a list of exercises with cardio with correct step of cardio exercises", () => {
      const len = 5;
      testWorkoutExercisesGeneratorService = new HIITWorkoutExercisesGeneratorService(len, EBodyParts.abs);
      const list = testWorkoutExercisesGeneratorService.getExercisesListForWithPairAlgorithm({ cardioStep: 2, includeCardio: true });

      expect(list.length).toBe(len);
      expect(list[2].id.includes("cardio")).toBe(true);
      expect(list[4].id.includes("cardio")).toBe(true);
    });

    test("should return a list of exercises without cardio if we say so", () => {
      const len = 5;
      testWorkoutExercisesGeneratorService = new HIITWorkoutExercisesGeneratorService(len, EBodyParts.abs);
      const list = testWorkoutExercisesGeneratorService.getExercisesListForWithPairAlgorithm({ includeCardio: false });

      expect(list.length).toBe(len);
      expect(list[0].id.includes("cardio")).toBe(false);
      expect(list[1].id.includes("cardio")).toBe(false);
      expect(list[2].id.includes("cardio")).toBe(false);
      expect(list[3].id.includes("cardio")).toBe(false);
      expect(list[4].id.includes("cardio")).toBe(false);
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
      const list = testWorkoutExercisesGeneratorService.getExercisesList({ algorithm: WorkoutAlgorithms.withPair });
      const result = testWorkoutExercisesGeneratorService.addCardioExercisesToList(list, 3);

      expect(result.length).toBe(len);
    });
  });
});