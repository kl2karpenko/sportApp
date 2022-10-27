import { TValues } from "./TValues";
import { EBodyParts } from "../data/bodyPartsForWorkout";
import IExercise from "../models/Exercise/IExercise";

export type TAllExercises = { [key in TValues<typeof EBodyParts>]: Partial<IExercise>[] };