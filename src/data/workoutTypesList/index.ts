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
import { BodyParts } from "../bodyPartsForWorkout";
import { IBodyPartsForWorkout } from "../../interfaces/IBodyPartsForWorkout";

const workoutTypes: { [key: string]: IBodyPartsForWorkout[] } = {
  [BodyParts.legsFront]: legsFront,
  [BodyParts.legsRear]: legsRear,
  [BodyParts.legsInside]: legsInside,
  [BodyParts.legsOutside]: legsOutside,
  [BodyParts.legsAss]: legsAss,
  [BodyParts.abs]: abs,
  [BodyParts.abs_left_right]: abs_left_right,
  [BodyParts.back]: back,
  [BodyParts.hands]: hands,
  [BodyParts.cardio]: cardio
};

export type TWorkoutTypes = typeof workoutTypes;

export default workoutTypes;