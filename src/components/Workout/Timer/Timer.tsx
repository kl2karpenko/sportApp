import React, { useContext } from "react";

import { SportAppContext } from "../../../SportAppContext";
import {setNextStep, toNextExercise, toPreviousExercise} from "../../../helpers/workoutHelpers";
import { IWorkoutSession } from "../../../interfaces_deprecated/IWorkoutSession";
import { IWorkoutDeprecatedObj } from "../../../interfaces_deprecated/IWorkoutDeprecatedObj";
import CustomTimer from "./CustomTimer";

const getIntervalForTimer = ({ currentWorkoutSession, workoutSettings }: { currentWorkoutSession: IWorkoutSession; workoutSettings: IWorkoutDeprecatedObj }): Date => {
  let interval = 0;

  if (currentWorkoutSession.isResting) {
    if (currentWorkoutSession.exercise < workoutSettings.exercises) {
      interval = workoutSettings.rest_duration;
    } else {
      interval = workoutSettings.rest_between_rounds;
    }
  }  else if (currentWorkoutSession.inProgress) {
    interval = workoutSettings.exercise_duration;
  }

  const time = new Date();
  time.setSeconds(time.getSeconds() + interval);
  return time;
};

export default function Timer(): React.ReactElement {
  const { workoutSettings, currentWorkoutSession, setCurrentWorkoutSession } = useContext(SportAppContext);
  const expiryTimestamp = getIntervalForTimer({ currentWorkoutSession, workoutSettings });
  const setNextStepInWorkout = () => {
    const previousSessionValues = JSON.parse(JSON.stringify(currentWorkoutSession));
    const updatedWorkoutState: IWorkoutSession = setNextStep({
      currentWorkoutSession, workoutSettings, previousSessionValues
    });
    setCurrentWorkoutSession(updatedWorkoutState);

    return getIntervalForTimer({ currentWorkoutSession: updatedWorkoutState, workoutSettings });
  };
  const moveToNext = (): Date => {
    const previousSessionValues = JSON.parse(JSON.stringify(currentWorkoutSession));
    const updatedWorkoutState: IWorkoutSession = setNextStep({
      currentWorkoutSession, workoutSettings, previousSessionValues
    });
    setCurrentWorkoutSession(updatedWorkoutState);

    console.log("moveToNext", updatedWorkoutState);

    return getIntervalForTimer({ currentWorkoutSession: updatedWorkoutState, workoutSettings });
  };
  const moveToPrevious = (): Date => {
    const updatedWorkoutState: IWorkoutSession = toPreviousExercise({
      currentWorkoutSession, workoutSettings
    });
    setCurrentWorkoutSession(updatedWorkoutState);

    return getIntervalForTimer({ currentWorkoutSession: updatedWorkoutState, workoutSettings });
  };

  return (
    <CustomTimer
      key="customTimer"
      setNextStepInWorkout={setNextStepInWorkout}
      expiryTimestamp={expiryTimestamp}
      isResting={currentWorkoutSession.isResting}
      moveToNext={moveToNext}
      moveToPrevious={moveToPrevious}
    />
  )
}