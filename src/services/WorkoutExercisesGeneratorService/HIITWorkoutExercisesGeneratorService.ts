import IExercise from "../../models/Exercise/IExercise";
import { WorkoutAlgorithms } from "./WorkoutAlgorithms";
import WorkoutExercisesGeneratorService, { IWorkoutExercisesGeneratorServiceConfig } from "./WorkoutExercisesGeneratorService";
import ExercisesList from "../../models/ExercisesList/ExercisesList";
import { WorkoutType } from "../../interfaces/WorkoutType";

export interface IHiitWorkoutGetExercisesListConfig {
  includeCardio?: boolean;
  cardioStep?: number;
  algorithm?: WorkoutAlgorithms;
}

export default class HIITWorkoutExercisesGeneratorService extends WorkoutExercisesGeneratorService {
  constructor(props: IWorkoutExercisesGeneratorServiceConfig) {
    const { exercises, cardioExercises } = props;
    super(props);

    this.allExercisesData = new ExercisesList({ workoutType: WorkoutType.HIIT, exercises, cardioExercises });
  }

  public getExercisesList(props: IHiitWorkoutGetExercisesListConfig = { includeCardio: true, cardioStep: 2, algorithm: WorkoutAlgorithms.simple }): Partial<IExercise>[] {
    switch (props?.algorithm) {
    case WorkoutAlgorithms.simple:
      return this.getExercisesListForSimpleAlgorithm(props);
    default:
      return [];
    }
  }

  protected getExercisesListForSimpleAlgorithm(props?: IHiitWorkoutGetExercisesListConfig): Partial<IExercise>[] {
    const listOfExercises = this.listOfExercisesForCurrentBodyPart;
    if (listOfExercises.length === 0) return [];

    const shuffledExercises = this.getShuffledList(listOfExercises);
    let allExercises = [ ...shuffledExercises ];
    
    if (props?.includeCardio) {
      allExercises = this.addCardioExercisesToList(allExercises, props?.cardioStep);
    }

    allExercises.length = this.exercisesInRoundLength;

    return allExercises;
  }

  protected addCardioExercisesToList(exercisesList: Partial<IExercise>[], step: number = 2): Partial<IExercise>[] {
    const arrLen = exercisesList.length;
    if (this.memoizedShuffledCardioList.length === 0) {
      this.memoizedShuffledCardioList = this.getShuffledList(this.allExercisesData.getCardioExercisesList());
    }

    let addingToPosition = 0;

    for (let i = 0; i < arrLen + addingToPosition; i = i + step) {
      addingToPosition++;
      exercisesList.splice(i, 0, this.memoizedShuffledCardioList[i]);
    }

    return exercisesList.slice(0, arrLen);
  }
}