import React, { ChangeEvent, useEffect, useMemo, useState, useCallback, ChangeEventHandler } from "react";
import { useSelector } from "react-redux";

import { Box, Card, CardContent, Grid, Typography, TextField } from "@mui/material";

import Timer from "../Timer";
import ExercisesStepper from "../ExercisesStepper";
import RoundsStepper from "../RoundsStepper";
import { useStyles } from "../styles";
import { RootState } from "../../../store/main";
import ActiveWorkoutManagerService from "../../../services/ActiveWorkoutManagerService/ActiveWorkoutManagerService";
import ExerciseDetail from "../ExerciseDetail";
import IExercise from "../../../models/Exercise/IExercise";
import { getBodyPartLabel } from "../../../store/bodyParts";
import { TValues } from "../../../interfaces/TValues";
import { EBodyParts } from "../../../data/bodyPartsForWorkout";

const isExerciseCardio = (ex: Partial<IExercise>): boolean => (ex?.id || "").includes("cardio");

export default function HiitWorkout(): React.ReactElement {
  const { classes } = useStyles();
  const [url, setUrl] = useState("https://www.youtube.com/embed/qsW5bCrv94s");
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  const {
    rounds
  } = workoutSession;

  const activeWorkoutManager = useMemo(() => new ActiveWorkoutManagerService({
    workoutSession
  }), [workoutSession]);
  const {
    activeExerciseIndex,
    activeRoundIndex
  } = activeWorkout;
  const currentRound = rounds[activeRoundIndex] || {};
  const nextRound = rounds[activeRoundIndex + 1] || {};
  const activeExercisesList = currentRound.exercisesList || [];
  const nextRoundExercisesList = nextRound.exercisesList || [];
  const activeExercise = activeExercisesList[activeExerciseIndex] || {};
  const nextExercise = activeExercisesList[activeExerciseIndex + 1] || nextRoundExercisesList[0] || {};
  const bodyPartLabel: string = useSelector((state: RootState) => getBodyPartLabel(state.bodyParts, currentRound.bodyId as TValues<typeof EBodyParts>));
  const bodyPartImage: string = useSelector((state: RootState) => getBodyPartLabel(state.bodyParts, currentRound.bodyId as TValues<typeof EBodyParts>));

  const isResting = activeWorkout.isResting;

  return (
    <Box p={2} minHeight="100%">
      <Card variant="outlined" className={classes.mainCard}>
        <Grid container direction="column" alignContent="center" alignItems="stretch" className={classes.stretchHeight} spacing={2}>
          <Grid item xs={12} alignContent={"center"}>
            <Grid container>
              <Grid item>
                <Typography align="center" variant="h5">Workout in Progress:&nbsp;</Typography>
              </Grid>
              <Grid item>
                <Typography align="center" variant="h5">{bodyPartLabel}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CardContent className={classes.stretchHeight}>
              <Grid container spacing={5} className={classes.stretchHeight}>
                <Grid item xs={12} alignSelf={"flex-end"}>
                  <RoundsStepper />
                </Grid>
                <Grid item xs={1} alignItems="stretch" alignContent="center" style={{ height: "calc(100% - 60px)" }}>
                  <ExercisesStepper />
                </Grid>
                <Grid item xs={11}>
                  <Grid container spacing={2} alignContent={"center"} justifyContent={"center"} alignItems={"center"} className={classes.exercisesView}>
                    <Grid item xs={8}>
                      <Timer activeWorkoutManager={activeWorkoutManager} />
                    </Grid>
                    <Grid item xs={8}>
                      <ExerciseDetail
                        roundIndex={activeRoundIndex}
                        exerciseIndex={!isResting ? activeExerciseIndex : activeExerciseIndex}
                        isCardio={isExerciseCardio(!isResting ? activeExercise : nextExercise)}
                        exerciseName={!isResting ? activeExercise?.label : nextExercise.label}
                        exerciseImg={!isResting ? activeExercise?.img : nextExercise?.img}
                        description={!isResting ? "In Progress:" : "Next:"}
                      />
                    </Grid>
                    {!isResting && (
                      <Grid item xs={4}>
                        <ExerciseDetail
                          roundIndex={activeRoundIndex}
                          exerciseIndex={activeExerciseIndex + 1}
                          isCardio={isExerciseCardio(nextExercise)}
                          exerciseName={nextExercise.label}
                          exerciseImg={nextExercise?.img}
                          description={"Next:"}
                        />
                      </Grid>
                    )}
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