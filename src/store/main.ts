import { configureStore } from "@reduxjs/toolkit";
import { default as workoutSessionSliceReducer } from "./workoutSession";
import { default as bodyPartsSliceReducer } from "./bodyParts";
import { default as allExercisesSliceReducer } from "./allExercises";
import { default as activeWorkoutSliceReducer } from "./activeWorkout";

export const store = configureStore({
  reducer: {
    workoutSession: workoutSessionSliceReducer,
    bodyParts: bodyPartsSliceReducer,
    allExercises: allExercisesSliceReducer,
    activeWorkout: activeWorkoutSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;