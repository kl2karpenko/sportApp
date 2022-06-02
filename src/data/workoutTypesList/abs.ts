import IExercise from "../../models/Exercise/IExercise";

export const exercises: Partial<IExercise>[] = [
  {
    id: "abs-ex1",
    label: "На спине подъем ног вверх и вынос вперед",
    isCardio: false
  },
  {
    id: "abs-ex2",
    label: "Мой любимый пресс",
    isCardio: false
  },
  {
    id: "abs-ex3",
    label: "Скручивание на спине, противоположная рука к ноге и смена",
    isCardio: false
  },
  {
    id: "abs-ex4",
    label: "Подъем на спине на руки и на пресс",
    isCardio: false
  },
  {
    id: "abs-ex5",
    label: "Стоя подъем руки к противоположной руке, смена ",
    isCardio: false
  },
  {
    id: "abs-ex6",
    label: "Стоя подъем руки и прямой ноги",
    isCardio: true
  },
  {
    id: "abs-ex7",
    label: "Стоя в планке подъем ноги к рукам по 3 раза и назад",
    isCardio: false
  },
  {
    id: "abs-ex8",
    label: "На спине лежа, подъем левой руки и правой ноги",
    isCardio: false,
    pair: "abs-ex9"
  },
  {
    id: "abs-ex9",
    label: "На спине лежа, подъем правой руки и левой ноги",
    isCardio: false,
    pair: "abs-ex8"
  },
  {
    id: "abs-ex10",
    label: "Лежа на спине подъем вверх в руками вперед, и падаем аккуратно назад",
    isCardio: false,
    pair: "abs-ex11"
  },
  {
    id: "abs-ex11",
    label: "Лежа на спине, ноги сгибаем и поднимаем, подъем туловища, касаемся руками ног и вниз",
    isCardio: false,
    pair: "abs-ex10"
  },
  {
    id: "abs-ex12",
    label: "Твист сидя на попе в разные стороны",
    isCardio: false
  },
  {
    id: "abs-ex13",
    label: "Скручивание книжечкой",
    isCardio: false
  },
  {
    id: "abs-ex14",
    label: "Велосипед на спине",
    isCardio: false
  },
  {
    id: "abs-ex15",
    label: "Ножницы ногами на спине",
    isCardio: false
  },
  {
    id: "abs-ex16",
    label: "Лежа на спине, ложим правую ногу на левую, левую руку за голову и скручивание к ноге",
    isCardio: false,
    pair: "abs-ex17"
  },
  {
    id: "abs-ex17",
    label: "Лежа на спине, ложим левую ногу на правую, правую руку за голову и скручивание к ноге",
    isCardio: false,
    pair: "abs-ex16"
  },
  {
    id: "abs-ex18",
    label: "Стоим в паучке и сгибаем по очереди ноги к животу",
    isCardio: true
  },
  {
    id: "abs-ex19",
    label: "Лежа на спине, правая нога согнутая - вторая прямая (на пол не ложим), сгибаем ногу и тянем к противоположному локтю - сгибаем туловище и вниз",
    isCardio: false,
    pair: "abs-ex20"
  },
  {
    id: "abs-ex20",
    label: "Лежа на спине, левая нога согнутая - вторая прямая (на пол не ложим), сгибаем ногу и тянем к противоположному локтю - сгибаем туловище и вниз",
    isCardio: false,
    pair: "abs-ex19"
  },
  {
    id: "abs-ex21",
    label: "Стоим в планке на локтях и отставляем по очереди ногу в сторону и в центр",
    isCardio: false
  },
  {
    id: "abs-ex22",
    label: "Сидим на попе, ноги вверх руки перед собой - держим статику и бьем кулаками вперед",
    isCardio: true
  },
  {
    id: "abs-ex23",
    label: "Стоим на коленях, выводим левую ногу и правою руку назад, потом к себе соедением их вместе на пресс",
    isCardio: true
  },
  {
    id: "abs-ex24",
    label: "Стоим на коленях, выводим правую ногу и левую руку назад, потом к себе соедением их вместе на пресс",
    isCardio: true
  },
];