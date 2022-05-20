import Workout from "./Workout";
import HIITWorkoutBuilder from "../../builders/Workout/HIITWorkoutBuilder";
import { IWorkoutSettings } from "../../interfaces/IWorkoutSettings";
import HIITWorkoutSession from "../WorkoutSession/HIITWorkoutSession";

export default class HIITWorkout extends Workout {
  workoutBuilder: HIITWorkoutBuilder;
  workoutSession: HIITWorkoutSession;

  constructor(props: IWorkoutSettings) {
    super();

    this.workoutBuilder = new HIITWorkoutBuilder();
    this.workoutSession = new HIITWorkoutSession(props);
  }

  generateWorkoutSession(): void {
    const roundsEntities = this.workoutBuilder.getRandomBodyParts(this.workoutSession.roundsLength);

    console.log(roundsEntities, " roundsEntities");
  }
}