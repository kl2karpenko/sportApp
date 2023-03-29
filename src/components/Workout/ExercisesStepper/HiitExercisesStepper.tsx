import { Box, Chip, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";

import { useStyles } from "../styles";
import IExercise from "../../../models/Exercise/IExercise";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";

export default function HiitExercisesStepper() {
  const { classes } = useStyles();
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  const { rounds: allRounds } = workoutSession;
  const { activeRoundIndex, activeExerciseIndex, isResting } = activeWorkout;

  const currentRound = allRounds[activeRoundIndex] || {};
  const allExercises = currentRound.exercisesList || [];

  return (
    <Box ml={1} className={classes.stretchHeight}>
      <Stepper className={classes.stretchHeight} activeStep={activeExerciseIndex} orientation="vertical">
        {[...allExercises].map((exercise: Partial<IExercise>, exerciseIndex: number) => {
          const isActive = exerciseIndex === activeExerciseIndex;
          const isCompleted = exerciseIndex < activeExerciseIndex;
          const isRestStep = isResting && isActive;
          const isCardio = exercise?.id?.includes("cardio");

          return (
            <Step active={isActive} key={`exercise-${exerciseIndex}`} completed={!isActive && isCompleted} color={"secondary"}>
              <StepLabel color={"secondary"}>
                <Typography className={(isActive || isRestStep) && classes.bold || ""} variant={"caption"}>
                  {isCardio ? <Chip className={classes.chip} size="small" color="error" /> : ""}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}