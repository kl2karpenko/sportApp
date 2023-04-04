import ActiveWorkoutManagerService from "./ActiveWorkoutManagerService";
import { IActiveWorkoutManagerService } from "./IActiveWorkoutManagerService";

export default class TabataWorkoutManagerService extends ActiveWorkoutManagerService {
  public indexes: {
    [key: string]: number;
  };

  public static TABATA_EXERCISES_INDEXES = {
    firstExWithCardio: 0,
    firstExWithoutCardio: 0,
    secondExWithCardio: 2,
    secondExWithoutCardio: 1,
    firstRoundExIndexLimit: 3,
    firstCardioExIndex: 1,
    secondCardioExIndex: 3,
  };

  constructor(props: IActiveWorkoutManagerService) {
    super(props);

    this.indexes = TabataWorkoutManagerService.TABATA_EXERCISES_INDEXES;
  }

  public getExercisePositionByIndex = (exInd: number, includeCardio: boolean): number => {
    const firstExIndex = includeCardio ? this.indexes.firstExWithCardio : this.indexes.firstExWithoutCardio;
    const secondExIndex = includeCardio ? this.indexes.secondExWithCardio : this.indexes.secondExWithoutCardio;

    if (exInd === 0) {
      return firstExIndex;
    }

    return secondExIndex;
  }

  public getCardioExercisePositionByCardioExIndex = (exInd: number): number => {
    if (exInd === 0) {
      return this.indexes.firstCardioExIndex;
    }

    return this.indexes.secondCardioExIndex;
  }
}