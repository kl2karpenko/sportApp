import Workout from "./Workout";
import { IWorkoutSettings } from "../../interfaces/IWorkoutSettings";
import TabataWorkoutBuilder from "../../builders/Workout/TabataWorkoutBuilder";
import TabataWorkoutSession from "../WorkoutSession/TabataWorkoutSession";

export default class TabataWorkout extends Workout {
  workoutBuilder: TabataWorkoutBuilder;
  workoutSession: TabataWorkoutSession;

  constructor(props: IWorkoutSettings) {
    super();

    this.workoutBuilder = new TabataWorkoutBuilder();
    this.workoutSession = new TabataWorkoutSession(props);
  }

  generateWorkoutSession(): void {
    // const bodyPartsList = this.workoutBuilder.getRandomBodyParts(this.workoutSession.roundsLength);
    //
    // console.log(bodyPartsList, " bodyPartsList");

    // this.rounds =
  }
}