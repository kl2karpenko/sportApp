import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import { useStyles } from "./styles";
import IExercise from "../../../models/Exercise/IExercise";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import TabataWorkoutManagerService from "../../../services/ActiveWorkoutManagerService/TabataWorkoutManagerService";

export default function TabataExercisesStepper({ activeWorkoutManager }: { activeWorkoutManager: TabataWorkoutManagerService }) {
  const { classes } = useStyles();
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  const { rounds: allRounds, includeCardio, exercisesLength } = workoutSession;
  const { activeRoundIndex, activeExerciseIndex, isResting } = activeWorkout;
  const currentRound = allRounds[activeRoundIndex] || {};
  const allExercises = currentRound.exercisesList || [];
  // TODO: move to some service
  const exercisesForTabata = [
    allExercises[includeCardio ? activeWorkoutManager.indexes.firstExWithCardio : activeWorkoutManager.indexes.firstExWithoutCardio],
    allExercises[includeCardio ? activeWorkoutManager.indexes.secondExWithCardio : activeWorkoutManager.indexes.secondExWithoutCardio],
  ]
  const cardioExercisesForTabata = includeCardio ? [
    allExercises[includeCardio && activeWorkoutManager.indexes.firstCardioExIndex],
    allExercises[includeCardio && activeWorkoutManager.indexes.secondCardioExIndex],
  ] : [];
  const ifFirstSetOfExercises = activeExerciseIndex <= 3;

  return (
    <Box ml={1} className={classes.stretchHeight}>
      <Box className={classes.activeRound}>
        Active round: {activeExerciseIndex + 1}
      </Box>
      {exercisesForTabata.map((exercise: Partial<IExercise>, exerciseIndex: number) => {
        const isActive = exerciseIndex === 0 ? ifFirstSetOfExercises : true;
        const isCompleted = exerciseIndex === 0 ? activeExerciseIndex >= 4 : activeExerciseIndex === exercisesLength - 1;

        return (
          <Box component={Grid} mt={5} key={exercise.id} container direction="column" spacing={3}>
            <Grid item>
              <Typography variant="h5">
                {exercise?.label}
              </Typography>

              {includeCardio ? (
                <Box>
                  <Typography variant="h6" className={classes.bold}>
                      Cardio: {cardioExercisesForTabata[exerciseIndex]?.label}
                  </Typography>
                </Box>
              ) : ""}
            </Grid>
          </Box>
        )
      })}
    </Box>
  );
}