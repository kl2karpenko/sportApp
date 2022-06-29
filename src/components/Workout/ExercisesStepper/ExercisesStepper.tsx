import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";

import { useStyles } from "../styles";
import IRound from "../../../models/Round/IRound";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";

const ifCurrentStepIsRest = (isResting: boolean, exercise: number, currentExercise: number): boolean => isResting && (exercise + 1) === currentExercise;
const ifCurrentStepIsCompleted = (isResting: boolean, exercise: number, currentExercise: number): boolean => (exercise + 1) < currentExercise;

export default function ExercisesStepper() {
  const classes = useStyles();
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const { activeRoundIndex: currentRound, rounds: allRounds, activeExerciseIndex } = workoutSession;
  // const exercisesInRound = allExercises && allExercises[currentRound - 1].exercisesList;

  return (
    <Box ml={1} className={classes.stretchHeight}>
      <Stepper className={classes.stretchHeight} activeStep={activeExerciseIndex - 1} orientation="vertical">
        {[...allRounds].map((round: IRound, index: number) => {
          const allExercises = round.exercisesList;
          const currentExerciseName = round.bodyId;
          // const isRestStep = ifCurrentStepIsRest(isResting, exercise, currentExercise);
          // const isCompleted = ifCurrentStepIsCompleted(isResting, exercise, currentExercise);

          const isRestStep = false;
          const isCompleted = false;
          return (
            <Step key={`exercise-${round.bodyId}`} completed={isCompleted} color={isCompleted ? "secondary" : "primary"}>
              <StepLabel>
                <Typography className={!isCompleted && !isRestStep && classes.bold || ""}>
                  {currentExerciseName}
                </Typography>
              </StepLabel>
              <StepLabel>
                <Typography className={!isCompleted && isRestStep && classes.bold || ""}>
                  Rest
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}