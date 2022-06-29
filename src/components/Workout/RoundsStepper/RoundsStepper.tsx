import { Step, StepLabel, Stepper } from "@mui/material";
import React, { useContext } from "react";

import { IWorkoutDeprecatedObj } from "../../../interfaces_deprecated/IWorkoutDeprecatedObj";
import bodyPartsForWorkout from "../../../data/bodyPartsForWorkout";
import { SportAppContext } from "../../../SportAppContext";
import WorkoutBuilderService from "../../../services/WorkoutBuilderService/WorkoutBuilderService";
import IRound from "../../../models/Round/IRound";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";

export default function RoundsStepper() {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const { rounds: allRounds, activeRoundIndex } = workoutSession;

  return (
    <Stepper activeStep={activeRoundIndex - 1}>
      {[...allRounds].map((round: IRound, index: number) => {
        const currentRoundBodyPart = round.bodyId;
        const currentRoundBodyPartLabel = round.bodyId;

        return (
          <Step key={`round-${round}`}>
            <StepLabel>{round < (activeRoundIndex - 1) ? "Round Completed" : currentRoundBodyPartLabel}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}