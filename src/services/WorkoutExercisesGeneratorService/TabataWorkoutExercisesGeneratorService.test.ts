import TabataWorkoutExercisesGeneratorService, {
  ITabataWorkoutGetExercisesListConfig
} from "./TabataWorkoutExercisesGeneratorService";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { IExercisesList } from "../../models/ExercisesList/IExercisesList";
import ExercisesList from "../../models/ExercisesList/ExercisesList";
import { WorkoutType } from "../../interfaces/WorkoutType";
import { mockedWorkoutTypes } from "../../data/exercices";
import { tabataDefaultSettings } from "../../mockedData/testWorkoutSession";
import IExercise from "../../models/Exercise/IExercise";

interface ITEST_TabataWorkoutExercisesGeneratorService {
  getShuffledList(list: Partial<IExercise>[]): Partial<IExercise>[];
  getExercisesList(props?: ITabataWorkoutGetExercisesListConfig): Partial<IExercise>[];
}

describe("TabataWorkoutExercisesGeneratorService", () => {
  const len = tabataDefaultSettings.exercisesLength;
  const bodyPart = EBodyParts.abs;
  const allExercisesData: IExercisesList = new ExercisesList({ workoutType: WorkoutType.Tabata, exercises: mockedWorkoutTypes, cardioExercises: mockedWorkoutTypes.cardio });

  let testWorkoutExercisesGeneratorService: TabataWorkoutExercisesGeneratorService;
  beforeEach(() => {
    testWorkoutExercisesGeneratorService = new TabataWorkoutExercisesGeneratorService({ exercisesLength: len, bodyPartName: bodyPart, exercises: mockedWorkoutTypes, cardioExercises: mockedWorkoutTypes.cardio });
  });

  describe("getShuffledList", () => {
    test("should return random shuffled list of all exercises", () => {
      const ex = (testWorkoutExercisesGeneratorService as unknown as ITEST_TabataWorkoutExercisesGeneratorService).getShuffledList(
        testWorkoutExercisesGeneratorService.getListOfExercisesForCurrentBodyPart()
      );

      expect(ex.length).toBe(allExercisesData.getExercisesForBodyPart(bodyPart).length);
    });
  });

  describe("getExercisesList", () => {
    test("should return 4 exercises for Tabata with cardio flag true by default", () => {
      const list = (testWorkoutExercisesGeneratorService as unknown as ITEST_TabataWorkoutExercisesGeneratorService).getExercisesList();

      expect(list.length).toBe(4);
    });

    test("should return 2 exercises for Tabata with cardio flag set to false", () => {
      const list = (testWorkoutExercisesGeneratorService as unknown as ITEST_TabataWorkoutExercisesGeneratorService).getExercisesList({ includeCardio: false });

      expect(list.length).toBe(2);
    });
  });
});