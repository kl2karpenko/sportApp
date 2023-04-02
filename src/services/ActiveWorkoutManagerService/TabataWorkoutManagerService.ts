import ActiveWorkoutManagerService from "./ActiveWorkoutManagerService";
import { TABATA_EXERCISES_INDEXES } from "../../mockedData/testWorkoutSession";

export default class TabataWorkoutManagerService extends ActiveWorkoutManagerService {
  public TABATA_EXERCISES_INDEXES = {
    firstExWithCardio: 0,
    firstExWithoutCardio: 0,
    secondExWithCardio: 2,
    secondExWithoutCardio: 1,
    firstRoundExIndexLimit: 3,
    firstCardioExIndex: 1,
    secondCardioExIndex: 3,
  };

  public getExercisePositionByIndex = (exInd: number, includeCardio: boolean): number => {
    const firstExIndex = includeCardio ? TABATA_EXERCISES_INDEXES.firstExWithCardio : TABATA_EXERCISES_INDEXES.firstExWithoutCardio;
    const secondExIndex = includeCardio ? TABATA_EXERCISES_INDEXES.secondExWithCardio : TABATA_EXERCISES_INDEXES.secondExWithoutCardio;

    if (exInd === 0) {
      return firstExIndex;
    }

    return secondExIndex;
  }

  public getCardioExercisePositionByIndex = (exInd: number): number => {
    const firstExIndex = TABATA_EXERCISES_INDEXES.firstCardioExIndex;
    const secondExIndex = TABATA_EXERCISES_INDEXES.secondCardioExIndex;

    if (exInd === 0) {
      return firstExIndex;
    }

    return secondExIndex;
  }
}