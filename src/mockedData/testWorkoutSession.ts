import { mockedWorkoutTypes } from "../data/exercices";
import { WorkoutType } from "../interfaces/WorkoutType";
import { IWorkoutSettings } from "../interfaces/IWorkoutSettings";
import IWorkoutSession from "../interfaces/IWorkoutSession";
import { IWorkoutSessionState } from "../store/workoutSession";

export const tabataDefaultSettings: IWorkoutSettings = {
  roundsLength: 8,
  exercisesLength: 8,
  exerciseDuration: 30,
  restDuration: 15,
  betweenRoundsDuration: 90
};

export const hiitDefaultSettings: IWorkoutSettings = {
  roundsLength: 8,
  exercisesLength: 8,
  exerciseDuration: 40,
  restDuration: 20,
  betweenRoundsDuration: 60
};

export const testHiitWorkoutSession: IWorkoutSessionState = {
  ...hiitDefaultSettings,
  rounds: [
    {
      "bodyId": "hands",
      "restDuration": 20,
      "workDuration": 40,
      "exercisesList": [
        {
          "id": "cardio-ex12",
          "label": "Прижки с гирей",
          "isCardio": true
        },
        {
          "label": "Тяга гантелей к подбородку",
          "id": "arms-ex9"
        },
        {
          "label": "Наклон вперед, разгибания на трицепс рук с гантелями",
          "id": "arms-ex15"
        },
        {
          "id": "cardio-ex2",
          "label": "Jumping Jek",
          "isCardio": true
        },
        {
          "label": "Подъемы рук с гирями вперед на уровень глаз и опускаем вниз",
          "id": "arms-ex8"
        },
        {
          "label": "Стоим в планке, опускаем руки вниз на локти и потом снова поднимаемся на прямые руки наверх",
          "id": "arms-ex13"
        },
        {
          "id": "cardio-ex64",
          "label": "Прижки в позе стола",
          "isCardio": true
        },
        {
          "label": "Отжимание на трицепс от кровати/стула",
          "id": "arms-ex5"
        }
      ],
      "isActive": false
    },
    {
      "bodyId": "abs",
      "restDuration": 20,
      "workDuration": 40,
      "exercisesList": [
        {
          "id": "cardio-ex12",
          "label": "Прижки с гирей",
          "isCardio": true
        },
        {
          "label": "Лежим на спине, делаем подьемы вверх на 1 руки и 1 прижок берпи, ложимся назад и повторяем все на другую руку",
          "id": "abs-ex20"
        },
        {
          "label": "Ложимся на спину, подьем прямых ног вверх и вывод ног вперед",
          "id": "abs-ex13"
        },
        {
          "id": "cardio-ex4",
          "label": "Jumping Jek + Punch",
          "isCardio": true
        },
        {
          "label": "Лежим на спине, руки складываем в пистолетик и выводим прямые руки между ногами, потом возвращаем руки назад за голову, повторяем",
          "id": "abs-ex23"
        },
        {
          "label": "Лежим на спине, поясница касаеться пола, руки выводим вверх и ползем по воображаемой веревке вверх",
          "id": "abs-ex22"
        },
        {
          "id": "cardio-ex2",
          "label": "Jumping Jek",
          "isCardio": true
        },
        {
          "label": "Сидим на попе, расставляем широко ноги, руки выносим перед собой, держим статику и бьем кулаками вперед",
          "id": "abs-ex18"
        }
      ],
      "isActive": false
    },
    {
      "bodyId": "abs_left_right",
      "restDuration": 20,
      "workDuration": 40,
      "exercisesList": [
        {
          "id": "cardio-ex8",
          "label": "Скалолаз",
          "isCardio": true
        },
        {
          "label": "В боковой левой планке стоим на локте и согнутой ноге, делаем сгиб в ноге которая прямая, а потом наклоняемся с локтем согнутым вниз",
          "double": true,
          "id": "abs-side-ex10"
        },
        {
          "label": "Боковая планка и делаем наклоны вниз а потом заводим руку вниз и поднимаемся вверх",
          "double": true,
          "id": "abs-side-ex2"
        },
        {
          "id": "cardio-ex61",
          "label": "Перепрыжки в планке с поднятым тазом, руки на полу, таз поднят высоко вверх и делаем прижки ногами по очереди в сторону",
          "isCardio": true
        },
        {
          "label": "Лежим на боку скручивание на один бок",
          "double": true,
          "id": "abs-side-ex3"
        },
        {
          "label": "Стоим в плие, руки за голову и наклоны к ногам локтем",
          "id": "abs-side-ex6"
        },
        {
          "id": "cardio-ex41",
          "label": "Стоя выносим ноги по очереди в сторону, 2 удара вперед и по 2 удара в стороны",
          "isCardio": true
        },
        {
          "label": "Стоя подъем руки к той же руке, смена",
          "id": "abs-side-ex1"
        }
      ],
      "isActive": false
    },
    {
      "bodyId": "legsFront",
      "restDuration": 20,
      "workDuration": 40,
      "exercisesList": [
        {
          "id": "cardio-ex39",
          "label": "Стоя руки вместе, берем молот, приседяем и удар молотом вниз, подьем удар в другую сторону с присядом",
          "isCardio": true
        },
        {
          "id": "legsFront-ex2",
          "label": "Выпады вперед с гирями правой ногой",
          "isCardio": false,
        },
        {
          "id": "legsFront-ex9",
          "label": "Тяга правой ноги с эспандером",
          "isCardio": false,
        },
        {
          "id": "cardio-ex10",
          "label": "Разножка",
          "isCardio": true
        },
        {
          "id": "legsFront-ex6",
          "label": "Зашагивание на стул левой ногой",
          "isCardio": false
        },
        {
          "id": "legsFront-ex10",
          "label": "Сплит-присед с левой ногой на лавке или в кольце",
          "isCardio": false,
        },
        {
          "id": "cardio-ex36",
          "label": "Руки вместе перед собой вверх выносим, подьем сначала колена к рукам а потом подьем прямой ноги, смена",
          "isCardio": true
        },
        {
          "id": "legsFront-ex4",
          "label": "Присед на левой ноге на стульчик",
          "isCardio": false,
        }
      ],
      "isActive": false
    },
    {
      "bodyId": "legsInside",
      "restDuration": 20,
      "workDuration": 40,
      "exercisesList": [
        {
          "id": "cardio-ex38",
          "label": "3 Jumping Jek и 4 удара вперед",
          "isCardio": true
        },
        {
          "id": "legsInside-ex10",
          "isCardio": false,
          "label": "Стоя - подъем левой ноги к себе и в сторону",
        },
        {
          "id": "legsInside-ex7",
          "isCardio": false,
          "label": "Мельница"
        },
        {
          "id": "cardio-ex70",
          "label": "Шаги назад каждой ногой по очереди с подъемом прямых рук перед собой",
          "isCardio": true
        },
        {
          "id": "legsInside-ex3",
          "isCardio": false,
          "label": "Приседания сумо"
        },
        {
          "id": "legsInside-ex6",
          "isCardio": false,
          "label": "На боку подъем правой ноги, левая нога стоит сзади",
        },
        {
          "id": "cardio-ex28",
          "label": "Стоя отводим ноги по очереди назад, руки разводим когда отставляем ногу",
          "isCardio": true
        },
        {
          "id": "legsInside-ex2",
          "isCardio": false,
          "label": "На боку подъем правой ноги, левая нога стоит впереди",
        }
      ],
      "isActive": false
    },
    {
      "bodyId": "legsAss",
      "restDuration": 20,
      "workDuration": 40,
      "exercisesList": [
        {
          "id": "cardio-ex19",
          "label": "Руки впереди, бег на месте",
          "isCardio": true
        },
        {
          "id": "legsAss-ex5",
          "label": "На спине лежа: левую ногу на правую, подъем таза вверх",
          "isCardio": false,
        },
        {
          "id": "legsAss-ex17",
          "label": "Присели, идем в сторону 2 раза при этом сжимаем ягодицы и выпригиваем назад",
          "isCardio": false
        },
        {
          "id": "cardio-ex3",
          "label": "Jumping Jek c прижком вниз и подьем вверх",
          "isCardio": true
        },
        {
          "id": "legsAss-ex13",
          "label": "Гири в руки, выводим руки вперед и и махаем между ногами. При выносе рук вперед попу поджимаем под себя",
          "isCardio": false
        },
        {
          "id": "legsAss-ex12",
          "label": "Присед и вынос левой ноги назад и смена",
          "isCardio": false
        },
        {
          "id": "cardio-ex4",
          "label": "Jumping Jek + Punch",
          "isCardio": true
        },
        {
          "id": "legsAss-ex16",
          "label": "Присед и подъем на носочки",
          "isCardio": false
        }
      ],
      "isActive": false
    },
    {
      "bodyId": "legsOutside",
      "restDuration": 20,
      "workDuration": 40,
      "exercisesList": [
        {
          "id": "cardio-ex20",
          "label": "Присяд и вынос рук в вверх и подьем на носочки",
          "isCardio": true
        },
        {
          "id": "legsOutside-ex7",
          "isCardio": false,
          "label": "Стоя в планке переводим правую ногу в левую сторону и в правую сторону",
        },
        {
          "id": "legsOutside-ex3",
          "isCardio": false,
          "label": "Стоя, резинку на ноги и поднимаем в сторону правую ногу",
        },
        {
          "id": "cardio-ex32",
          "label": "Стоя сводим руки в кулаках назад на спину и в приседе делаем вынос ноги в сторону",
          "isCardio": true
        },
        {
          "id": "legsOutside-ex9",
          "isCardio": false,
          "label": "Присед и вынос ноги в сторону, смена"
        },
        {
          "id": "legsOutside-ex13",
          "isCardio": false,
          "label": "Стоя - левую ногу заводим назад в сторону за правую, и выносим ногу в сторону",
        },
        {
          "id": "cardio-ex40",
          "label": "Руки вместе, берем молот, руки крутим 1 раз за головой, и еще один круг с подьемом прямой ноги к рукам, смена стороны",
          "isCardio": true
        },
        {
          "id": "legsOutside-ex6",
          "isCardio": false,
          "label": "Лежа на левом боку подъем вверх правой ноги",
        }
      ],
      "isActive": false
    },
    {
      "bodyId": "back",
      "restDuration": 20,
      "workDuration": 40,
      "exercisesList": [
        {
          "id": "cardio-ex63",
          "label": "Прыжки в планке из стороны в сторону",
          "isCardio": true
        },
        {
          "label": "Тянем резинку c зади на спину",
          "id": "back-ex1"
        },
        {
          "label": "Русалка",
          "description": "Лягте на правый бок, вытянитесь в струнку, разместите внизу руку с опорой на предплечье четко под корпусом. Стопы уложите на наружную сторону. Встаньте в боковую планку, ягодицы не заваливайте вперед и назад, из этого положения протяните вверх свободную руку. Теперь плавно прогнитесь, а таз поднимите как можно выше. Наклоните ближе к голове прямую и поднятую руку. Опуститесь медленно вниз, повторите.",
          "img": "/assets/images/back/Bokovaya_planka_rusalka.gif",
          "double": true,
          "id": "back-ex14"
        },
        {
          "id": "cardio-ex54",
          "label": "Приставной шаг с касанием стоп (как мельница)",
          "isCardio": true
        },
        {
          "label": "Супермэн",
          "id": "back-ex3"
        },
        {
          "label": "Резинку в руки, и выводим резинку назад и вперед, растягиваем грудной отдел",
          "id": "back-ex2"
        },
        {
          "id": "cardio-ex38",
          "label": "3 Jumping Jek и 4 удара вперед",
          "isCardio": true
        },
        {
          "label": "Стоим в наклоне, гири в руки и тянем 2 руки к карманам на себя",
          "id": "back-ex7"
        }
      ],
      "isActive": false
    }
  ],
  allExercises: {
    cardio: mockedWorkoutTypes.cardio,
    [WorkoutType.HIIT]: mockedWorkoutTypes,
    [WorkoutType.Tabata]: mockedWorkoutTypes,
  },
  onlyCardio: false,
  includeCardio: false,
  workoutType: WorkoutType.Tabata
};

