import { TValues } from "../interfaces/TValues";

export const BodyParts = {
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

const bodyPartsForWorkout: { [key in TValues<typeof BodyParts>]: string } = {
  [BodyParts.legsFront]: "Ноги передняя часть",
  [BodyParts.legsInside]: "Ноги внутренняя часть",
  [BodyParts.legsOutside]: "Ноги внешняя часть",
  [BodyParts.legsRear]: "Ноги задняя часть",
  [BodyParts.legsAss]: "Задница",
  [BodyParts.hands]: "Руки",
  [BodyParts.back]: "Спина",
  [BodyParts.abs]: "Пресс",
  [BodyParts.abs_left_right]: "Боковой пресс",
  [BodyParts.cardio]: "Кардио"
} as const;

export default bodyPartsForWorkout;