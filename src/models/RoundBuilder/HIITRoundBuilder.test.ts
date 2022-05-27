import HIITWorkoutSession from "../WorkoutSession/HIITWorkoutSession";
import workoutDefaultSettings from "../../data/workoutDefaultSettings";
import HIITRoundBuilder from "./HIITRoundBuilder";
import HIITWorkoutBuilder from "../WorkoutBuilder/HIITWorkoutBuilder";

describe("HIITRoundBuilder", () => {
  const testHiitWB = new HIITWorkoutBuilder();
  const testHiitRB = new HIITRoundBuilder();
  const testHiitWorkoutSession = new HIITWorkoutSession({
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