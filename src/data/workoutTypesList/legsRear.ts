import { IBodyPartsForWorkout } from "../../interfaces/IBodyPartsForWorkout";

export const exercises: IBodyPartsForWorkout[] = [
  {
    id: "legsRear-ex1",
    label: "Тяга левой ноги с эспандером лёжа на животе",
    isCardio: false,
    pair: "legsRear-ex2"
  },
  {
    id: "legsRear-ex2",
    label: "Тяга правой ноги с эспандером лёжа на животе",
    isCardio: false,
    pair: "legsRear-ex1"
  },
  {
    id: "legsRear-ex3",
    label: "Становая тяга с резинкой на ногах",
    isCardio: false
  },
  {
    id: "legsRear-ex4",
    label: "Наклоны с выносом левой ноги назад с гирями, вторая держит равновесие",
    isCardio: false,
    pair: "legsRear-ex5"
  }, {
    id: "legsRear-ex5",
    label: "Наклоны с выносом правой ноги назад с гирями, вторая держит равновесие",
    isCardio: false,
    pair: "legsRear-ex4"
  },
  {
    id: "legsRear-ex6",
    label: "Наклон к левой ноге, резинка на 2 ноге и делаем наклоны",
    isCardio: false,
    pair: "legsRear-ex7"
  },
  {
    id: "legsRear-ex7",
    label: "Наклон к правой ноге, резинка на 2 ноге и делаем наклоны",
    isCardio: false,
    pair: "legsRear-ex6"
  }
];