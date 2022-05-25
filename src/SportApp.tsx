import React, {useEffect, useMemo, useState} from "react";
import {ThemeProvider} from "@mui/material/styles";

import {BrowserRouter as Router} from "react-router-dom";
import {Route, Routes} from "react-router";

import theme from "./theme";
import CreateWorkout from "./components/CreateWorkout";
import workoutDefaultSettings from "./data/workoutDefaultSettings";
import { SportAppContext } from "./SportAppContext";
import NoMatch from "./components/NoMatch";
import { CurrentWorkout } from "./components/Workout";
import {IDialogProps} from "./interfaces/IDialogProps";
import ModalDialog from "./components/Dialog";
import Workout from "./models/Workout/Workout";
import WorkoutFactory from "./models/WorkoutFactory";
import {WorkoutType} from "./interfaces/WorkoutType";
import WorkoutSession from "./models/WorkoutSession/WorkoutSession";
import IWorkoutSessionForState from "./models/WorkoutSession/IWorkoutSessionForState";

export const defaultWorkoutSession = {
  round: 0,
  exercise: 0,
  inProgress: false,
  isResting: false,
  isDone: false
};

const workoutFactory = new WorkoutFactory();
const defaultHiitWorkout = workoutFactory.getWorkout(WorkoutType.HIIT, {
  exerciseDuration: workoutDefaultSettings.exercise_duration,
  exercisesLength: workoutDefaultSettings.exercises,
  roundsLength: workoutDefaultSettings.rounds,
  restDuration: workoutDefaultSettings.rest_duration,
  betweenRoundsDuration: workoutDefaultSettings.rest_between_rounds
});

const getWorkoutWithDefaultSettings = (workoutType: WorkoutType) => workoutFactory.getWorkout(workoutType, {
  exerciseDuration: workoutDefaultSettings.exercise_duration,
  exercisesLength: workoutDefaultSettings.exercises,
  roundsLength: workoutDefaultSettings.rounds,
  restDuration: workoutDefaultSettings.rest_duration,
  betweenRoundsDuration: workoutDefaultSettings.rest_between_rounds
});

function SportApp() {
  const [workoutType, setWorkoutType] = useState<WorkoutType>(WorkoutType.HIIT);
  const [workoutSettings, setWorkoutSettings] = useState<Workout | null>(getWorkoutWithDefaultSettings(workoutType));
  const [workoutSession, setWorkoutSession] = useState<IWorkoutSessionForState | null>(null);
  const [dialogProps, setDialogProps] = useState<IDialogProps>({ open: false });

  useEffect(() => {
    const workoutSettingsInstance = getWorkoutWithDefaultSettings(workoutType);
    setWorkoutSettings(workoutSettingsInstance);
    setWorkoutSession(workoutSettingsInstance.getWorkoutSessionValue());
  }, [workoutType]);

  return (
    <ThemeProvider theme={theme}>
      <SportAppContext.Provider
        value={{
          workoutType,
          setWorkoutType,
          setWorkoutSettings,
          setWorkoutSession,
          workoutSettings,
          workoutSession,
          dialogProps,
          setDialogProps
        }}
      >
        <Router>
          <Routes>
            <Route index element={<CreateWorkout key="startWorkout"/>} />
            <Route path="workout" element={<CurrentWorkout />} />
            <Route path="done" element={<span>Workout is DONE!!!! Congratulations!)</span>} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
        <ModalDialog />
      </SportAppContext.Provider>
    </ThemeProvider>
  );
}

export default SportApp;
