import { Box, StepContent, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";

import { useStyles } from "../styles";
import IExercise from "../../../models/Exercise/IExercise";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { TABATA_EXERCISES_INDEXES } from "../../../mockedData/testWorkoutSession";

export default function TabataExercisesStepper() {
  const { classes } = useStyles();
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  const { rounds: allRounds, includeCardio, exercisesLength } = workoutSession;
  const { activeRoundIndex, activeExerciseIndex, isResting } = activeWorkout;
  const currentRound = allRounds[activeRoundIndex] || {};
  const allExercises = currentRound.exercisesList || [];
  // TODO: move to some service
  const exercisesForTabata = [
    allExercises[includeCardio ? TABATA_EXERCISES_INDEXES.firstExWithCardio : TABATA_EXERCISES_INDEXES.firstExWithoutCardio],
    allExercises[includeCardio ? TABATA_EXERCISES_INDEXES.secondExWithCardio : TABATA_EXERCISES_INDEXES.secondExWithoutCardio],
  ]
  const cardioExercisesForTabata = includeCardio ? [
    allExercises[includeCardio && TABATA_EXERCISES_INDEXES.firstCardioExIndex],
    allExercises[includeCardio && TABATA_EXERCISES_INDEXES.secondCardioExIndex],
  ] : [];
  const ifFirstSetOfExercises = activeExerciseIndex <= 3;

  return (
    <Box ml={1} className={classes.stretchHeight}>
      <Box className={classes.activeRound}>
        Active round: {activeExerciseIndex + 1}
      </Box>
      <Stepper activeStep={activeExerciseIndex} orientation="vertical" alternativeLabel>
        {exercisesForTabata.map((exercise: Partial<IExercise>, exerciseIndex: number) => {
          // TODO: fix
          const isActive = ifFirstSetOfExercises && !isResting;
          const isCompleted = exerciseIndex === 0 ? activeExerciseIndex >= 3 : activeExerciseIndex === exercisesLength - 1;
          console.log(ifFirstSetOfExercises, " ifFirstSetOfExercises");
          console.log(activeExerciseIndex, " activeExerciseIndex");
          console.log(isCompleted, " isCompleted");

          return (
            <Step active={isActive} key={`exercise-${exerciseIndex}`} completed={!isActive && isCompleted} color={!isActive && isCompleted ? "secondary" : "primary"}>
              <StepLabel>
                <Typography variant={"caption"}>
                  {exercise.label}
                </Typography>

                {includeCardio ? (
                  <Box>
                    <Typography variant={"caption"} className={classes.bold}>
                      Cardio:
                      {cardioExercisesForTabata[exerciseIndex]?.label}
                    </Typography>
                  </Box>
                ) : ""}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}