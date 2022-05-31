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
import {IDialogProps} from "./interfaces_deprecated/IDialogProps";
import ModalDialog from "./components/Dialog";
import WorkoutFactory from "./services/WorkoutFactory";
import {WorkoutType} from "./interfaces_deprecated/WorkoutType";
import IWorkoutSession from "./services/WorkoutSessionService/IWorkoutSession";
import IWorkoutService from "./services/WorkoutService/IWorkoutService";

export const defaultWorkoutSession = {
  round: 0,
  exercise: 0,
  inProgress: false,
  isResting: false,
  isDone: false
};

const getWorkoutWithDefaultSettings = (workoutType: WorkoutType) => WorkoutFactory(workoutType, {
  exerciseDuration: workoutDefaultSettings.exercise_duration,
  exercisesLength: workoutDefaultSettings.exercises,
  roundsLength: workoutDefaultSettings.rounds,
  restDuration: workoutDefaultSettings.rest_duration,
  betweenRoundsDuration: workoutDefaultSettings.rest_between_rounds
});

function SportApp() {
  const [workoutType, setWorkoutType] = useState<WorkoutType>(WorkoutType.HIIT);
  const [workoutSettings, setWorkoutSettings] = useState<IWorkoutService>(getWorkoutWithDefaultSettings(workoutType));
  const [workoutSession, setWorkoutSession] = useState<IWorkoutSession | null>(null);
  const [dialogProps, setDialogProps] = useState<IDialogProps>({ open: false });

  const setWorkout = () => {
    const workoutSettingsInstance = getWorkoutWithDefaultSettings(workoutType);
    setWorkoutSettings(workoutSettingsInstance);
    setWorkoutSession(workoutSettingsInstance.getWorkoutSessionValues());
  };

  useEffect(() => {
    setWorkout();
  }, []);
  useEffect(() => {
    setWorkout();
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
            <Route path="workout" element={<CurrentWorkout key="currentWorkout" />} />
            <Route path="done" element={<span key="workoutDone">Workout is DONE!!!! Congratulations!)</span>} />
            <Route path="*" element={<NoMatch key="noMatch" />} />
          </Routes>
        </Router>
        <ModalDialog />
      </SportAppContext.Provider>
    </ThemeProvider>
  );
}

export default SportApp;
