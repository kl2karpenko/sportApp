import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

import IRound from "../../../models/Round/IRound";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { getBodyPartLabel } from "../../../store/bodyParts";

export default function RoundsStepper() {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  const bodyParts = useSelector((state: RootState) => state.bodyParts);
  const { rounds: allRounds } = workoutSession;
  const { activeRoundIndex } = activeWorkout;

  return (
    <Stepper activeStep={activeRoundIndex}>
      {[...allRounds].map((round: IRound, roundIndex: number) => {
        const currentRoundBodyPart = round.bodyId;
        const bodyPartLabel = getBodyPartLabel(bodyParts, currentRoundBodyPart);

        return (
          <Step key={`round-${round}`} active={roundIndex === activeRoundIndex} completed={roundIndex < activeRoundIndex}>
            <StepLabel>{bodyPartLabel}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}