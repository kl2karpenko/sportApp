import { IBodyPartsForWorkout } from "../../interfaces/IBodyPartsForWorkout";

export const exercises: IBodyPartsForWorkout[] = [
  {
    id: "legsFront-ex1",
    label: "Выпады вперед с гирями левой ногой",
    isCardio: false,
    pair: "legsFront-ex2"
  },
  {
    id: "legsFront-ex2",
    label: "Выпады вперед с гирями правой ногой",
    isCardio: false,
    pair: "legsFront-ex1"
  },
  {
    id: "legsFront-ex3",
    label: "Выпады вперед по очереди и назад",
    isCardio: false
  },
  {
    id: "legsFront-ex4",
    label: "Присед на левой ноге на стульчик",
    isCardio: false,
    pair: "legsFront-ex5"
  },
  {
    id: "legsFront-ex5",
    label: "Присед на правой ноге на стульчик",
    isCardio: false,
    pair: "legsFront-ex4"
  },
  {
    id: "legsFront-ex6",
    label: "Зашагивание на стул левой ногой",
    isCardio: false,
    pair: "legsFront-ex7"
  },
  {
    id: "legsFront-ex7",
    label: "Зашагивание на стул правой ногой",
    isCardio: false,
    pair: "legsFront-ex6"
  },
  {
    id: "legsFront-ex8",
    label: "Тяга левой ноги с эспандером",
    isCardio: false,
    pair: "legsFront-ex9"
  },
  {
    id: "legsFront-ex9",
    label: "Тяга правой ноги с эспандером",
    isCardio: false,
    pair: "legsFront-ex8"
  },
  {
    id: "legsFront-ex10",
    label: "Сплит-присед с левой ногой на лавке или в кольце",
    isCardio: false,
    pair: "legsFront-ex11"
  },
  {
    id: "legsFront-ex11",
    label: "Сплит-присед с правой ногой на лавке или в кольце",
    isCardio: false,
    pair: "legsFront-ex10"
  },
  {
    id: "legsFront-ex12",
    label: "Выпрыгивания из приседа",
    isCardio: true
  }
];