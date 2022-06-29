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

  return (
    <CustomTimer
      key="customTimer"
      // setNextStepInWorkout={() => activeWorkoutManager.moveToNextStep(activeWorkout)}
      expiryTimestamp={expiryTimestamp}
      isResting={activeWorkout.isResting}
      moveToNext={() => {
        // updated state
        const newActiveWorkoutState = activeWorkoutManager.moveToNextStep(activeWorkout);
        dispatch(updateWorkoutState(newActiveWorkoutState));

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