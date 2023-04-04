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

  public getExercisesList(props?: ITabataWorkoutGetExercisesListConfig): Partial<IExercise>[] {
    const { includeCardio = true } = props || {};
    const listOfExercises = this.listOfExercisesForCurrentBodyPart;
    let cardioList = [];

    const shuffledExercises = this.getShuffledList(listOfExercises);

    if (includeCardio) {
      cardioList = this.getShuffledList(this.allExercisesData.getCardioExercisesList());
      return [shuffledExercises[0], cardioList[0], shuffledExercises[1], cardioList[1]];
    }

    return [shuffledExercises[0], shuffledExercises[1]];
  }
}