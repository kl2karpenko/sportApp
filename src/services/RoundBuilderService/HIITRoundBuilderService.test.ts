import workoutsDefaultSettings from "../../data/workoutsDefaultSettings";
import HIITRoundBuilderService from "./HIITRoundBuilderService";
import HIITWorkoutBuilderService from "../WorkoutBuilderService/HIITWorkoutBuilderService";

describe("HIITRoundBuilderService", () => {
  const testHiitWorkoutSession = {
    rounds: [],
    exerciseDuration: workoutsDefaultSettings.exercise_duration,
    exercisesLength: workoutsDefaultSettings.exercises,
    roundsLength: workoutsDefaultSettings.rounds,
    restDuration: workoutsDefaultSettings.rest_duration,
    betweenRoundsDuration: workoutsDefaultSettings.rest_between_rounds,
    activeExerciseIndex: 0,
    activeRoundIndex: 0
  };
  const testHiitWB = new HIITWorkoutBuilderService();
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