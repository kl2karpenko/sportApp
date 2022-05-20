import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";

import { useStyles } from "../styles";
import {IWorkoutDeprecatedObj} from "../../../interfaces/IWorkoutDeprecatedObj";
import {IWorkoutSession} from "../../../interfaces/IWorkoutSession";

interface IExercisesStepperProps { workoutSettings: IWorkoutDeprecatedObj; currentExercise: number; isResting: boolean; currentWorkoutSession: IWorkoutSession }

const ifCurrentStepIsRest = (isResting: boolean, exercise: number, currentExercise: number): boolean => isResting && (exercise + 1) === currentExercise;
const ifCurrentStepIsCompleted = (isResting: boolean, exercise: number, currentExercise: number): boolean => (exercise + 1) < currentExercise;

export default function ExercisesStepper({ workoutSettings, isResting, currentExercise, currentWorkoutSession }: IExercisesStepperProps) {
  const classes = useStyles();
  const { all_exercises_for_generated_list: allExercises } = workoutSettings;
  const { round: currentRound } = currentWorkoutSession;
  const exercisesForThisRound = allExercises && allExercises[currentRound - 1];

  return (
    <Box ml={1} className={classes.stretchHeight}>
      <Stepper className={classes.stretchHeight} activeStep={currentExercise - 1} orientation="vertical">
        {[...Array(workoutSettings.exercises).keys()].map((exercise: number) => {
          const currentExerciseData = exercisesForThisRound?.exercises && exercisesForThisRound.exercises[exercise];
          const currentExerciseName = currentExerciseData?.label;
          const isRestStep = ifCurrentStepIsRest(isResting, exercise, currentExercise);
          const isCompleted = ifCurrentStepIsCompleted(isResting, exercise, currentExercise);
          return (
            <Step key={`exercise-${exercise}`} completed={isCompleted} color={isCompleted ? "secondary" : "primary"}>
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