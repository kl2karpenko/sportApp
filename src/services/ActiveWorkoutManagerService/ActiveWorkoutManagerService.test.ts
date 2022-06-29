import ActiveWorkoutManagerService from "./ActiveWorkoutManagerService";
import { hiitDefaultSettings } from "../../data/workoutsDefaultSettings";
import { IActiveWorkoutState } from "./IActiveWorkoutState";
import IWorkoutSession from "../../interfaces/IWorkoutSession";

let activeWorkoutState: IActiveWorkoutState = {
  activeExerciseIndex: 0,
  activeRoundIndex: 0,
  isResting: false,
  isEnded: false
};
const workoutSession: IWorkoutSession = {
  ...hiitDefaultSettings,
  rounds: []
};

describe("ActiveWorkoutManagerService", function () {
  const activeWorkoutManager = new ActiveWorkoutManagerService({
    workoutSession
  });

  describe("moveToNextStep", () => {
    test("it should move to rest if wasn't resting before", () => {
      const result = activeWorkoutManager.moveToNextStep(activeWorkoutState);

      expect(result).toMatchObject({
        activeExerciseIndex: 0,
        activeRoundIndex: 0,
        isResting: true,
        isEnded: false
      });
    });

    test("it should move from rest to next exercise if round not finished", () => {
      const result = activeWorkoutManager.moveToNextStep({
        ...activeWorkoutState,
        isResting: true
      });

      expect(result).toMatchObject({
        activeExerciseIndex: 1,
        activeRoundIndex: 0,
        isResting: false,
        isEnded: false
      });
    });

    test("it should move from rest to next round and set ex = 0 if round finished and we are resting between rounds", () => {
      const result = activeWorkoutManager.moveToNextStep({
        ...activeWorkoutState,
        activeExerciseIndex: workoutSession.exercisesLength - 1,
        isResting: true
      });

      expect(result).toMatchObject({
        activeExerciseIndex: 0,
        activeRoundIndex: 1,
        isResting: false,
        isEnded: false
      });
    });
  });
});