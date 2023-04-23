import TabataWorkoutManagerService from "./TabataWorkoutManagerService";
import { hiitDefaultSettings } from "../../data/workoutsDefaultSettings";
import { IActiveWorkoutState } from "./IActiveWorkoutState";
import { testHiitWorkoutSession } from "../../mockedData/testWorkoutSession";
import { IWorkoutSessionState } from "../../store/workoutSession";

let activeWorkoutState: IActiveWorkoutState = {
  activeExerciseIndex: 0,
  activeRoundIndex: 0,
  isResting: false,
  isEnded: false
};
const workoutSession: IWorkoutSessionState = {
  ...testHiitWorkoutSession
};

describe("TabataWorkoutManagerService", function () {
  const activeWorkoutManager = new TabataWorkoutManagerService({
    workoutSession
  });

  describe("getExercisePositionByIndex", () => {
    test("should return 0 index for 1 exercise when there is cardio", () => {
      const result = activeWorkoutManager.getExercisePositionByIndex(0, true);

      expect(result).toBe(TabataWorkoutManagerService.TABATA_EXERCISES_INDEXES.firstExWithCardio);
    });

    test("should return 0 index for 1 exercise when there is no cardio", () => {
      const result = activeWorkoutManager.getExercisePositionByIndex(0, false);

      expect(result).toBe(TabataWorkoutManagerService.TABATA_EXERCISES_INDEXES.firstExWithoutCardio);
    });

    test("should return 2 index for 2 exercise when there is cardio", () => {
      const result = activeWorkoutManager.getExercisePositionByIndex(1, true);

      expect(result).toBe(TabataWorkoutManagerService.TABATA_EXERCISES_INDEXES.secondExWithCardio);
    });

    test("should return 2 index for 2 exercise when there is no cardio", () => {
      const result = activeWorkoutManager.getExercisePositionByIndex(1, false);

      expect(result).toBe(TabataWorkoutManagerService.TABATA_EXERCISES_INDEXES.secondExWithoutCardio);
    });
  });

  describe("getCardioExercisePositionByIndex", () => {
    test("should return 1 index for 1 cardio exercise", () => {
      const result = activeWorkoutManager.getCardioExercisePositionByCardioExIndex(0);

      expect(result).toBe(TabataWorkoutManagerService.TABATA_EXERCISES_INDEXES.firstCardioExIndex);
    });

    test("should return 3 index for 2 cardio exercise", () => {
      const result = activeWorkoutManager.getCardioExercisePositionByCardioExIndex(1);

      expect(result).toBe(TabataWorkoutManagerService.TABATA_EXERCISES_INDEXES.secondCardioExIndex);
    });
  });
});