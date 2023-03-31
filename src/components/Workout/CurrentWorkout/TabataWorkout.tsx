import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Box, Card, CardContent, Grid } from "@mui/material";

import ExercisesStepper from "../ExercisesStepper";
import RoundsStepper from "../RoundsStepper";
import { useStyles } from "../styles";
import { RootState } from "../../../store/main";
import ExerciseDetail from "../ExerciseDetail";
import IExercise from "../../../models/Exercise/IExercise";
import TabataWorkoutManagerService from "../../../services/ActiveWorkoutManagerService/TabataWorkoutManagerService";

const isExerciseCardio = (ex: Partial<IExercise>): boolean => (ex?.id || "").includes("cardio");

export default function TabataWorkout({ activeWorkoutManager }: { activeWorkoutManager: TabataWorkoutManagerService }): React.ReactElement {
  const { classes } = useStyles();
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  const {
    rounds,
    includeCardio
  } = workoutSession;
  const {
    activeExerciseIndex,
    activeRoundIndex
  } = activeWorkout;
  const firstExIndex = activeWorkoutManager.getExerciseIndex(0, includeCardio);
  const secondExIndex = activeWorkoutManager.getExerciseIndex(1, includeCardio);
  const currentRound = rounds[activeRoundIndex] || {};
  const nextRound = rounds[activeRoundIndex + 1] || {};
  const activeExercisesList = currentRound.exercisesList || [];
  const exerciseIndexInList = activeExerciseIndex <= activeWorkoutManager.TABATA_EXERCISES_INDEXES.firstRoundEndIndex ? firstExIndex : secondExIndex;
  const isFirstExercise = exerciseIndexInList === 0;
  const currentExercise = isFirstExercise ? activeExercisesList[exerciseIndexInList] : activeExercisesList[exerciseIndexInList];
  const currentCardioExercise = includeCardio ? (isFirstExercise ? activeExercisesList[activeWorkoutManager.TABATA_EXERCISES_INDEXES.firstCardioExIndex] : activeExercisesList[activeWorkoutManager.TABATA_EXERCISES_INDEXES.secondCardioExIndex]) : {};
  const isRestingBetweenRounds = activeWorkoutManager.isRestBetweenRounds(activeWorkout);

  return (
    <Box pt={20} px={2} minHeight="100%">
      <Card variant="outlined" style={{ height: "calc(100% - 160px)", padding: 10 }}>
        <Grid container direction="column" alignContent="center" alignItems="stretch" className={classes.stretchHeight} spacing={2}>
          <Grid item xs={12}>
            <CardContent className={classes.stretchHeight}>
              <Grid container spacing={5} className={classes.stretchHeight}>
                <Grid item xs={12} alignSelf={"flex-end"}>
                  <RoundsStepper />
                </Grid>
                <Grid item xs={4} alignItems="stretch" alignContent="center" style={{ height: "calc(100% - 60px)" }}>
                  <ExercisesStepper activeWorkoutManager={activeWorkoutManager} />
                </Grid>
                <Grid item xs={8}>
                  <Grid container spacing={2} className={classes.exercisesView}>
                    <Grid item xs={includeCardio ? 6 : 12}>
                      <ExerciseDetail
                        roundIndex={activeRoundIndex}
                        exerciseIndex={exerciseIndexInList}
                        isCardio={isExerciseCardio(currentExercise)}
                        title={"Current currentExercise:"}
                        {...currentExercise}
                      />
                    </Grid>
                    {includeCardio && (<Grid item xs={6}>
                      <ExerciseDetail
                        roundIndex={activeRoundIndex}
                        exerciseIndex={exerciseIndexInList + 1}
                        isCardio={true}
                        title={"Cardio currentExercise:"}
                        {...currentCardioExercise}
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