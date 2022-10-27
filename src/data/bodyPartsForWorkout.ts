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
  [EBodyParts.legsFront]: "Ноги передняя часть",
  [EBodyParts.legsInside]: "Ноги внутренняя часть",
  [EBodyParts.legsOutside]: "Ноги внешняя часть",
  [EBodyParts.legsRear]: "Ноги задняя часть",
  [EBodyParts.legsAss]: "Задница",
  [EBodyParts.hands]: "Руки",
  [EBodyParts.back]: "Спина",
  [EBodyParts.abs]: "Пресс",
  [EBodyParts.abs_left_right]: "Боковой пресс",
  [EBodyParts.cardio]: "Кардио"
} as const;

export default bodyPartsForWorkout;