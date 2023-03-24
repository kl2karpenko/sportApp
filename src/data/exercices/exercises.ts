import { TAllExercises } from "../../interfaces/TAllExercises";
import { EBodyParts } from "../bodyPartsForWorkout";

export const mockedWorkoutExercise = {
  id: "someMockedId",
  label: "mockedLabel",
  isCardio: false
};

const listOfExercises = Array.from(new Array(10)).map((_, index) => ({
  ...mockedWorkoutExercise,
  id: mockedWorkoutExercise.id + index
}));

export const mockedWorkoutTypes: TAllExercises = {
  [EBodyParts.legsFront]: listOfExercises,
  [EBodyParts.legsRear]: listOfExercises,
  [EBodyParts.legsInside]: listOfExercises,
  [EBodyParts.legsOutside]: listOfExercises,
  [EBodyParts.legsAss]: listOfExercises,
  [EBodyParts.abs]: listOfExercises,
  [EBodyParts.abs_left_right]: listOfExercises,
  [EBodyParts.back]: listOfExercises,
  [EBodyParts.hands]: listOfExercises,
  [EBodyParts.cardio]: listOfExercises.map((el, index) => ({
    ...el,
    id: "cardio-ex" + index,
    isCardio: true
  }))
};