const list = [
  "Берпи",
  "Jumping Jek",
  "Jumping Jek c прижком вниз и подьем вверх",
  "Jumping Jek + Punch",
  "Jumping Jek 4 раза + 4 прижка на скручивание на пресс",
  "Jumping Jek + Вынос соединенных рук вверх, смена",
  "Присяд, подьем и касаемся пятки",
  "Скалолаз",
  "Скалолаз со сменой ног, задерживаемся на 1 ноге а потом смена на 2 ногу",
  "Разножка",
  "Прижки в планке с подьемом ног к прессу",
  "Прижки с гирей",
  "Присед и удар в сторону, смена",
  "Выставляем ноги в сторону при этом делаем удары по 1 вперед а потом по сторонам с разворотом",
  "Прыжки на месте со скакалкой",
  "Стоя подъем рук вверх и ноги на пресс - мельница",
  "Прыжки со скручиванием на пресс, руки держим перед собой и делаем скручивания",
  "В приседе руки перед собой, скручиваемся в стороны и выставляем ногу в сторону",
  "Руки впереди, бег на месте",
  "Присяд и вынос рук в вверх и подьем на носочки",
  "Стоя ноги широко, 2 удара вперед, потом руки вверх и 2 скручивания на пресс",
  "4 удара вперед в приседе, потом 2 прижка - составляем ноги в крест",
  "Разножка в планке с подьемом рук к плечу по очереди",
  "Бег на месте, локти прижимаем к туловищу и поднимаем руки на верх по очереди",
  "Стоя на 1 ноге, другая нога стоит сзади, руки вверху. Опускаем руки и поднимаем 1 ногу к прессу а потом викыдываем руки вперед и ногу",
  "2 шага в сторону и подьем пятки к попе, идем в другую сторону и подьем пятки к попе снова. Руки за головой",
  "В приседе опускаем в кулаках руки на 1 ногу и на 2 ногу",
  "Стоя отводим ноги по очереди назад, руки разводим когда отставляем ногу",
  "Стоя выкидываем по очереди ногу вперед по 1",
  "Стоя подьем ноги по очереди к груди, руки сводим под ногой, смена",
  "Руки вместе поднимем их вверх, подьем 1 ноги и руки выносим в сторону как плывем, смена ноги",
  "Стоя сводим руки в кулаках назад на спину и в приседе делаем вынос ноги в сторону",
  "Стоя подьем на пятки и назад вниз, и поднимаем руки вверх и опускаем вниз",
  "Стоя руки перед собой, поднимаем вверх 2 раза сначала 1 ногу а потом смена на второую ногу",
  "Присели и крутим руки перед собой с шаром",
  "Руки вместе перед собой вверх выносим, подьем сначала колена к рукам а потом подьем прямой ноги, смена",
  "2 шага в сторону и на последнем прижок и соединяем ноги вместе",
  "3 Jumping Jek и 4 удара вперед",
  "Стоя руки вместе, берем молот, приседяем и удар молотом вниз, подьем удар в другую сторону с присядом",
  "Руки вместе, берем молот, руки крутим 1 раз за головой, и еще один круг с подьемом прямой ноги к рукам, смена стороны",
  "Стоя выносим ноги по очереди в сторону, 2 удара вперед и по 2 удара в стороны",
  "Прижки с захлестом и по 2 удара руками вперед",
  "Стоя делаем круги ногами по очереди",
  "Присяд в сторону руки к пяткам и потом подьем рук вверх, присяд в другую сторону",
  "Шаг в сторону и наклон с прямыми руками вниз - становая тяга",
  "Skater Jumps",
  "High knees (прижки ноги вверх)",
  "Ноги широко, руки расставили в стороны, делаем скручивания на пресс по 2 раза и меняем сторону",
  "Присяд плие руки по сторонам, при приседе опускаем руки вниз, когда поднимаемся вверх поднимаем и руки вверх",
  "Берем воображаемую булаву в руки, по очереди поднимаем прямую ногу вверх и делаем круговое движение руками и опускаем их к ноге, смена",
  "Стоя, ноги по очереди дугой крутим по кругу",
  "Присяд в сторону, выходим в центр и делаем подьем вверх на носочки, присяд в другую сторону повтор",
  "Руки вверх, делаем подтягивания коленей к груди и опускаем руки к колену",
  "Приставной шаг с касанием стоп (как мельница)",
  "Присед с махом ногой в позу звезды",
  "Подъем колена из полувыпада",
  "Бег с захлестом голени и подъемом рук по очереди вверх",
  "Выпрыгивания из полувыпада",
  "Руки согнули и вывели в сторону, делаем прыжки по сторонам ноги вместе, и сгибаем и разгибаем руки",
  "Прижки Ножницы - Рукам ножницы и ноги тоже вперед назад",
  "Перепрыжки в планке с поднятым тазом, руки на полу, таз поднят высоко вверх и делаем прижки ногами по очереди в сторону",
  "Вертикальная складка, руки вверх, поднимаем прямую ногу и опускаем прямые руки к ноге",
  "Прыжки в планке из стороны в сторону",
  "Прижки в позе стола",
  "Отведение ноги в сторону в полуприседе по очереди",
  "Разведение рук и ног в полуприседе, руки в кулаках согнуты на 90 градусов",
  "Касание ног в положение стола по очереди на каждую сторону",
  "Стоим и выводим та по сторонам + бабочка руками (руки в кулаках согнуты на 90 градусов перед собой)",
  "Повороты корпуса с руками за головой, просто стоим",
  "Шаги назад каждой ногой по очереди с подъемом прямых рук перед собой",
];

export default list.map((item, index) => (  {
  "id": `cardio-ex${index + 1}`,
  "label": item,
  "isCardio": true
}));