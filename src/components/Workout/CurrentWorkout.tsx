import React, { useContext, useEffect, useMemo } from "react";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import Timer from "./Timer";
import { SportAppContext } from "../../SportAppContext";
import ExerciseDetail from "./ExerciseDetail";
import ExercisesStepper from "./ExercisesStepper";
import RoundsStepper from "./RoundsStepper";
import { useStyles } from "./styles";
import { IWorkoutGeneratedExercisesList } from "../../interfaces_deprecated/IWorkoutDeprecatedObj";
import bodyPartsForWorkout from "../../data/bodyPartsForWorkout";
import { IBodyPartsForWorkout } from "../../interfaces_deprecated/IBodyPartsForWorkout";
import WorkoutBuilderService from "../../services/WorkoutBuilderService/WorkoutBuilderService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/main";
import ActiveWorkoutManagerService from "../../services/ActiveWorkoutManagerService/ActiveWorkoutManagerService";

interface ICurrentWorkoutProps {
  workoutBuilderService: WorkoutBuilderService;
}

export default function CurrentWorkout({ workoutBuilderService }: ICurrentWorkoutProps): React.ReactElement {
  const classes = useStyles();
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  // stop reload the page
  useEffect(() => {
    window.onbeforeunload = (event) => {
      const e = event || window.event;
      // Cancel the event
      e.preventDefault();
      if (e) {
        e.returnValue = ""; // Legacy method for cross browser support
      }
      return ""; // Legacy method for cross browser support
    };

    return () => {
      window.onbeforeunload = null;
    }
  }, []);

  const {
    rounds,
    exercisesLength,
    roundsLength
  } = workoutSession;

  const activeWorkoutManager = useMemo(() => new ActiveWorkoutManagerService({
    workoutSession
  }), [workoutSession]);
  const {
    activeExerciseIndex: currentExercise,
    activeRoundIndex
  } = activeWorkout;
  const isResting = false;

  // const nextExercise = currentExercise + 1 > exercisesLength ? 1 : currentExercise + 1;
  // const nextRound = currentExercise + 1 > roundsLength ? activeRoundIndex + 1 : activeRoundIndex;
  const currentRound = rounds[activeRoundIndex];

  return (
    <Box p={2} minHeight="100%">
      <Card variant="outlined" style={{ height: "calc(100% - 160px)", padding: 10 }}>
        <Grid container direction="column" alignContent="center" alignItems="stretch" className={classes.stretchHeight} spacing={2}>
          <Grid item xs={12} alignContent={"center"}>
            <Grid container>
              <Grid item>
                <Typography align="center" variant="h5">Workout in Progress:</Typography>
              </Grid>
              <Grid item>
                <Typography align="center" variant="h5">{currentRound.bodyId}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CardContent className={classes.stretchHeight}>
              <Grid container spacing={5} className={classes.stretchHeight}>
                <Grid item xs={12} alignSelf={"flex-end"}>
                  <RoundsStepper />
                </Grid>
                <Grid item xs={2} alignItems="stretch" alignContent="center" style={{ height: "calc(100% - 60px)" }}>
                  <ExercisesStepper isResting={isResting} workoutCreatorService={workoutBuilderService} workoutSession={workoutSession} currentExercise={currentExercise} />
                </Grid>
                <Grid item xs={10}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Grid container spacing={3} alignContent={"center"} justifyContent={"center"} alignItems={"center"}>
                        <Grid item xs={4}>
                          <Timer activeWorkoutManager={activeWorkoutManager} />
                        </Grid>
                        {/*<Grid item xs={4}>*/}
                        {/*  <ExerciseDetail*/}
                        {/*    video={getCurrentExerciseVideo({ activeRoundIndex, currentExercise, all_exercises_for_generated_list })}*/}
                        {/*    exerciseName={getCurrentExerciseLabel({ activeRoundIndex, currentExercise, all_exercises_for_generated_list })}*/}
                        {/*    description={"Current exercise is:"}*/}
                        {/*  />*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={4}>*/}
                        {/*  <ExerciseDetail*/}
                        {/*    video={getCurrentExerciseVideo({ activeRoundIndex, currentExercise: currentExercise + 1, all_exercises_for_generated_list })}*/}
                        {/*    exerciseName={getCurrentExerciseLabel({ activeRoundIndex: nextRound, currentExercise: nextExercise, all_exercises_for_generated_list })}*/}
                        {/*    description={"Next exercise is:"}*/}
                        {/*  />*/}
                        {/*</Grid>*/}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <iframe width="100%" height="600" src={"https://www.youtube.com/embed/IgSn1Z2rq6E"}
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                    </Grid>
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