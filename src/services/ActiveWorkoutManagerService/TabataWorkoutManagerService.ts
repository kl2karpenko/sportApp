import IWorkoutSession from "../../interfaces/IWorkoutSession";
import { IActiveWorkoutManagerService } from "./IActiveWorkoutManagerService";
import { IActiveWorkoutState } from "./IActiveWorkoutState";
import ActiveWorkoutManagerService from "./ActiveWorkoutManagerService";
import { TABATA_EXERCISES_INDEXES } from "../../mockedData/testWorkoutSession";

export default class TabataWorkoutManagerService extends ActiveWorkoutManagerService {
  public TABATA_EXERCISES_INDEXES = {
    firstExWithCardio: 0,
    firstExWithoutCardio: 0,
    secondExWithCardio: 2,
    secondExWithoutCardio: 1,
    firstRoundEndIndex: 3,
    firstCardioExIndex: 1,
    secondCardioExIndex: 3,
  };

  public getExerciseIndex = (exInd: number, includeCardio: boolean): number => {
    const firstExIndex = includeCardio ? TABATA_EXERCISES_INDEXES.firstExWithCardio : TABATA_EXERCISES_INDEXES.firstExWithoutCardio;
    const secondExIndex = includeCardio ? TABATA_EXERCISES_INDEXES.secondExWithCardio : TABATA_EXERCISES_INDEXES.secondExWithoutCardio;

    if (exInd === 0) {
      return firstExIndex;
    }

    return secondExIndex;
  }
}