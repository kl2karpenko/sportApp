import React from "react";

import CustomTimer from "./CustomTimer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import ActiveWorkoutManagerService from "../../../services/ActiveWorkoutManagerService/ActiveWorkoutManagerService";
import { updateWorkoutState } from "../../../store/activeWorkout";

export default function Timer({ activeWorkoutManager }: { activeWorkoutManager: ActiveWorkoutManagerService }): React.ReactElement {
  const dispatch = useDispatch();
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  const expiryTimestamp = activeWorkoutManager.getDateForTimer(activeWorkout);
  const isEnded = activeWorkout.isEnded;

  if (activeWorkout.isEnded) return <span />;

  return (
    <CustomTimer
      key="customTimer"
      // setNextStepInWorkout={() => activeWorkoutManager.moveToNextStep(activeWorkout)}
      expiryTimestamp={expiryTimestamp}
      isResting={activeWorkout.isResting}
      isEnded={activeWorkout.isEnded}
      moveToNext={() => {
        // updated state
        const newActiveWorkoutState = activeWorkoutManager.moveToNextStep(activeWorkout);
        const { isEnded } = newActiveWorkoutState;
        dispatch(updateWorkoutState(newActiveWorkoutState));

        if (isEnded) {
          return null;
        }

        return activeWorkoutManager.getDateForTimer(newActiveWorkoutState);
      }}
      moveToPrevious={() => {
        // updated state
        const newActiveWorkoutState = activeWorkoutManager.moveToPreviousStep(activeWorkout);
        dispatch(updateWorkoutState(newActiveWorkoutState));

        return activeWorkoutManager.getDateForTimer(newActiveWorkoutState);
      }}
    />
  )
}