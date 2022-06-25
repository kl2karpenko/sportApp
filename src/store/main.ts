import { configureStore } from "@reduxjs/toolkit";
import { workoutSessionSlice } from "./workoutSession";

export const store = configureStore({
  reducer: {
    workoutSession: workoutSessionSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;