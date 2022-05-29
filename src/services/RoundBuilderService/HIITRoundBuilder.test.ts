import HIITWorkoutSessionService from "../WorkoutSessionService/HIITWorkoutSessionService";
import workoutDefaultSettings from "../../data/workoutDefaultSettings";
import HIITRoundBuilderService from "./HIITRoundBuilderService";
import HIITWorkoutBuilderService from "../WorkoutBuilderService/HIITWorkoutBuilderService";

describe("HIITRoundBuilderService", () => {
  const testHiitWB = new HIITWorkoutBuilderService();
  const testHiitRB = new HIITRoundBuilderService();
  const testHiitWorkoutSession = new HIITWorkoutSessionService({
    exerciseDuration: workoutDefaultSettings.exercise_duration,
    exercisesLength: workoutDefaultSettings.exercises,
    roundsLength: workoutDefaultSettings.rounds,
    restDuration: workoutDefaultSettings.rest_duration,
    betweenRoundsDuration: workoutDefaultSettings.rest_between_rounds
  });

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