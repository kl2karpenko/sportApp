import ExercisesList from "./ExercisesList";
import IExercise from "../Exercise/IExercise";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { WorkoutType } from "../../interfaces/WorkoutType";
import { mockedWorkoutTypes } from "../../mockedData/exercises";

describe("ExercisesList", function () {
  let testAllExercisesInstance = new ExercisesList({
    workoutType: WorkoutType.Tabata,
    exercises: mockedWorkoutTypes,
    cardioExercises: mockedWorkoutTypes.cardio
  });

  it("should have a list of all exercises", () => {
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
      expect(testAllExercisesInstance.getExercisesForBodyPart(EBodyParts.abs_left_right).length).toBe(mockedWorkoutTypes.abs_left_right.length);
    });

    it("should return a list of exercises for cardio body part", () => {
      expect(testAllExercisesInstance.getExercisesForBodyPart(EBodyParts.cardio).length).toBe(mockedWorkoutTypes.cardio.length);
    });
  });

  describe("getCardioExercisesList", () => {
    it("should return a list of cardio exercises as array", () => {
      expect(testAllExercisesInstance.getCardioExercisesList().length).toBe(mockedWorkoutTypes.cardio.length);
    });
  });

  describe("findExerciseById", () => {
    it("should return an exercise object if it can be found in list", () => {
      const exercisesForCardio = mockedWorkoutTypes.cardio[3];

      expect(testAllExercisesInstance.findExerciseById(exercisesForCardio.id!)).toBe(exercisesForCardio);
    });

    it("should return null if exercise does not exist", () => {
      expect(testAllExercisesInstance.findExerciseById("some-id")).toBe(null);
    });
  });
});