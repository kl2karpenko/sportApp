import HIITWorkoutExercisesGeneratorService, {
  IHiitWorkoutGetExercisesListConfig
} from "./HIITWorkoutExercisesGeneratorService";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { WorkoutAlgorithms } from "./WorkoutAlgorithms";
import { IExercisesList } from "../../models/ExercisesList/IExercisesList";
import ExercisesList from "../../models/ExercisesList/ExercisesList";
import { WorkoutType } from "../../interfaces/WorkoutType";
import { mockedWorkoutTypes } from "../../data/exercices";
import IExercise from "../../models/Exercise/IExercise";

interface ITEST_HIITWorkoutExercisesGeneratorService {
  getShuffledList(list: Partial<IExercise>[]): Partial<IExercise>[];
  getExercisesListForSimpleAlgorithm(props?: IHiitWorkoutGetExercisesListConfig): Partial<IExercise>[];
  addCardioExercisesToList(exercisesList: Partial<IExercise>[], step: number): Partial<IExercise>[];
  getExerciseIndexInList(exercisesList: Partial<IExercise>[], findId: string): number;
}

describe("HIITWorkoutExercisesGeneratorService", () => {
  let len = 6;
  const bodyPart = EBodyParts.abs;
  const allExercisesData: IExercisesList = new ExercisesList({ workoutType: WorkoutType.HIIT, exercises: mockedWorkoutTypes, cardioExercises: mockedWorkoutTypes.cardio });
  let testWorkoutExercisesGeneratorService: HIITWorkoutExercisesGeneratorService;
  beforeEach(() => {
    testWorkoutExercisesGeneratorService = new HIITWorkoutExercisesGeneratorService({ exercisesLength: len, bodyPartName: bodyPart, exercises: mockedWorkoutTypes, cardioExercises: mockedWorkoutTypes.cardio });
  });

  describe("getShuffledList", () => {
    test("should return random shuffled list of all exercises", () => {
      const ex = (testWorkoutExercisesGeneratorService as unknown as ITEST_HIITWorkoutExercisesGeneratorService).getShuffledList(
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

    test("should return list of exercises based on an algorithm: simple", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesList({ algorithm: WorkoutAlgorithms.simple });

      expect(list.length).toBe(len);
    });

    test("should return list of exercises based on an algorithm: withPair", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesList({ algorithm: WorkoutAlgorithms.simple });

      expect(list.length).toBe(len);
    });
  });

  describe("getExercisesListForSimpleAlgorithm", () => {
    test("should return correct number of exercises", () => {
      const list = (testWorkoutExercisesGeneratorService as unknown as ITEST_HIITWorkoutExercisesGeneratorService).getExercisesListForSimpleAlgorithm();

      expect(list.length).toBe(len);
    });

    test("should return a list of exercises if there is no ability to create a unique list the exercises can be repeated", () => {
      testWorkoutExercisesGeneratorService = new HIITWorkoutExercisesGeneratorService({ exercisesLength: 25, bodyPartName: EBodyParts.abs, exercises: mockedWorkoutTypes, cardioExercises: mockedWorkoutTypes.cardio });
      const list = (testWorkoutExercisesGeneratorService as unknown as ITEST_HIITWorkoutExercisesGeneratorService).getExercisesListForSimpleAlgorithm();

      expect(list.length).toBe(25);
    });

    test("should return a list of exercises with cardio with correct step of cardio exercises", () => {
      const len = 5;
      const cardioStep = 5;
      testWorkoutExercisesGeneratorService = new HIITWorkoutExercisesGeneratorService({ exercisesLength: len, bodyPartName: EBodyParts.abs, exercises: mockedWorkoutTypes, cardioExercises: mockedWorkoutTypes.cardio });
      const list = (testWorkoutExercisesGeneratorService as unknown as ITEST_HIITWorkoutExercisesGeneratorService).getExercisesListForSimpleAlgorithm({ cardioStep, includeCardio: true });

      expect(list.length).toBe(len);

      for (let i = 0; i < len; i += cardioStep) {
        expect(list[i]?.id?.includes("cardio")).toBe(true);
      }
    });

    test("should return a list of exercises without cardio if we say so", () => {
      const len = 5;
      testWorkoutExercisesGeneratorService = new HIITWorkoutExercisesGeneratorService({ exercisesLength: len, bodyPartName: EBodyParts.abs, exercises: mockedWorkoutTypes, cardioExercises: mockedWorkoutTypes.cardio });
      const list = (testWorkoutExercisesGeneratorService as unknown as ITEST_HIITWorkoutExercisesGeneratorService).getExercisesListForSimpleAlgorithm({ includeCardio: false });

      expect(list.length).toBe(len);
      expect(list[0]?.id?.includes("cardio")).toBe(false);
      expect(list[1]?.id?.includes("cardio")).toBe(false);
      expect(list[2]?.id?.includes("cardio")).toBe(false);
      expect(list[3]?.id?.includes("cardio")).toBe(false);
      expect(list[4]?.id?.includes("cardio")).toBe(false);
    });
  });

  describe("getExerciseIndexInList", () => {
    test("should return index of exercise", () => {
      const exercisesList = (testWorkoutExercisesGeneratorService as unknown as ITEST_HIITWorkoutExercisesGeneratorService).getShuffledList(testWorkoutExercisesGeneratorService.getListOfExercisesForCurrentBodyPart());
      const index = 4;
      const ex = exercisesList[index];
      const indexFound = (testWorkoutExercisesGeneratorService as unknown as ITEST_HIITWorkoutExercisesGeneratorService).getExerciseIndexInList(exercisesList, ex.id!);

      expect(indexFound).toBe(index);
    });
  });

  describe("addCardioExercisesToList", () => {
    test("should return correct number of exercises", () => {
      const list = testWorkoutExercisesGeneratorService.getExercisesList({ algorithm: WorkoutAlgorithms.simple });
      const result = (testWorkoutExercisesGeneratorService as unknown as ITEST_HIITWorkoutExercisesGeneratorService).addCardioExercisesToList(list, 3);

      expect(result.length).toBe(len);
    });
  });
});