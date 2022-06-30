import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";
import { ThemeProvider } from "@mui/material/styles";

import { store } from "./store/main"

import theme from "./theme";
import CreateWorkout from "./components/CreateWorkout";
import { SportAppContext } from "./SportAppContext";
import NoMatch from "./components/NoMatch";
import { CurrentWorkout } from "./components/Workout";
import { IDialogProps } from "./interfaces/IDialogProps";
import ModalDialog from "./components/Dialog";

export const defaultWorkoutSession = {
  round: 0,
  exercise: 0,
  inProgress: false,
  isResting: false,
  isDone: false
};

function SportApp() {
  const [dialogProps, setDialogProps] = useState<IDialogProps>({ open: false });
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("/express_backend");
  //     const body = await response.json();
  //   })()
  // }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SportAppContext.Provider
          value={{
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
    </Provider>
  );
}

export default SportApp;
