import legsFront from "./types/legsFront";
import legsRear from "./types/legsRear";
import legsInside from "./types/legsInside";
import legsOutside from "./types/legsOutside";
import legsAss from "./types/legsAss";
import abs from "./types/abs";
import abs_left_right from "./types/abs_left_right";
import back from "./types/back";
import hands from "./types/hands";
import cardio from "./types/cardio";

export const defaultHiitSettings = {
  roundsLength: 8,
  exercisesLength: 8,
  exerciseDuration: 40,
  restDuration: 20,
  betweenRoundsDuration: 60
};

export default {
  "legsFront": legsFront,
  "legsRear": legsRear,
  "legsInside": legsInside,
  "legsOutside": legsOutside,
  "legsAss": legsAss,
  "abs": abs,
  "abs_left_right": abs_left_right,
  "back": back,
  "hands": hands,
  "cardio": cardio
}