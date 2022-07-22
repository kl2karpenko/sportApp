import TabataWorkoutExercisesGeneratorService from "./TabataWorkoutExercisesGeneratorService";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { WorkoutAlgorithms } from "./WorkoutAlgorithms";
import { IExercisesList } from "../../models/ExercisesList/IExercisesList";
import ExercisesList from "../../models/ExercisesList/ExercisesList";
import { tabataDefaultSettings } from "../../data/workoutsDefaultSettings";
import { WorkoutType } from "../../interfaces/WorkoutType";

describe("TabataWorkoutExercisesGeneratorService", () => {
  const len = tabataDefaultSettings.exercisesLength;
  const bodyPart = EBodyParts.abs;
  const allExercisesData: IExercisesList = new ExercisesList({ workoutType: WorkoutType.Tabata });

  let testWorkoutExercisesGeneratorService: TabataWorkoutExercisesGeneratorService;
  beforeEach(() => {
    testWorkoutExercisesGeneratorService = new TabataWorkoutExercisesGeneratorService(len, bodyPart);
  });

  describe("getShuffledList", () => {
    test("should return random shuffled list of all exercises", () => {
      const ex = testWorkoutExercisesGeneratorService.getShuffledList(
        testWorkoutExercisesGeneratorService.getListOfExercisesForCurrentBodyPart()
      );

      expect(ex.length).toBe(allExercisesData.getExercisesForBodyPart(bodyPart).length);
    });
  });

  describe("getExercisesList", () => {
    test("should return list of exercises based on an algorithm, default is simple algorithm if algorithm is not defined", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesList();

      expect(list.length).toBe(len);
    });
  });
});