import legsFront from "./shared/legsFront";
import legsRear from "./shared/legsRear";
import legsInside from "./shared/legsInside";
import legsOutside from "./shared/legsOutside";
import legsAss from "./shared/legsAss";
import abs from "./shared/abs";
import abs_left_right from "./shared/abs_left_right";
import back from "./shared/back";
import hands from "./shared/hands";
import cardio from "./shared/cardio";

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