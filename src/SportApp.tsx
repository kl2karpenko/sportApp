import React, { useState } from "react";
import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { PaletteMode, Switch, Box, Typography, FormControlLabel, Theme } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";
import { ThemeProvider } from "@mui/material/styles";

import { store } from "./store/main"

import createTheme from "./theme";
import CreateWorkout from "./components/CreateWorkout";
import { SportAppContext } from "./SportAppContext";
import NoMatch from "./components/NoMatch";
import { CurrentWorkout } from "./components/Workout";
import { IDialogProps } from "./interfaces/IDialogProps";
import ModalDialog from "./components/Dialog";
import { makeStyles } from "tss-react/mui";

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

export const defaultWorkoutSession = {
  round: 0,
  exercise: 0,
  inProgress: false,
  isResting: false,
  isDone: false
};

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    backgroundColor: theme?.palette?.background?.default
  }
}));

function SportApp() {
  const [dialogProps, setDialogProps] = useState<IDialogProps>({ open: false });
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const theme = createTheme(mode);
  const isLightMode = theme?.palette?.mode === "light";
  const { classes } = useStyles();

  return (
    <Provider store={store}>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={theme}>
          <SportAppContext.Provider
            value={{
              dialogProps,
              setDialogProps
            }}
          >
            <Box key="sportMainApp" className={classes.root}>
              <Box px={10} py={2}>
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
              <Router>
                <Routes>
                  <Route index element={<CreateWorkout key="startWorkout"/>} />
                  <Route path="workout" element={<CurrentWorkout key="currentWorkout" />} />
                  <Route path="done" element={<span key="workoutDone">Workout is DONE!!!! Congratulations!)</span>} />
                  <Route path="*" element={<NoMatch key="noMatch" />} />
                </Routes>
              </Router>
              <ModalDialog />
            </Box>
          </SportAppContext.Provider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default SportApp;
