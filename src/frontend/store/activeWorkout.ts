import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IActiveWorkoutState } from "../services/ActiveWorkoutManagerService/IActiveWorkoutState";

export const initialState: IActiveWorkoutState = {
  activeExerciseIndex: 0,
  activeRoundIndex: 0,
  isResting: false,
  isEnded: false
};

// REDUCER =======
export const activeWorkoutSlice = createSlice({
  name: "activeWorkout",
  initialState,
  reducers: {
    updateWorkoutState: (state: IActiveWorkoutState, action: PayloadAction<IActiveWorkoutState>) => {
      return {
        ...state,
        ...action.payload
      };
    }
  },
});

// HELPERS =======

// Action creators are generated for each case reducer function
export const {
  updateWorkoutState
} = activeWorkoutSlice.actions

export default activeWorkoutSlice.reducer;