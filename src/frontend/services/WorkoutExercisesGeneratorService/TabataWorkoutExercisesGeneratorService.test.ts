import TabataWorkoutExercisesGeneratorService from "./TabataWorkoutExercisesGeneratorService";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { IExercisesList } from "../../models/ExercisesList/IExercisesList";
import ExercisesList from "../../models/ExercisesList/ExercisesList";
import { tabataDefaultSettings } from "../../data/workoutsDefaultSettings";
import { WorkoutType } from "../../interfaces/WorkoutType";
import { mockedWorkoutTypes } from "../../mockedData/exercises";

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
      const ex = testWorkoutExercisesGeneratorService.getShuffledList(
        testWorkoutExercisesGeneratorService.getListOfExercisesForCurrentBodyPart()
      );

      expect(ex.length).toBe(allExercisesData.getExercisesForBodyPart(bodyPart).length);
    });
  });

  describe("getExercisesList", () => {
    test("should return 3 exercises for Tabata", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesList();

      expect(list.length).toBe(3);
    });
  });
});