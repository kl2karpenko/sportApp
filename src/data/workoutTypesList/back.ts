import IExercise from "../../models/Exercise/IExercise";

export const exercises: Partial<IExercise>[] = [
  {
    id: "back-ex1",
    label: "Тянем резинку Сзади на спину",
    isCardio: false
  },
  {
    id: "back-ex2",
    label: "Резинку в руки, и выводим резинку назад и вперед, растягиваем грудной отдел",
    isCardio: false
  },
  {
    id: "back-ex3",
    label: "Супермэн",
    isCardio: false
  },
  {
    id: "back-ex4",
    label: "Супермэн плавец",
    isCardio: false
  }, {
    id: "back-ex5",
    label: "В супермене руки выводим назад и снова вперед",
    isCardio: false
  },
  {
    id: "back-ex6",
    label: "Руки с резинкой перед собой, тянем левую руку на себя",
    isCardio: false,
    pair: "back-ex7"
  },
  {
    id: "back-ex7",
    label: "Руки с резинкой перед собой, тянем правую руку на себя",
    isCardio: false,
    pair: "back-ex6"
  },
  {
    id: "back-ex8",
    label: "Накол, гири в руки и тянем их к карманам на себя",
    isCardio: false
  },
  {
    id: "back-ex9",
    label: "Ложимся на живот, локти прижали к корпусу, делаем подьемы корпуса вверх",
    isCardio: false
  },
  {
    id: "back-ex10",
    label: "Сидя на попе, резинку на руки, тянем резинку к груди",
    isCardio: false
  }
];