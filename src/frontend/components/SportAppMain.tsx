import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setCardioExercises, setExercisesByWorkoutType } from "../store/workoutSession";
import { WorkoutType } from "../interfaces/WorkoutType";

export const defaultWorkoutSession = {
  round: 0,
  exercise: 0,
  inProgress: false,
  isResting: false,
  isDone: false
};

interface ISportAppMainProps {
  children: React.ReactElement;
}

function SportAppMain(props: ISportAppMainProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const hiit = await fetch("/api/hiit");
      const tabata = await fetch("/api/tabata");
      const cardio = await fetch("/api/cardio");
      const { data: hiitBody } = await hiit.json();
      const { data: cardioBody } = await cardio.json();
      const { data: tabataBody } = await tabata.json();

      dispatch(setCardioExercises(cardioBody));
      dispatch(setExercisesByWorkoutType({ workoutType: WorkoutType.HIIT, list: hiitBody }));
      dispatch(setExercisesByWorkoutType({ workoutType: WorkoutType.Tabata, list: tabataBody }));
    })();
  }, []);

  return (
    <span key="sportMainApp">
      {props.children}
    </span>
  );
}

export default SportAppMain;
