import React from "react";
import { generateRandomWorkoutExerciseInRound } from "../../../store/workoutSession";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { WorkoutType } from "../../../interfaces/WorkoutType";
import TabataExerciseDetail from "./TabataExerciseDetail";
import HiitExerciseDetail from "./HiitExerciseDetail";

interface IExerciseDetailProps {
  exerciseName?: string;
  description: string;
  roundIndex: number;
  exerciseIndex: number;
  isCardio: boolean;
}

export default function ExerciseDetail(props: IExerciseDetailProps): React.ReactElement {
  const dispatch = useDispatch();
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const { workoutType } = workoutSession;
  const handleRandomChangeExerciseForRound = (roundIndex: number, exerciseIndex: number, isCardio: boolean) =>
    dispatch(generateRandomWorkoutExerciseInRound({ roundIndex, exerciseIndex, isCardio }));


  if (workoutType === WorkoutType.Tabata) {
    return <TabataExerciseDetail {...props} handleRandomChangeExerciseForRound={handleRandomChangeExerciseForRound} />
  }

  return <HiitExerciseDetail {...props} handleRandomChangeExerciseForRound={handleRandomChangeExerciseForRound} />;
}