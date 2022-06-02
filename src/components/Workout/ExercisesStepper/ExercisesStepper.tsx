import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";

import { useStyles } from "../styles";
import WorkoutCreatorService from "../../../services/WorkoutCreatorService/WorkoutCreatorService";
import IWorkoutSession from "../../../services/WorkoutSessionService/IWorkoutSession";
import IRound from "../../../models/Round/IRound";

interface IExercisesStepperProps {
  workoutCreatorService: WorkoutCreatorService;
  currentExercise: number;
  isResting: boolean;
  workoutSession: IWorkoutSession;
}

const ifCurrentStepIsRest = (isResting: boolean, exercise: number, currentExercise: number): boolean => isResting && (exercise + 1) === currentExercise;
const ifCurrentStepIsCompleted = (isResting: boolean, exercise: number, currentExercise: number): boolean => (exercise + 1) < currentExercise;

export default function ExercisesStepper({ workoutCreatorService, isResting, currentExercise, workoutSession }: IExercisesStepperProps) {
  const classes = useStyles();
  const { activeRoundIndex: currentRound, rounds: allRounds } = workoutSession;
  // const exercisesInRound = allExercises && allExercises[currentRound - 1].exercisesList;

  return (
    <Box ml={1} className={classes.stretchHeight}>
      <Stepper className={classes.stretchHeight} activeStep={currentExercise - 1} orientation="vertical">
        {[...allRounds].map((round: IRound, index: number) => {
          const allExercises = round.exercisesList;
          const currentExerciseName = workoutCreatorService.getBodyPartLabel(round.bodyId);
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