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
  const firstExIndex = activeWorkoutManager.getExercisePositionByIndex(0, includeCardio);
  const firstCardExIndex = activeWorkoutManager.getCardioExercisePositionByIndex(0);
  const secondExIndex = activeWorkoutManager.getExercisePositionByIndex(1, includeCardio);
  const secondCardExIndex = activeWorkoutManager.getCardioExercisePositionByIndex(1);
  const activeExercisesList = activeWorkoutManager.getCurrentRoundExercisesList(activeWorkout);
  const isFirstExercise = activeExerciseIndex <= activeWorkoutManager.TABATA_EXERCISES_INDEXES.firstRoundExIndexLimit;

  const activeExerciseIndexInList = isFirstExercise ? firstExIndex : secondExIndex;
  const activeCardioExercise = isFirstExercise ? activeExercisesList[firstCardExIndex] : activeExercisesList[secondCardExIndex];
  const isRestingBetweenRounds = activeWorkoutManager.isRestBetweenRounds(activeWorkout);
  const activeExercise = !isRestingBetweenRounds ? activeExercisesList[activeExerciseIndexInList] : activeWorkoutManager.getNextExercise(activeWorkout);

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
                        roundIndex={isRestingBetweenRounds ? activeRoundIndex + 1 : activeRoundIndex}
                        exerciseIndex={isRestingBetweenRounds ? 0 : activeExerciseIndexInList}
                        isCardio={isExerciseCardio(activeExercise)}
                        title={"Current activeExercise:"}
                        {...activeExercise}
                      />
                    </Grid>
                    {includeCardio && !isRestingBetweenRounds && (<Grid item xs={6}>
                      <ExerciseDetail
                        roundIndex={activeRoundIndex}
                        exerciseIndex={activeExerciseIndexInList + 1}
                        isCardio={true}
                        title={"Cardio activeExercise:"}
                        {...activeCardioExercise}
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