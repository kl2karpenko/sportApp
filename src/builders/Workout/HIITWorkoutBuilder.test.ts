import HIITWorkoutBuilder from "./HIITWorkoutBuilder";
import { WorkoutType } from "../../interfaces/WorkoutType";

describe("HIITWorkoutBuilder", () => {
  const hiitWB = new HIITWorkoutBuilder(WorkoutType.HIIT);

  describe("getRandomBodyParts", () => {
    test("should return error when there is 0 rounds", () => {
      expect(() => hiitWB.getRandomBodyParts(0)).toThrow(Error);
    });

    test("should return random body parts for number of rounds", () => {
      expect(hiitWB.getRandomBodyParts(3).length).toBe(3);
    });
  });
});