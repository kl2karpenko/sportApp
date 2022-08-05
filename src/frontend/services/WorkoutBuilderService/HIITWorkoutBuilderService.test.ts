import HIITWorkoutBuilderService from "./HIITWorkoutBuilderService";
import { hiitDefaultSettings } from "../../data/workoutsDefaultSettings";
import { testHiitWorkoutSession } from "../../mockedData/testWorkoutSession";

describe("HIITWorkoutBuilderService", () => {
  it("should be able to generate a workout and strre values in workoutSession", () => {
    const instHIITWorkoutService = new HIITWorkoutBuilderService();

    const generatedRounds = instHIITWorkoutService.generateWorkout(testHiitWorkoutSession);

    expect(generatedRounds.length).toBe(hiitDefaultSettings.roundsLength);
  });

  describe("generateBodyParts", () => {
    const instHIITWorkoutService = new HIITWorkoutBuilderService();

    test("should return empty list when there is zero rounds", () => {
      expect(instHIITWorkoutService.generateBodyParts(0).length).toBe(0);
    });

    test("should return list of body parts shuffled", () => {
      expect(instHIITWorkoutService.generateBodyParts(2).length).toBe(2);
    });
  });
})