export default [
  {
    "label": "Тянем резинку c зади на спину",
  },
  {
    "label": "Резинку в руки, и выводим резинку назад и вперед, растягиваем грудной отдел",
  },
  {
    "label": "Супермэн",
  },
  {
    "label": "Развод гантелей в стороны на спину",
  },
  {
    "label": "Супермэн плавец",
  },
  {
    "label": "В супермене руки выводим назад и снова вперед",
  },
  {
    "label": "Стоим в наклоне, гири в руки и тянем 2 руки к карманам на себя",
  },
  {
    "label": "Стоим в наклоне, гири в руки и тянем их к карманам на себя по очереди",
  },
  {
    "label": "Ложимся на живот, локти прижали к корпусу, делаем подьемы корпуса вверх",
  },
  {
    "label": "Сидя на попе, резинку на руки, тянем резинку к груди",
  },
  {
    "label": "Гиперэкстензия с руками за головой, подьемы вверх",
  },
  {
    "label": "Подъемы вытянутых рук в наклоне",
  },
  {
    "label": "Лодочка + разведения рук и ног",
    "img": "/assets/images/back/Superman_razvedenie_ruk_nog.gif"
  },
  {
    "label": "Тяга одной рукой в планке",
    "description": "Примите положение классической планки на прямых руках. В корпусе единая линия, живот и таз подобраны, ладони под плечами. Опору чуть перенесите на правую сторону, оторвите от пола левую руку, сделайте тягу. Это выполняется следующим образом – согните локоть, потяните вверх четко вдоль тела и опустите обратно. Затем повторите правой рукой. Это упражнение на мышцы спины нужно добавить в тренировку для дома с целью прокачки ее верха.",
    "img": "/assets/images/back/Superman_razvedenie_ruk_nog.gif"
  },
  {
    "label": "Русалка",
    "description": "Лягте на правый бок, вытянитесь в струнку, разместите внизу руку с опорой на предплечье четко под корпусом. Стопы уложите на наружную сторону. Встаньте в боковую планку, ягодицы не заваливайте вперед и назад, из этого положения протяните вверх свободную руку. Теперь плавно прогнитесь, а таз поднимите как можно выше. Наклоните ближе к голове прямую и поднятую руку. Опуститесь медленно вниз, повторите.",
    "img": "/assets/images/back/Bokovaya_planka_rusalka.gif",
    "double": true
  },
  {
    "label": "Пульсирующий подъем рук и ног на четвереньках",
    "description": "Опуститесь на четвереньки – колени четко под тазом, ладони под плечами. Спину держите ровно, не провисайте в поясничном отделе. Потом поднимите правую ногу и левую руку до единой линии с корпусом. Сделайте из такого положения пульсирующие подъемы и опускания с короткой амплитудой для акцентирования нагрузки на мускулатуре около позвоночника.",
    "img": "/assets/images/back/Ohotnichya_sobaka_pulsacia.gif",
    "double": true
  },
  {
    "label": "Собака мордой вниз + альпинист",
    "description": "Из планки на прямых руках примите позу собаки мордой вниз в классическом варианте. Таз поднят вверх, колени и локти выпрямлены, а тело составляет треугольник с полом. Затем одновременно перейдите назад в планку и подтяните бедро одной ноги к животу. Вернитесь к собаке мордой вниз и еще раз сделайте альпиниста, но уже поменяйте сторону",
    "img": "/assets/images/back/Iz_planki_v_sobaku_mordoj_vniz_v_alpinist.gif",
  },
  {
    "label": "Гиперэкстензия с руками в стороны",
    "description": "Останьтесь в лежачем положении на животе. Вытяните руки в стороны, положите вместе с головой на пол. Ноги сомкнуты вместе. Поднимите верхнюю часть корпуса, не меняя позиции рук. Прогнитесь в пояснице, а ноги от тазовых костей до пальцев стоп прижмите плотно к поверхности. Медленно без резких движений опуститесь назад. В верхней точке расправляйте лопатки.",
    "img": "/assets/images/back/Podem_koprusa_ruki_v_storony.gif",
  },
  {
    "label": "Подъемы в обратную планку",
    "description": "Останьтесь в лежачем положении на животе. Вытяните руки в стороны, положите вместе с головой на пол. Ноги сомкнуты вместе. Поднимите верхнюю часть корпуса, не меняя позиции рук. Прогнитесь в пояснице, а ноги от тазовых костей до пальцев стоп прижмите плотно к поверхности. Медленно без резких движений опуститесь назад. В верхней точке расправляйте лопатки.",
    "img": "/assets/images/back/Obratnaya_planka_podem_taza.gif",
  },
  {
    "label": "Развороты из планки на локтях",
    "img": "/assets/images/back/Planka_s_razvorotami.gif",
  }
].map((ex, index) => ({
  ...ex,
  id: "back-ex" + (index + 1)
}));