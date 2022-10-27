import HIITRoundBuilderService from "./HIITRoundBuilderService";
import HIITWorkoutBuilderService from "../WorkoutBuilderService/HIITWorkoutBuilderService";
import { testHiitWorkoutSession } from "../../mockedData/testWorkoutSession";

describe("HIITRoundBuilderService", () => {
  const testHiitWB = new HIITWorkoutBuilderService();
  const testHiitRB = new HIITRoundBuilderService();

  describe("generateRound", () => {
    test("should return error when there is 0 rounds", () => {
      expect(() => {
        testHiitRB.generate({
          // @ts-ignore
          workoutSession: {
            ...testHiitWorkoutSession,
            roundsLength: 0
          }, bodyPartsIdForEachRound: []
        });
      }).toThrow(Error);
    });

    test("should return random body parts for number of rounds", () => {
      const results = testHiitRB.generate({
        // @ts-ignore
        workoutSession: {
          ...testHiitWorkoutSession,
          roundsLength: 3
        },
        bodyPartsIdForEachRound: testHiitWB.generateBodyParts(3)
      });

      expect(results.length).toBe(3);
    });
  });

  describe("generate", () => {
    test("should return error when there is 0 rounds", () => {
      expect(() => testHiitRB.generate({
        // @ts-ignore
        workoutSession: {
          ...testHiitWorkoutSession,
          roundsLength: 0
        },
        bodyPartsIdForEachRound: []
      })).toThrow(Error);
    });

    test("should return random body parts for number of rounds", () => {
      const results = testHiitRB.generate({
        // @ts-ignore
        workoutSession: {
          ...testHiitWorkoutSession,
          roundsLength: 3
        },
        bodyPartsIdForEachRound: testHiitWB.generateBodyParts(3)
      });

      expect(results.length).toBe(3);
    });
  });
});