export const testTabataWorkoutSession: IWorkoutSessionState = {
  ...tabataDefaultSettings,
  rounds: [
    {
      "bodyId": "abs",
      "restDuration": 15,
      "workDuration": 30,
      "exercisesList": [
        {
          "label": "Сидим на попе, расставляем широко ноги, руки выносим перед собой, держим статику и бьем кулаками вперед",
          "id": "abs-ex18"
        },
        {
          "id": "cardio-ex10",
          "label": "Разножка",
          "isCardio": true
        },
        {
          "label": "Стоим на коленях, выводим одну ногу и противополжную руку назад, потом к себе соедением их вместе на пресс",
          "double": true,
          "id": "abs-ex19"
        },
        {
          "id": "cardio-ex48",
          "label": "Ноги широко, руки расставили в стороны, делаем скручивания на пресс по 2 раза и меняем сторону",
          "isCardio": true
        }
      ],
      "isActive": false
    },
    {
      "bodyId": "abs_left_right",
      "restDuration": 15,
      "workDuration": 30,
      "exercisesList": [
        {
          "label": "В боковой левой планке стоим на локте и согнутой ноге, делаем сгиб в ноге которая прямая, а потом вы носим прямую ногу и руку вперед",
          "double": true,
          "id": "abs-side-ex9"
        },
        {
          "id": "cardio-ex12",
          "label": "Прижки с гирей",
          "isCardio": true
        },
        {
          "label": "Стоя подъем руки к той же руке, смена",
          "id": "abs-side-ex1"
        },
        {
          "id": "cardio-ex19",
          "label": "Руки впереди, бег на месте",
          "isCardio": true
        }
      ],
      "isActive": false
    },
    {
      "bodyId": "legsOutside",
      "restDuration": 15,
      "workDuration": 30,
      "exercisesList": [
        {
          "id": "legsOutside-ex1",
          "isCardio": false,
          "label": "Лежим на правом боку, ноги жабкой и поднимаемся с разводом ног",
        },
        {
          "id": "cardio-ex67",
          "label": "Касание ног в положение стола по очереди на каждую сторону",
          "isCardio": true
        },
        {
          "id": "legsOutside-ex13",
          "isCardio": false,
          "label": "Стоя - левую ногу заводим назад в сторону за правую, и выносим ногу в сторону",
        },
        {
          "id": "cardio-ex30",
          "label": "Стоя подьем ноги по очереди к груди, руки сводим под ногой, смена",
          "isCardio": true
        }
      ],
      "isActive": false
    },
    {
      "bodyId": "legsFront",
      "restDuration": 15,
      "workDuration": 30,
      "exercisesList": [
        {
          "id": "legsFront-ex3",
          "label": "Выпады вперед по очереди и назад",
          "isCardio": false
        },
        {
          "id": "cardio-ex19",
          "label": "Руки впереди, бег на месте",
          "isCardio": true
        },
        {
          "id": "legsFront-ex9",
          "label": "Тяга правой ноги с эспандером",
          "isCardio": false,
        },
        {
          "id": "cardio-ex11",
          "label": "Прижки в планке с подьемом ног к прессу",
          "isCardio": true
        }
      ],
      "isActive": false
    },
    {
      "bodyId": "legsRear",
      "restDuration": 15,
      "workDuration": 30,
      "exercisesList": [
        {
          "id": "legsRear-ex7",
          "label": "Наклон к правой ноге, резинка на 2 ноге и делаем наклоны",
          "isCardio": false,
        },
        {
          "id": "cardio-ex17",
          "label": "Прыжки со скручиванием на пресс, руки держим перед собой и делаем скручивания",
          "isCardio": true
        },
        {
          "id": "legsRear-ex5",
          "label": "Наклоны с выносом 1 ноги назад с гирями, вторая держит равновесие",
          "isCardio": false,
        },
        {
          "id": "cardio-ex54",
          "label": "Приставной шаг с касанием стоп (как мельница)",
          "isCardio": true
        }
      ],
      "isActive": false
    }
  ],
  allExercises: {
    cardio: mockedWorkoutTypes.cardio,
    [WorkoutType.HIIT]: mockedWorkoutTypes,
    [WorkoutType.Tabata]: mockedWorkoutTypes,
  },
  onlyCardio: false,
  includeCardio: false,
  workoutType: WorkoutType.Tabata
};