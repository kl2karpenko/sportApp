import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

import IRound from "../../../models/Round/IRound";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { getBodyPartLabel } from "../../../store/bodyParts";
import { TValues } from "../../../interfaces/TValues";
import { EBodyParts } from "../../../data/bodyPartsForWorkout";

export default function RoundsStepper() {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  const bodyParts = useSelector((state: RootState) => state.bodyParts);
  const { rounds: allRounds } = workoutSession;
  const { activeRoundIndex } = activeWorkout;

  return (
    <Stepper activeStep={activeRoundIndex}>
      {[...allRounds].map((round: Partial<IRound>, roundIndex: number) => {
        const currentRoundBodyPart: TValues<typeof EBodyParts> = round.bodyId as TValues<typeof EBodyParts>;
        const bodyPartLabel = getBodyPartLabel(bodyParts, currentRoundBodyPart);

        return (
          <Step key={`round-${roundIndex}`} active={roundIndex === activeRoundIndex} completed={roundIndex < activeRoundIndex}>
            <StepLabel>{bodyPartLabel}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}