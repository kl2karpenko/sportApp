import { createSelector, createSlice } from "@reduxjs/toolkit";
import { TValues } from "../interfaces/TValues";
import bodyPartsForWorkout, { EBodyParts } from "../data/bodyPartsForWorkout";

export type IBodyPartsStateState = {
  list: TValues<typeof EBodyParts>[],
  labels: { [key in TValues<typeof EBodyParts>]: string }
};

const initialState: IBodyPartsStateState = {
  list: Object.keys(bodyPartsForWorkout) as TValues<typeof EBodyParts>[],
  labels: bodyPartsForWorkout
};

// REDUCER =======
export const bodyPartsSlice = createSlice({
  name: "bodyParts",
  initialState,
  reducers: {
    // setActiveRoundIndex: (state: IWorkoutSessionState, action: PayloadAction<number>) => {
    //   state.activeRoundIndex = action.payload;
    //   return state;
    // }
  },
});

// SELECTORS =======
export const getBodyPartsList = (state: IBodyPartsStateState) => state.list;
export const getBodyPartsLabels = (state: IBodyPartsStateState) => state.labels;
export const getBodyPartLabel = createSelector([
  getBodyPartsLabels,
  (state: IBodyPartsStateState, label: TValues<typeof EBodyParts>) => label
], (labels, label): string => labels[label]);

export default bodyPartsSlice.reducer;