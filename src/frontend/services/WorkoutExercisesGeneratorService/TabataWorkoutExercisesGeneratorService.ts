import IExercise from "../../models/Exercise/IExercise";
import WorkoutExercisesGeneratorService, {
  IWorkoutExercisesGeneratorServiceConfig
} from "./WorkoutExercisesGeneratorService";
import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import ExercisesList from "../../models/ExercisesList/ExercisesList";
import { WorkoutType } from "../../interfaces/WorkoutType";
import { TAllExercises } from "../../interfaces/TAllExercises";

export interface ITabataWorkoutGetExercisesListConfig { includeCardio: boolean; }

export default class TabataWorkoutExercisesGeneratorService extends WorkoutExercisesGeneratorService {
  constructor(props: IWorkoutExercisesGeneratorServiceConfig) {
    const { exercises, cardioExercises } = props;
    super(props);

    this.allExercisesData = new ExercisesList({ workoutType: WorkoutType.HIIT, exercises, cardioExercises });
  }

  public getExercisesList(props: ITabataWorkoutGetExercisesListConfig = { includeCardio: true }): Partial<IExercise>[] {
    const { includeCardio } = props;
    console.log(includeCardio, " includeCardio");
    const listOfExercises = this.listOfExercisesForCurrentBodyPart;

    const shuffledExercises = this.getShuffledList(listOfExercises);
    const exercisesList = [shuffledExercises[0], shuffledExercises[1]];

    if (exercisesList[0].pair) {
      exercisesList.length = 1;
      exercisesList[1] = shuffledExercises[this.getExerciseIndexInList(shuffledExercises, exercisesList[0].pair)]
    }

    if (includeCardio) {
      if (this.memoizedShuffledCardioList.length === 0) {
        this.memoizedShuffledCardioList = this.getShuffledList(this.allExercisesData.getCardioExercisesList());
      }

      exercisesList.push(this.memoizedShuffledCardioList[0]);
    }

    return exercisesList;
  }
}