import IWorkoutSession from "../../interfaces/IWorkoutSession";
import { IActiveWorkoutManagerService } from "./IActiveWorkoutManagerService";
import { IActiveWorkoutState } from "./IActiveWorkoutState";
import ActiveWorkoutManagerService from "./ActiveWorkoutManagerService";
import { TABATA_EXERCISES_INDEXES } from "../../mockedData/testWorkoutSession";

export default class HiitWorkoutManagerService extends ActiveWorkoutManagerService {
  public getExerciseIndex = (exInd: number, includeCardio: boolean): number => {
    const firstExIndex = includeCardio ? TABATA_EXERCISES_INDEXES.firstExWithCardio : TABATA_EXERCISES_INDEXES.firstExWithoutCardio;
    const secondExIndex = includeCardio ? TABATA_EXERCISES_INDEXES.secondExWithCardio : TABATA_EXERCISES_INDEXES.secondExWithoutCardio;

    if (exInd === 0) {
      return firstExIndex;
    }

    return secondExIndex;
  }
}