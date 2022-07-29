import IExercise from "../../../models/Exercise/IExercise";

export const exercises: Partial<IExercise>[] = [
  {
    id: "abs_left_right-ex1",
    label: "Стоя подъем руки к той же руке, смена",
    isCardio: false
  },
  {
    id: "abs_left_right-ex2",
    label: "Боковая планка, наклоны вниз на левой стороне",
    isCardio: false,
    pair: "abs_left_right-ex3"
  },
  {
    id: "abs_left_right-ex3",
    label: "Боковая планка, наклоны вниз на правой стороне",
    isCardio: false,
    pair: "abs_left_right-ex2"
  },
  {
    id: "abs_left_right-ex4",
    label: "Лежим на боку скручивание на левый бок",
    isCardio: false,
    pair: "abs_left_right-ex5"
  },
  {
    id: "abs_left_right-ex5",
    label: "Лежим на боку скручивание на правый бок",
    isCardio: false,
    pair: "abs_left_right-ex4"
  },
  {
    id: "abs_left_right-ex6",
    label: "Стоим в планке на локтях, и опускаемся вниз на разные бока",
    isCardio: false
  },
  {
    id: "abs_left_right-ex7",
    label: "Лежа на спине скручивание к разным бокам",
    isCardio: false
  },
  {
    id: "abs_left_right-ex8",
    label: "Стоим в плие, руки за голову и наклоны к ногам локтем",
    isCardio: false
  },
  {
    id: "abs_left_right-ex9",
    label: "В планке подъем ноги к руке и смена",
    isCardio: false
  },
  {
    id: "abs_left_right-ex10",
    label: "В боковой левой планке стоим на локте, сгибаем локоть к ноге и выносим прямую ногу к руке вперед",
    isCardio: false,
    pair: "abs_left_right-ex11"
  },
  {
    id: "abs_left_right-ex11",
    label: "В боковой правой планке стоим на локте, сгибаем локоть к ноге и выносим прямую ногу к руке вперед",
    isCardio: false,
    pair: "abs_left_right-ex10"
  },
  {
    id: "abs_left_right-ex12",
    label: "В боковой левой планке стоим на локте, сгибаем локоть к ноге и с локтем наклоняемся вперед",
    isCardio: false,
    pair: "abs_left_right-ex13"
  },
  {
    id: "abs_left_right-ex13",
    label: "В боковой правой планке стоим на локте, сгибаем локоть к ноге и с локтем наклоняемся вперед",
    isCardio: false,
    pair: "abs_left_right-ex12"
  }
];