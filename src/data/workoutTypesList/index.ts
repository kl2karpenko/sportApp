import { exercises as legsFront } from "./legsFront";
import { exercises as cardio } from "./cardio";
import { exercises as legsRear } from "./legsRear";
import { exercises as legsInside } from "./legsInside";
import { exercises as legsOutside } from "./legsOutside";
import { exercises as legsAss } from "./legsAss";
import { exercises as abs } from "./abs";
import { exercises as abs_left_right } from "./abs_left_right";
import { exercises as hands } from "./hands";
import { exercises as back } from "./back";
import { EBodyParts } from "../bodyPartsForWorkout";
import IExercise from "../../models/Exercise/IExercise";
import {TValues} from "../../interfaces_deprecated/TValues";

const workoutTypes: { [key in TValues<typeof EBodyParts>]: IExercise[] } = {
  [EBodyParts.legsFront]: legsFront,
  [EBodyParts.legsRear]: legsRear,
  [EBodyParts.legsInside]: legsInside,
  [EBodyParts.legsOutside]: legsOutside,
  [EBodyParts.legsAss]: legsAss,
  [EBodyParts.abs]: abs,
  [EBodyParts.abs_left_right]: abs_left_right,
  [EBodyParts.back]: back,
  [EBodyParts.hands]: hands,
  [EBodyParts.cardio]: cardio
};

export default workoutTypes;