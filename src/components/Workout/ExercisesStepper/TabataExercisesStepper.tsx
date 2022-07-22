import { Box, Chip, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";

import { useStyles } from "../styles";
import IExercise from "../../../models/Exercise/IExercise";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";

export default function TabataExercisesStepper() {
  const classes = useStyles();
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  const { rounds: allRounds, includeCardio } = workoutSession;
  const { activeRoundIndex, activeExerciseIndex, isResting } = activeWorkout;
  const currentRound = allRounds[activeRoundIndex] || {};
  const allExercises = currentRound.exercisesList || [];
  const cardioExercise = includeCardio && allExercises[allExercises.length - 1];

  return (
    <Box ml={1} className={classes.stretchHeight}>
      <Stepper className={classes.stretchHeight} activeStep={activeExerciseIndex} orientation="vertical">
        {[allExercises[0], allExercises[4]].map((exercise: Partial<IExercise>, exerciseIndex: number) => {
          const ifFirstSetOfExercises = activeExerciseIndex <= 3;
          const isActive = ifFirstSetOfExercises ? activeExerciseIndex <= 3 && exerciseIndex === 0 : exerciseIndex === 1 && activeExerciseIndex <= allExercises.length - 1 && activeExerciseIndex > 3;
          const isCompleted = exerciseIndex === 0 ? !ifFirstSetOfExercises : !ifFirstSetOfExercises && activeExerciseIndex === allExercises.length - 1;
          const isRestStep = isResting && isActive;
          const isCardio = exercise?.id?.includes("cardio");

          return (
            <Step active={isActive} key={`exercise-${exerciseIndex}`} completed={!isActive && isCompleted} color={!isActive && isCompleted ? "secondary" : "primary"}>
              <StepLabel>
                <Typography className={(isActive || isRestStep) && classes.bold || ""} variant={"caption"}>
                  {isActive && !isRestStep ? exercise.label : (isRestStep ? cardioExercise.label : (isCompleted ? "DONE" : exercise.label))}
                  {isCardio ? <Chip label="c" size="small" color="error" /> : ""}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}