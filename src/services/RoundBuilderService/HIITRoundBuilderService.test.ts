import { hiitDefaultSettings } from "../../data/workoutsDefaultSettings";
import HIITRoundBuilderService from "./HIITRoundBuilderService";
import HIITWorkoutBuilderService from "../WorkoutBuilderService/HIITWorkoutBuilderService";
import { WorkoutType } from "../../interfaces/WorkoutType";

describe("HIITRoundBuilderService", () => {
  const testHiitWorkoutSession = {
    rounds: [],
    exerciseDuration: hiitDefaultSettings.exerciseDuration,
    exercisesLength: hiitDefaultSettings.exercisesLength,
    roundsLength: hiitDefaultSettings.roundsLength,
    restDuration: hiitDefaultSettings.restDuration,
    betweenRoundsDuration: hiitDefaultSettings.betweenRoundsDuration
  };
  const testHiitWB = new HIITWorkoutBuilderService({ workoutType: WorkoutType.HIIT });
  const testHiitRB = new HIITRoundBuilderService();

  describe("generateRound", () => {
    test("should return error when there is 0 rounds", () => {
      expect(() => testHiitRB.generate({
        ...testHiitWorkoutSession,
        roundsLength: 0
      }, [])).toThrow(Error);
    });

    test("should return random body parts for number of rounds", () => {
      const results = testHiitRB.generate({
        ...testHiitWorkoutSession,
        roundsLength: 3
      }, testHiitWB.generateBodyParts(3));

      expect(results.length).toBe(3);
    });
  });

  describe("generate", () => {
    test("should return error when there is 0 rounds", () => {
      expect(() => testHiitRB.generate({
        ...testHiitWorkoutSession,
        roundsLength: 0
      }, [])).toThrow(Error);
    });

    test("should return random body parts for number of rounds", () => {
      const results = testHiitRB.generate({
        ...testHiitWorkoutSession,
        roundsLength: 3
      }, testHiitWB.generateBodyParts(3));

      expect(results.length).toBe(3);
    });
  });
});