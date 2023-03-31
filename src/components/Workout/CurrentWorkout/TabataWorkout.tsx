import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Box, Card, CardContent, Grid } from "@mui/material";

import ExercisesStepper from "../ExercisesStepper";
import RoundsStepper from "../RoundsStepper";
import { useStyles } from "../styles";
import { RootState } from "../../../store/main";
import ActiveWorkoutManagerService from "../../../services/ActiveWorkoutManagerService/ActiveWorkoutManagerService";
import ExerciseDetail from "../ExerciseDetail";
import IExercise from "../../../models/Exercise/IExercise";
import { TABATA_EXERCISES_INDEXES } from "../../../mockedData/testWorkoutSession";

const isExerciseCardio = (ex: Partial<IExercise>): boolean => (ex?.id || "").includes("cardio");

export default function TabataWorkout(): React.ReactElement {
  const { classes } = useStyles();
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  const {
    rounds,
    includeCardio
  } = workoutSession;
  const {
    activeExerciseIndex,
    activeRoundIndex,
    isResting
  } = activeWorkout;
  const firstExIndex = includeCardio ? TABATA_EXERCISES_INDEXES.firstExWithCardio : TABATA_EXERCISES_INDEXES.firstExWithoutCardio;
  const secondExIndex = includeCardio ? TABATA_EXERCISES_INDEXES.secondExWithCardio : TABATA_EXERCISES_INDEXES.secondExWithoutCardio;
  const currentRound = rounds[activeRoundIndex] || {};
  // TODO: get ex from next round
  const nextRound = rounds[activeRoundIndex + 1] || {};
  const activeExercisesList = currentRound.exercisesList || [];
  const exerciseIndex = activeExerciseIndex <= TABATA_EXERCISES_INDEXES.firstRoundEndIndex ? firstExIndex : secondExIndex;
  const isFirstExercise = exerciseIndex === 0;
  const exercise = isFirstExercise ? activeExercisesList[exerciseIndex] : activeExercisesList[exerciseIndex];
  const cardioExercise = includeCardio ? (isFirstExercise ? activeExercisesList[TABATA_EXERCISES_INDEXES.firstCardioExIndex] : activeExercisesList[TABATA_EXERCISES_INDEXES.secondCardioExIndex]) : {};

  return (
    <Box p={20} minHeight="100%">
      <Card variant="outlined" style={{ height: "calc(100% - 160px)", padding: 10 }}>
        <Grid container direction="column" alignContent="center" alignItems="stretch" className={classes.stretchHeight} spacing={2}>
          <Grid item xs={12}>
            <CardContent className={classes.stretchHeight}>
              <Grid container spacing={5} className={classes.stretchHeight}>
                <Grid item xs={12} alignSelf={"flex-end"}>
                  <RoundsStepper />
                </Grid>
                <Grid item xs={2} alignItems="stretch" alignContent="center" style={{ height: "calc(100% - 60px)" }}>
                  <ExercisesStepper />
                </Grid>
                <Grid item xs={10}>
                  <Grid container spacing={2} className={classes.exercisesView}>
                    <Grid item xs={includeCardio ? 6 : 12}>
                      <ExerciseDetail
                        roundIndex={activeRoundIndex}
                        exerciseIndex={exerciseIndex}
                        isCardio={isExerciseCardio(exercise)}
                        title={"Current exercise:"}
                        {...exercise}
                      />
                    </Grid>
                    {includeCardio && (<Grid item xs={6}>
                      <ExerciseDetail
                        roundIndex={activeRoundIndex}
                        exerciseIndex={2}
                        isCardio={true}
                        title={"Next exercise:"}
                        {...cardioExercise}
                      />
                    </Grid>)}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  ) ;
}