import React, { Fragment } from "react";

import { Box, Button, Grid, Typography } from "@mui/material";
import IRound from "../../../models/Round/IRound";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { getBodyPartLabel } from "../../../store/bodyParts";
import IExercise from "../../../models/Exercise/IExercise";
import ShuffleIcon from "@material-ui/icons/Cached";

interface ITabataWorkoutPreviewRoundProps {
  round: IRound;
  roundIndex: number;
  handleRandomChangeExerciseForRound(roundIndex: number, exerciseIndex: number, value: string): void;
}

export default function TabataWorkoutPreviewRound({ round, roundIndex, handleRandomChangeExerciseForRound }: ITabataWorkoutPreviewRoundProps) {
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
              <Grid container spacing={2} key={`${ex.id}-${index}`}>
                <Grid item xs={10}><Typography  variant="body1">{index + 1}. {ex.label}</Typography></Grid>
                <Grid item xs={2}>
                  <Box
                    minWidth={15}
                    pl={2}
                    pr={0.5}
                    component={Button}
                    color="secondary"
                    size="small"
                    startIcon={<ShuffleIcon fontSize="small" />}
                    variant={"outlined"}
                    onClick={() => handleRandomChangeExerciseForRound(roundIndex, index === 0 ? 0 : (index === 2 ? 8 : 4), index === 2)}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}