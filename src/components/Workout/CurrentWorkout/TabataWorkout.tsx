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

export default function TabataWorkout(): React.ReactElement {
  const { classes } = useStyles();
  const [url, setUrl] = useState("https://www.youtube.com/embed/qsW5bCrv94s");
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  const {
    rounds,
    includeCardio
  } = workoutSession;
  const activeWorkoutManager = useMemo(() => new ActiveWorkoutManagerService({
    workoutSession
  }), [workoutSession]);
  const {
    activeExerciseIndex,
    activeRoundIndex
  } = activeWorkout;
  const currentRound = rounds[activeRoundIndex] || {};
  const activeExercisesList = currentRound.exercisesList || [];
  const exerciseIndex = activeExerciseIndex <= 3 ? 0 : 1;
  const exercise = activeExerciseIndex <= 3 ? activeExercisesList[exerciseIndex] : activeExercisesList[exerciseIndex];
  const cardioExercise = includeCardio ? activeExercisesList[2] : {};
  const bodyPartLabel: string = useSelector((state: RootState) => getBodyPartLabel(state.bodyParts, currentRound.bodyId as TValues<typeof EBodyParts>));

  return (
    <Box p={20} minHeight="100%">
      <Box className={classes.timer}>
        <Timer activeWorkoutManager={activeWorkoutManager} />
      </Box>
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
                    {/*<Grid item xs={12}>*/}
                    {/*  <TextField*/}
                    {/*    id="url"*/}
                    {/*    label="Enter video source" value={url}*/}
                    {/*    variant="outlined"*/}
                    {/*    fullWidth={true}*/}
                    {/*    // @ts-ignore*/}
                    {/*    onChange={(e: ChangeEventHandler<HTMLTextAreaElement>) => setUrl(e.target?.value)}*/}
                    {/*  />*/}

                    {/*  <iframe width="100%" height="600" src={url}*/}
                    {/*    title="YouTube video player" frameBorder="0"*/}
                    {/*    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
                    {/*    allowFullScreen></iframe>*/}
                    {/*</Grid>*/}
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