import HIITWorkoutAlgorithmService from "./HIITWorkoutAlgorithmService";
import { BodyParts } from "../../data/bodyPartsForWorkout";

describe("HIITWorkoutAlgorithmService", () => {
  const testHIITAlgService = new HIITWorkoutAlgorithmService(2, BodyParts.abs);

  describe("getExercisesListForSimpleAlgorithm", () => {
    test("should return correct number of exercises", () => {
      const list = testHIITAlgService.getExercisesListForSimpleAlgorithm()

      expect(list.length).toBe(2);
    });
  });

  describe("generateExclusiveExercise", () => {
    test("should throw error if there is no ability to create a exclusive exercise", () => {
      const exercisesList = [ ...testHIITAlgService.listOfExercisesForCurrentBodyPart ];
      expect(() => testHIITAlgService.generateExclusiveExercise(exercisesList)).toThrow(Error);
    });

    test("should return exercise that are not in the list", () => {
      const exercisesList = [testHIITAlgService.listOfExercisesForCurrentBodyPart[2], testHIITAlgService.listOfExercisesForCurrentBodyPart[4]];
      const exercise = testHIITAlgService.generateExclusiveExercise(exercisesList)

      expect(exercisesList.includes(exercise)).toBe(false);
    });
  });

  describe("getExercisesListForNoRepeatAlgorithm", () => {
    test("should return correct number of exercises", () => {
      const list = testHIITAlgService.getExercisesListForNoRepeatAlgorithm()

      console.log(list);
      expect(list.length).toBe(2);
    });
  });
});