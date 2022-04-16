import { IWorkoutTypes } from "../../interfaces/IWorkoutTypes";

export const exercises: { [key: string]: IWorkoutTypes } = {
  "exercise1": {
    name: "Выпады вперед с гирями левой ногой",
    isCardio: false,
    pairedExercise: "exercise2"
  },
  "exercise2": {
    name: "Выпады вперед с гирями правой ногой",
    isCardio: false,
    pairedExercise: "exercise1"
  },
  "exercise3": {
    name: "Выпады вперед по очереди и назад",
    isCardio: false
  },
  "exercise4": {
    name: "Присед на левой ноге на стульчик",
    isCardio: false,
    pairedExercise: "exercise5"
  },
  "exercise5": {
    name: "Присед на правой ноге на стульчик",
    isCardio: false,
    pairedExercise: "exercise4"
  },
  "exercise6": {
    name: "Зашагивание на стул левой ногой",
    isCardio: false,
    pairedExercise: "exercise7"
  },
  "exercise7": {
    name: "Зашагивание на стул правой ногой",
    isCardio: false,
    pairedExercise: "exercise6"
  },
  "exercise8": {
    name: "Тяга левой ноги с эспандером",
    isCardio: false,
    pairedExercise: "exercise9"
  },
  "exercise9": {
    name: "Тяга правой ноги с эспандером",
    isCardio: false,
    pairedExercise: "exercise8"
  },
  "exercise10": {
    name: "Сплит-присед с левой ногой на лавке или в кольце",
    isCardio: false,
    pairedExercise: "exercise11"
  },
  "exercise11": {
    name: "Сплит-присед с правой ногой на лавке или в кольце",
    isCardio: false,
    pairedExercise: "exercise10"
  },
  "exercise12": {
    name: "Выпрыгивания из приседа",
    isCardio: true
  }
};