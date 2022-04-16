import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

import { useStyles } from "../styles";
import {IWorkoutType} from "../../../interfaces/IWorkoutType";

interface IExercisesStepperProps { workoutSettings: IWorkoutType; currentExercise: number; isResting: boolean }

export default function ExercisesStepper({ workoutSettings, isResting, currentExercise }: IExercisesStepperProps) {
  const classes = useStyles();

  return (
    <Box ml={1} className={classes.stretchHeight}>
      <Stepper className={classes.stretchHeight} activeStep={currentExercise - 1} orientation="vertical">
        {[...Array(workoutSettings.exercises).keys()].map((exercise: number) => {
          return (
            <Step key={`exercise-${exercise}`}>
              <StepLabel>{isResting && exercise === (currentExercise - 1) ? "Rest" : (exercise < (currentExercise - 1) ? "Done" : "Exercise")}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}