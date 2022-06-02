import React, {useEffect, useMemo, useState} from "react";
import {ThemeProvider} from "@mui/material/styles";

import {BrowserRouter as Router} from "react-router-dom";
import {Route, Routes} from "react-router";

import theme from "./theme";
import CreateWorkout from "./components/CreateWorkout";
import workoutsDefaultSettings from "./data/workoutsDefaultSettings";
import { SportAppContext } from "./SportAppContext";
import NoMatch from "./components/NoMatch";
import { CurrentWorkout } from "./components/Workout";
import {IDialogProps} from "./interfaces_deprecated/IDialogProps";
import ModalDialog from "./components/Dialog";
import WorkoutCreatorServiceFactory from "./services/WorkoutCreatorServiceFactory";
import {WorkoutType} from "./interfaces_deprecated/WorkoutType";
import IWorkoutSession from "./services/WorkoutSessionService/IWorkoutSession";
import IWorkoutCreatorService from "./services/WorkoutCreatorService/IWorkoutCreatorService";

export const defaultWorkoutSession = {
  round: 0,
  exercise: 0,
  inProgress: false,
  isResting: false,
  isDone: false
};

function SportApp() {
  const [workoutType, setWorkoutType] = useState<WorkoutType>(WorkoutType.HIIT);
  const [workoutSession, setWorkoutSession] = useState<IWorkoutSession>({
    rounds: [],
    activeRoundIndex: 0,
    exerciseDuration: workoutsDefaultSettings.exercise_duration,
    exercisesLength: workoutsDefaultSettings.exercises,
    roundsLength: workoutsDefaultSettings.rounds,
    restDuration: workoutsDefaultSettings.rest_duration,
    betweenRoundsDuration: workoutsDefaultSettings.rest_between_rounds
  });
  const [dialogProps, setDialogProps] = useState<IDialogProps>({ open: false });
  const workoutCreatorService = useMemo(() => WorkoutCreatorServiceFactory(workoutType, workoutSession), [workoutType]);

  useEffect(() => {
    setWorkoutSession(workoutCreatorService.getCurrentWorkoutSession());
  }, []);
  useEffect(() => {
    setWorkoutSession(workoutCreatorService.getCurrentWorkoutSession());
  }, [workoutType]);

  return (
    <ThemeProvider theme={theme}>
      <SportAppContext.Provider
        value={{
          workoutType,
          setWorkoutType,
          setWorkoutSession,
          workoutSession,
          dialogProps,
          setDialogProps
        }}
      >
        <Router>
          <Routes>
            <Route index element={<CreateWorkout workoutCreatorService={workoutCreatorService} key="startWorkout"/>} />
            <Route path="workout" element={<CurrentWorkout workoutCreatorService={workoutCreatorService} key="currentWorkout" />} />
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
