import TabataRoundBuilderService from "./TabataRoundBuilderService";
import TabataWorkoutBuilderService from "../WorkoutBuilderService/TabataWorkoutBuilderService";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import {
  testTabataWorkoutSession
} from "../../mockedData/testWorkoutSession";

describe("TabataRoundBuilderService", () => {
  const testTabataWB = new TabataWorkoutBuilderService();
  const testTabataRB = new TabataRoundBuilderService();

  describe("generateRoundExercises", () => {
    test("should return exercises for 1 round", () => {
      const resultsExercises = testTabataRB.generateRoundExercises({
        ...testTabataWorkoutSession,
        includeCardio: true
      }, EBodyParts.abs);

      expect(resultsExercises.length).toBe(4);
    });
  });

  describe("generateRound", () => {
    test("should return error when there is 0 rounds", () => {
      expect(() => testTabataRB.generate({
        workoutSession: {
          ...testTabataWorkoutSession,
          roundsLength: 0,
          includeCardio: true
        },
        bodyPartsIdForEachRound: []
      })).toThrow(Error);
    });

    test("should return random body parts for number of rounds", () => {
      const results = testTabataRB.generate({
        workoutSession: {
          ...testTabataWorkoutSession,
          roundsLength: 3,
        },
        bodyPartsIdForEachRound: testTabataWB.generateBodyParts(3)
      });

      expect(results.length).toBe(3);
    });
  });
});