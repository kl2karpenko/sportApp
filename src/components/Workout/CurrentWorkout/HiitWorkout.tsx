import React from "react";
import { useSelector } from "react-redux";

import { Box, Card, CardContent, Grid } from "@mui/material";

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

export default function HiitWorkout({ activeWorkoutManager }: { activeWorkoutManager: ActiveWorkoutManagerService }): React.ReactElement {
  const { classes } = useStyles();
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  const {
    exercisesLength
  } = workoutSession;

  const {
    activeExerciseIndex,
    activeRoundIndex,
    isResting
  } = activeWorkout;
  const activeExercise = activeWorkoutManager.getActiveExercise(activeWorkout);
  const nextExercise = activeWorkoutManager.getNextExercise(activeWorkout);

  const isNextExerciseGetFromNextRound = activeExerciseIndex + 1 > exercisesLength;

  return (
    <Box pt={20} minHeight="100%">
      <Card variant="outlined" className={classes.mainCard}>
        <Grid container direction="column" alignContent="center" alignItems="stretch" className={classes.stretchHeight} spacing={2}>
          <Grid item xs={12}>
            <CardContent className={classes.stretchHeight}>
              <Grid container spacing={5} className={classes.stretchHeight}>
                <Grid item xs={12} alignSelf={"flex-end"}>
                  <RoundsStepper />
                </Grid>
                <Grid item xs={1} alignItems="stretch" alignContent="center" style={{ height: "calc(100% - 60px)" }}>
                  <ExercisesStepper activeWorkoutManager={activeWorkoutManager} />
                </Grid>
                <Grid item xs={11}>
                  <Grid container spacing={2} alignContent={"center"} justifyContent={"center"} alignItems={"center"} className={classes.exercisesView}>
                    <Grid item xs={isResting ? 12 : 8}>
                      <ExerciseDetail
                        roundIndex={activeRoundIndex}
                        exerciseIndex={!isResting ? activeExerciseIndex : activeExerciseIndex + 1}
                        isCardio={isExerciseCardio(!isResting ? activeExercise : nextExercise)}
                        label={!isResting ? activeExercise?.label : nextExercise?.label}
                        img={!isResting ? activeExercise?.img : nextExercise?.img}
                        title={!isResting ? "In Progress:" : "Next:"}
                        {...!isResting ? activeExercise : nextExercise}
                      />
                    </Grid>
                    {!isResting && (
                      <Grid item xs={4}>
                        <ExerciseDetail
                          roundIndex={isNextExerciseGetFromNextRound ? activeRoundIndex + 1 : activeRoundIndex}
                          exerciseIndex={isNextExerciseGetFromNextRound ?  0 : activeExerciseIndex + 1}
                          isCardio={isExerciseCardio(nextExercise)}
                          title={"Next Exercise"}
                          {...nextExercise}
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