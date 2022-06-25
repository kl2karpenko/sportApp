import { Step, StepLabel, Stepper } from "@mui/material";
import React, {useContext} from "react";

import { IWorkoutDeprecatedObj } from "../../../interfaces_deprecated/IWorkoutDeprecatedObj";
import bodyPartsForWorkout from "../../../data/bodyPartsForWorkout";
import {SportAppContext} from "../../../SportAppContext";
import WorkoutBuilderService from "../../../services/WorkoutBuilderService/WorkoutBuilderService";
import IRound from "../../../models/Round/IRound";

interface IRoundsStepperProps {
  activeRoundIndex: number;
  workoutCreatorService: WorkoutBuilderService;
}

export default function RoundsStepper({ activeRoundIndex, workoutCreatorService }: IRoundsStepperProps) {
  const { workoutSession } = useContext(SportAppContext);
  const { rounds: allRounds } = workoutSession;

  return (
    <Stepper activeStep={activeRoundIndex - 1}>
      {[...allRounds].map((round: IRound, index: number) => {
        const currentRoundBodyPart = workoutCreatorService.getRoundByIndex(index);
        const currentRoundBodyPartLabel = workoutCreatorService.getBodyPartLabel(round.bodyId);

        return (
          <Step key={`round-${round}`}>
            <StepLabel>{round < (activeRoundIndex - 1) ? "Round Completed" : currentRoundBodyPartLabel}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}