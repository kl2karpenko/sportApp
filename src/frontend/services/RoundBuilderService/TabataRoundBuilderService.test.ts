import { tabataDefaultSettings } from "../../data/workoutsDefaultSettings";
import TabataRoundBuilderService from "./TabataRoundBuilderService";
import TabataWorkoutBuilderService from "../WorkoutBuilderService/TabataWorkoutBuilderService";
import { EBodyParts } from "../../data/bodyPartsForWorkout";

describe("TabataRoundBuilderService", () => {
  const testHiitWorkoutSession = {
    rounds: [],
    exerciseDuration: tabataDefaultSettings.exerciseDuration,
    exercisesLength: tabataDefaultSettings.exercisesLength,
    roundsLength: tabataDefaultSettings.roundsLength,
    restDuration: tabataDefaultSettings.restDuration,
    betweenRoundsDuration: tabataDefaultSettings.betweenRoundsDuration
  };
  const testTabataWB = new TabataWorkoutBuilderService();
  const testTabataRB = new TabataRoundBuilderService();

  describe("generateRoundExercises", () => {
    test("should return exercises for 1 round", () => {
      const resultsExercises = testTabataRB.generateRoundExercises({
        ...testHiitWorkoutSession,
        includeCardio: true
      }, EBodyParts.abs);

      expect(resultsExercises.length).toBe(tabataDefaultSettings.exercisesLength);
    });
  });

  describe("generateRound", () => {
    test("should return error when there is 0 rounds", () => {
      expect(() => testTabataRB.generate({
        ...testHiitWorkoutSession,
        roundsLength: 0,
        includeCardio: true
      }, [])).toThrow(Error);
    });

    test("should return random body parts for number of rounds", () => {
      const results = testTabataRB.generate({
        ...testHiitWorkoutSession,
        roundsLength: 3,
        includeCardio: true
      }, testTabataWB.generateBodyParts(3));

      expect(results.length).toBe(3);
    });
  });
});