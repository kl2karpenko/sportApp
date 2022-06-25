import HIITWorkoutBuilderService from "./HIITWorkoutBuilderService";
import workoutsDefaultSettings from "../../data/workoutsDefaultSettings";

describe("HIITWorkoutBuilderService", () => {
  it("new instance should have a generator and session instance inside of it", () => {
    const instHIITWorkoutService = new HIITWorkoutBuilderService({
      exerciseDuration: workoutsDefaultSettings.exercise_duration,
      exercisesLength: workoutsDefaultSettings.exercises,
      roundsLength: workoutsDefaultSettings.rounds,
      restDuration: workoutsDefaultSettings.rest_duration,
      betweenRoundsDuration: workoutsDefaultSettings.rest_between_rounds
    });

    expect(instHIITWorkoutService.workoutSession).toBeDefined();
  });

  it("should be able to generate a workout and strre values in workoutSession", () => {
    const instHIITWorkoutService = new HIITWorkoutBuilderService({
      exerciseDuration: workoutsDefaultSettings.exercise_duration,
      exercisesLength: workoutsDefaultSettings.exercises,
      roundsLength: workoutsDefaultSettings.rounds,
      restDuration: workoutsDefaultSettings.rest_duration,
      betweenRoundsDuration: workoutsDefaultSettings.rest_between_rounds
    });

    instHIITWorkoutService.generateWorkout();

    expect(instHIITWorkoutService.workoutSession.rounds.length).toBe(workoutsDefaultSettings.rounds);
  });

  describe("generateBodyParts", () => {
    const instHIITWorkoutService = new HIITWorkoutBuilderService({
      exerciseDuration: workoutsDefaultSettings.exercise_duration,
      exercisesLength: workoutsDefaultSettings.exercises,
      roundsLength: workoutsDefaultSettings.rounds,
      restDuration: workoutsDefaultSettings.rest_duration,
      betweenRoundsDuration: workoutsDefaultSettings.rest_between_rounds
    });

    test("should return empty list when there is zero rounds", () => {
      expect(instHIITWorkoutService.generateBodyParts(0).length).toBe(0);
    });
    test("should return list of body parts shuffled", () => {
      expect(instHIITWorkoutService.generateBodyParts(2).length).toBe(2);
    });
  });
})