import ExercisesList from "./ExercisesList";
import IExercise from "../Exercise/IExercise";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import workoutTypesList from "../../data/workoutTypesList";
import { exercises as absExercises } from "../../data/workoutTypesList/abs_left_right";
import { exercises as cardioExercises } from "../../data/workoutTypesList/cardio";

describe("ExercisesList", function () {
  let testAllExercisesInstance = new ExercisesList();

  it("should have a list of all exrecises", () => {
    expect(testAllExercisesInstance.getExercisesList).toBeDefined();
    expect(testAllExercisesInstance.getExercisesListAsArray).toBeDefined();
    expect(testAllExercisesInstance.getCardioExercisesList).toBeDefined();
    expect(testAllExercisesInstance.getExercisesForBodyPart).toBeDefined();
    expect(testAllExercisesInstance.findExerciseById).toBeDefined();
  });

  describe("getExercisesListAsArray", () => {
    it("should have a list of all exercises flattened in exercisesListAsArray", () => {
      const list = testAllExercisesInstance.getExercisesListAsArray();
      let len = 0;
      Object.values(testAllExercisesInstance.getExercisesList()).map((values: IExercise[]) => {
        len += values.length;
      });

      expect(list.length).toBe(len);
    });
  });

  describe("getExercisesForBodyPart", () => {
    it("should return a list of exercises for abs body part", () => {
      expect(testAllExercisesInstance.getExercisesForBodyPart(EBodyParts.abs_left_right).length).toBe(absExercises.length);
    });

    it("should return a list of exercises for cardio body part", () => {
      expect(testAllExercisesInstance.getExercisesForBodyPart(EBodyParts.cardio).length).toBe(workoutTypesList[EBodyParts.cardio].length);
    });
  });

  describe("getCardioExercisesList", () => {
    it("should return a list of cardio exercises as array", () => {
      expect(testAllExercisesInstance.getCardioExercisesList().length).toBe(cardioExercises.length);
    });
  });

  describe("findExerciseById", () => {
    it("should return an exercise object if it can be found in list", () => {
      const exercisesForCardio = cardioExercises[3];

      expect(testAllExercisesInstance.findExerciseById(exercisesForCardio.id)).toBe(exercisesForCardio);
    });

    it("should return null if exercise does not exist", () => {
      expect(testAllExercisesInstance.findExerciseById("some-id")).toBe(null);
    });
  });
});