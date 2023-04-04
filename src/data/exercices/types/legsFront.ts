export default [
  {
    "label": "Выпады вперед с гирями 1 ногой",
    "double": true
  },
  {
    "label": "Выпады вперед по очереди и назад"
  },
  {
    "label": "Присед на 1 ноге на стульчик",
    "double": true
  },
  {
    "label": "Зашагивание на стул 1 ногой",
    "double": true
  },
  {
    "label": "Тяга 1 ноги с эспандером вверх",
    "double": true
  },
  {
    "label": "Сплит-присед с 1 ногой на лавке или в кольце",
    "double": true
  },
  {
    "label": "Выпрыгивания из приседа"
  }
].map((ex, index) => ({
  ...ex,
  id: "legsFront-ex" + (index + 1)
}));