import { TValues } from "../interfaces/TValues";

export const EBodyParts = {
  "legsFront": "legsFront",
  "legsInside": "legsInside",
  "legsOutside": "legsOutside",
  "legsRear": "legsRear",
  "legsAss": "legsAss",
  "hands": "hands",
  "back": "back",
  "abs": "abs",
  "abs_left_right": "abs_left_right",
  "cardio": "cardio"
} as const;

const bodyPartsForWorkout: { [key in TValues<typeof EBodyParts>]: string } = {
  [EBodyParts.legsFront]: "Legs front",
  [EBodyParts.legsInside]: "Legs inside",
  [EBodyParts.legsOutside]: "Legs outside",
  [EBodyParts.legsRear]: "Legs back",
  [EBodyParts.legsAss]: "Nuts",
  [EBodyParts.hands]: "Arms",
  [EBodyParts.back]: "Back",
  [EBodyParts.abs]: "Abs",
  [EBodyParts.abs_left_right]: "Side abs",
  [EBodyParts.cardio]: "Cardio"
} as const;

export default bodyPartsForWorkout;