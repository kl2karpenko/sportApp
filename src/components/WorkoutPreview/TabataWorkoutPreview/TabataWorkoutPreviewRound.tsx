import React, { Fragment } from "react";

import { Grid, Typography } from "@mui/material";
import IRound from "../../../models/Round/IRound";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { getBodyPartLabel } from "../../../store/bodyParts";
import IExercise from "../../../models/Exercise/IExercise";

export default function TabataWorkoutPreviewRound({ round, roundIndex }: { round: IRound; roundIndex: number }) {
  const bodyPartName = round.bodyId;
  const bodyPartLabel: string = useSelector((state: RootState) => getBodyPartLabel(state.bodyParts, bodyPartName));
  const exercisesInThisRound = round.exercisesList;
  const ex1 = exercisesInThisRound[0];
  const ex2 = exercisesInThisRound[4];
  const cardio = exercisesInThisRound[exercisesInThisRound.length - 1];

  return (
    <Fragment key={round.bodyId}>
      <Grid item xs={12}>
        <Typography variant="h5" color="primary">{bodyPartLabel}</Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={4} direction={"column"}>
          <Grid item xs={12}>
            {[ex1, ex2, cardio].map((ex: Partial<IExercise>, index: number) => (
              <Typography key={`${ex.id}-${index}`} variant="body1">{index + 1}. {ex.label}</Typography>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}