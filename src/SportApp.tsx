import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";

import theme from "./theme";
import CreateWorkout from "./components/CreateWorkout";
import { IWorkoutType } from "./interfaces/IWorkoutType";
import workoutDefaultSettings from "./data/workoutDefaultSettings";
import { IWorkoutSession } from "./interfaces/IWorkoutSession";
import { SportAppContext } from "./SportAppContext";
import NoMatch from "./components/NoMatch";
import { CurrentWorkout } from "./components/Workout";
import {IDialogProps} from "./interfaces/IDialogProps";
import ModalDialog from "./components/Dialog";

export const defaultWorkoutSession = {
  round: 0,
  exercise: 0,
  inProgress: false,
  isResting: false,
  isDone: false
};

function SportApp() {
  const [workoutSettings, setWorkoutSettings] = useState<IWorkoutType>(workoutDefaultSettings);
  const [dialogProps, setDialogProps] = useState<IDialogProps>({ open: false });
  const [currentWorkoutSession, setCurrentWorkoutSession] = useState<IWorkoutSession>(defaultWorkoutSession);

  return (
    <ThemeProvider theme={theme}>
      <SportAppContext.Provider
        value={{
          setWorkoutSettings,
          setCurrentWorkoutSession,
          workoutSettings: workoutSettings || workoutDefaultSettings,
          currentWorkoutSession: currentWorkoutSession || defaultWorkoutSession,
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
