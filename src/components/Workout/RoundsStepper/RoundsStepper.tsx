import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

import IRound from "../../../models/Round/IRound";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { getBodyPartLabel } from "../../../store/bodyParts";
import { TValues } from "../../../interfaces/TValues";
import { EBodyParts } from "../../../data/bodyPartsForWorkout";
import useStyles from "./styles";

export default function RoundsStepper() {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  const bodyParts = useSelector((state: RootState) => state.bodyParts);
  const { rounds: allRounds } = workoutSession;
  const { activeRoundIndex } = activeWorkout;
  const { classes } = useStyles();

  return (
    <Stepper activeStep={activeRoundIndex} alternativeLabel>
      {[...allRounds].map((round: Partial<IRound>, roundIndex: number) => {
        const currentRoundBodyPart: TValues<typeof EBodyParts> = round.bodyId as TValues<typeof EBodyParts>;
        const bodyPartLabel = getBodyPartLabel(bodyParts, currentRoundBodyPart);

        return (
          <Step key={`round-${roundIndex}`} active={roundIndex === activeRoundIndex} completed={roundIndex < activeRoundIndex}>
            <StepLabel StepIconProps={{
              classes: {
                active: classes.icon,
                text: classes.text,
              }
            }}>{bodyPartLabel}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}