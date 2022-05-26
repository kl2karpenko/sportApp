import BasicWorkout from "./BasicWorkout";
import { IWorkoutSettings } from "../../interfaces/IWorkoutSettings";
import TabataWorkoutBuilder from "../WorkoutBuilder/TabataWorkoutBuilder";
import TabataWorkoutSession from "../WorkoutSession/TabataWorkoutSession";

export default class TabataWorkout extends BasicWorkout {
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