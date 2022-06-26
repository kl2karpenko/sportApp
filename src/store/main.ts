import { configureStore } from "@reduxjs/toolkit";
import { workoutSessionSlice } from "./workoutSession";
import { bodyPartsSlice } from "./bodyParts";
import { allExercisesSlice } from "./allExercises";

export const store = configureStore({
  reducer: {
    workoutSession: workoutSessionSlice.reducer,
    bodyParts: bodyPartsSlice.reducer,
    allExercises: allExercisesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;