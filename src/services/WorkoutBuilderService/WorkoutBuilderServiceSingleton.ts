import WorkoutBuilderService from "./WorkoutBuilderService";
import { WorkoutType } from "../../interfaces/WorkoutType";
import WorkoutBuilder from "../WorkoutBuilder";

class WorkoutAbstractBuilderServiceFactory {
  private workoutBuilder: WorkoutBuilder;

  constructor() {
    this.workoutBuilder = new WorkoutBuilder();
  }

  public getService(workoutType: WorkoutType): WorkoutBuilderService {
    return this.workoutBuilder.getWorkoutBuilderService(workoutType);
  }
}

function WorkoutBuilderServiceSingleton () {
  const workoutBuilderServiceInstance: WorkoutAbstractBuilderServiceFactory = new WorkoutAbstractBuilderServiceFactory();
  let serviceInstance: WorkoutBuilderService | null = null;
  let workoutTypePrivate: WorkoutType | null = null;

  return (() => ({
    getService: (workoutType: WorkoutType) => {
      if (serviceInstance === null || workoutType !== workoutTypePrivate) {
        workoutTypePrivate = workoutType;
        serviceInstance = workoutBuilderServiceInstance.getService(workoutType);
      }

      return serviceInstance;
    }
  }))();
}

export default WorkoutBuilderServiceSingleton();