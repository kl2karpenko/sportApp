import WorkoutExercisesGeneratorService from "./WorkoutExercisesGeneratorService";
import { BodyParts } from "../../data/bodyPartsForWorkout";

describe("WorkoutExercisesGeneratorService", () => {
  let len = 6;
  let testWorkoutExercisesGeneratorService: WorkoutExercisesGeneratorService;
  beforeEach(() => {
    testWorkoutExercisesGeneratorService = new WorkoutExercisesGeneratorService(len, BodyParts.abs);
  });

  describe("getRandomExercise", () => {
    test("should return random generated exercise", () => {
      const ex = testWorkoutExercisesGeneratorService.getRandomExercise();

      expect(ex).toBeDefined();
    });
  });

  describe("generateExclusiveExercise", () => {
    test("should throw error if there is no ability to create a exclusive exercise", () => {
      const exercisesList = new Set([ ...testWorkoutExercisesGeneratorService.listOfExercisesForCurrentBodyPart ]);
      expect(() => testWorkoutExercisesGeneratorService.generateExclusiveExercise(exercisesList)).toThrow(Error);
    });

    test("should return exercise that are not in the list", () => {
      const exercisesList = new Set([testWorkoutExercisesGeneratorService.listOfExercisesForCurrentBodyPart[1], testWorkoutExercisesGeneratorService.listOfExercisesForCurrentBodyPart[4]]);
      const exercise = testWorkoutExercisesGeneratorService.generateExclusiveExercise(exercisesList);

      expect(exercisesList.has(exercise)).toBe(false);
    });
  });

  describe("getExercisesListForSimpleAlgorithm", () => {
    test("should return correct number of exercises", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesListForSimpleAlgorithm();

      expect(list.size).toBe(len);
    });

    test("should return a list of exercises if there is no ability to create a unique list the exercises can be repeated", () => {
      testWorkoutExercisesGeneratorService = new WorkoutExercisesGeneratorService(25, BodyParts.abs);
      const list = testWorkoutExercisesGeneratorService.getExercisesListForSimpleAlgorithm();

      expect(list.size).toBe(24);
    });
  });
});