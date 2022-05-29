import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

import { IWorkoutDeprecatedObj } from "../../../interfaces_deprecated/IWorkoutDeprecatedObj";
import bodyPartsForWorkout from "../../../data/bodyPartsForWorkout";

interface IRoundsStepperProps { workoutSettings: IWorkoutDeprecatedObj; currentRound: number; }

export default function RoundsStepper({ workoutSettings, currentRound }: IRoundsStepperProps) {
  const { all_exercises_for_generated_list: allExercises } = workoutSettings;

  return (
    <Stepper activeStep={currentRound - 1}>
      {[...Array(workoutSettings.rounds).keys()].map((round: number) => {
        const currentRoundBodyPart = allExercises && allExercises[round];
        const currentRoundBodyPartLabel = currentRoundBodyPart?.bodyPartName && bodyPartsForWorkout[currentRoundBodyPart?.bodyPartName as any] || "Round";

        return (
          <Step key={`round-${round}`}>
            <StepLabel>{round < (currentRound - 1) ? "Round Completed" : currentRoundBodyPartLabel}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}