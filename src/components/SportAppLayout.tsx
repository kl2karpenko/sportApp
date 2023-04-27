import React, { useContext, useEffect } from "react";

import { Box, Button, FormControlLabel, Switch, Typography } from "@mui/material";

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import CreateWorkout from "./CreateWorkout";
import { CurrentWorkout } from "./Workout";
import NoMatch from "./NoMatch";
import ModalDialog from "./Dialog";
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";
import { SportAppContext } from "./SportAppContext";
import localStorageProxy from "../services/LocalStorage";
import { IWorkoutSessionState, setWorkoutSession } from "../store/workoutSession";
import { useDispatch } from "react-redux";
import { updateWorkoutState } from "../store/activeWorkout";
import { IActiveWorkoutState } from "../services/ActiveWorkoutManagerService/IActiveWorkoutState";

export default function SportAppLayout() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isLightMode = theme?.palette?.mode === "light";
  const { classes } = useStyles();
  const { setMode } = useContext(SportAppContext);

  useEffect(() => {
    let activeWorkoutSession = localStorageProxy.getActiveWorkoutSession();
    let activeWorkout = localStorageProxy.getActiveWorkout();

    if (activeWorkoutSession) {
      dispatch(setWorkoutSession(activeWorkoutSession as IWorkoutSessionState))
    }
    if (activeWorkout) {
      dispatch(updateWorkoutState(activeWorkout as IActiveWorkoutState))
    }
  }, [dispatch]);

  return (
    <Box key="sportMainApp" className={classes.root}>
      <Box className={classes.switcher}>
        <FormControlLabel
          control={<Switch
            {...({ inputProps: { "aria-label": "Theme switcher" } })}
            defaultChecked
            color="secondary"
            checked={isLightMode}
            onChange={() => setMode(prevMode =>
              prevMode === "light" ? "dark" : "light",
            )}
          />}
          label={<Typography color={theme?.palette?.text?.primary} variant={"body1"}>{isLightMode ? "Switch to dark mode" : "Switch to light mode"}</Typography>}
        />
      </Box>

      <Router basename="sportApp">
        <Routes>
          <Route index element={<CreateWorkout key="startWorkout"/>} />
          <Route path="/workout" element={<CurrentWorkout key="currentWorkout" />} />
          <Route path="/done" element={<span key="workoutDone">Workout is DONE!!!! Congratulations!)</span>} />
          <Route path="*" element={<NoMatch key="noMatch" />} />
        </Routes>
      </Router>
      <ModalDialog />
    </Box>
  );
}
