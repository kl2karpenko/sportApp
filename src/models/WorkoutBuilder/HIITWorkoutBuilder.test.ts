import HIITWorkoutBuilder from "./HIITWorkoutBuilder";
import HIITWorkoutSession from "../WorkoutSession/HIITWorkoutSession";
import workoutDefaultSettings from "../../data/workoutDefaultSettings";

describe("HIITWorkoutBuilder", () => {
  const testHiitWB = new HIITWorkoutBuilder();
  const testHiitWorkoutSession = new HIITWorkoutSession({
    exerciseDuration: workoutDefaultSettings.exercise_duration,
    exercisesLength: workoutDefaultSettings.exercises,
    roundsLength: workoutDefaultSettings.rounds,
    restDuration: workoutDefaultSettings.rest_duration,
    betweenRoundsDuration: workoutDefaultSettings.rest_between_rounds
  });

  describe("generateWorkout", () => {
    test("should return error when there is 0 rounds", () => {
      expect(() => testHiitWB.generateWorkout({
        ...testHiitWorkoutSession,
        roundsLength: 0
      })).toThrow(Error);
    });

    test("should return random body parts for number of rounds", () => {
      expect(testHiitWB.generateWorkout({
        ...testHiitWorkoutSession,
        roundsLength: 3
      }).length).toBe(3);
    });
  });
});