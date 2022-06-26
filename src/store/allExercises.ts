import {createSelector, createSlice} from "@reduxjs/toolkit";
import { flatten } from "lodash-es";

import IExercise from "../models/Exercise/IExercise";
import {TValues} from "../interfaces/TValues";
import { EBodyParts } from "../data/bodyPartsForWorkout";
import workoutTypes from "../data/workoutTypesList";
import { IBodyPartsStateState } from "./bodyParts";

export type IAllExercisesState = {
  exercisesList: { [key in TValues<typeof EBodyParts>]: IExercise[] },
  cardioExercisesList: IExercise[],
  exercisesListAsArray: IExercise[]
};

const initialState: IAllExercisesState = {
  exercisesList: workoutTypes,
  exercisesListAsArray: flatten(Object.values(workoutTypes).map((exercisesList: IExercise[]) => exercisesList, [])),
  cardioExercisesList: workoutTypes.cardio
}

export const allExercisesSlice = createSlice({
  name: "allExercises",
  initialState,
  reducers: {
    // setActiveRoundIndex: (state: IWorkoutSessionState, action: PayloadAction<number>) => {
    //   state.activeRoundIndex = action.payload;
    //   return state;
    // }
  },
});

export const geExercisesList = (state: IAllExercisesState) => state.exercisesList;
export const geExercisesListForBodyPart = createSelector([
  geExercisesList,
  (state: IBodyPartsStateState, bodyId: TValues<typeof EBodyParts>) => bodyId
], (list, bodyId): IExercise[] => list[bodyId]);

export const getExercisesListAsArray = (state: IAllExercisesState) => state.exercisesListAsArray;
export const getCardioExercisesList = (state: IAllExercisesState) => state.cardioExercisesList;

// Action creators are generated for each case reducer function
// export const {} = allExercisesSlice.actions

export default allExercisesSlice.reducer;