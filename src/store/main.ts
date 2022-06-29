import { configureStore } from "@reduxjs/toolkit";
import { default as workoutSessionSliceReducer } from "./workoutSession";
import { bodyPartsSlice } from "./bodyParts";
import { allExercisesSlice } from "./allExercises";
import { activeWorkoutSlice } from "./activeWorkout";

export const store = configureStore({
  reducer: {
    workoutSession: workoutSessionSliceReducer,
    bodyParts: bodyPartsSlice.reducer,
    allExercises: allExercisesSlice.reducer,
    activeWorkout: activeWorkoutSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;