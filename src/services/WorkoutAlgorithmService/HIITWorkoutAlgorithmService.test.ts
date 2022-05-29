import HIITWorkoutAlgorithmService from "./HIITWorkoutAlgorithmService";
import { BodyParts } from "../../data/bodyPartsForWorkout";

describe("HIITWorkoutAlgorithmService", () => {
  // TODO: make a list of exercises as a SET not as an Array!!!
  const len = 6;
  const testHIITAlgService = new HIITWorkoutAlgorithmService(len, BodyParts.abs);

  describe("getExercisesListForSimpleAlgorithm", () => {
    test("should return correct number of exercises", () => {
      const list = testHIITAlgService.getExercisesListForSimpleAlgorithm();

      expect(list.length).toBe(len);
    });
  });

  describe("getRandomExercise", () => {
    test("should return random generated exercise", () => {
      const ex = testHIITAlgService.getRandomExercise();

      expect(ex).toBeDefined();
    });
  });

  describe("generateExclusiveExercise", () => {
    test("should throw error if there is no ability to create a exclusive exercise", () => {
      const exercisesList = [ ...testHIITAlgService.listOfExercisesForCurrentBodyPart ];
      expect(() => testHIITAlgService.generateExclusiveExercise(exercisesList)).toThrow(Error);
    });

    test("should return exercise that are not in the list", () => {
      const exercisesList = [testHIITAlgService.listOfExercisesForCurrentBodyPart[1], testHIITAlgService.listOfExercisesForCurrentBodyPart[4]];
      const exercise = testHIITAlgService.generateExclusiveExercise(exercisesList);

      expect(exercisesList.includes(exercise)).toBe(false);
    });
  });

  describe("getExercisesListForNoRepeatAlgorithm", () => {
    test("should return correct number of exercises", () => {
      const list = testHIITAlgService.getExercisesListForNoRepeatAlgorithm();
      const exList = new Set([...list]);

      console.log(exList, exList.entries(), " exList");
      console.log(list, " list");
      // expect(list.length).toBe(exList.entries().length);
    });
  });
});