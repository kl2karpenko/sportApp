import React, { Fragment } from "react";

import { Box, Button, Badge, Grid, Typography, Chip, List, ListItem, ListItemText } from "@mui/material";
import ShuffleIcon from "@material-ui/icons/Cached";
import IRound from "../../../models/Round/IRound";
import IExercise from "../../../models/Exercise/IExercise";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { getBodyPartLabel } from "../../../store/bodyParts";
import { getRoundByIndex } from "../../../store/workoutSession";

interface IWorkoutRoundExercisesPreviewProps {
  round: IRound;
  roundIndex: number;
  handleRandomChangeExerciseForRound: (round: number, exerciseNum: number, isCardio: boolean) => void;
  handleChangeExerciseForRound(roundIndex: number, exerciseIndex: number, value: string): void;
}

export default function HIITWorkoutPreviewRound({
  round,
  roundIndex,
  handleRandomChangeExerciseForRound
}: IWorkoutRoundExercisesPreviewProps
) {
  const currentRound = useSelector((state: RootState) => getRoundByIndex(state.workoutSession, roundIndex));
  const bodyPartName = round.bodyId;
  const bodyPartLabel: string = useSelector((state: RootState) => getBodyPartLabel(state.bodyParts, bodyPartName));

  return (
    <Fragment key={round.bodyId}>
      <Grid item xs={12}>
        <Typography variant="body1" color={"primary"}>{bodyPartLabel}</Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
          {(currentRound.exercisesList || []).map((exercise: IExercise, index) => {
            const isCardio = exercise.id.includes("cardio");
            const chipLabel = exercise.id.replace(/-ex\d+/gi,"");

            return (
              <ListItem disableGutters divider key={`${roundIndex}-${exercise.id}`}
                secondaryAction={
                  <Box
                    minWidth={15}
                    pl={2}
                    pr={0.5}
                    component={Button}
                    color="secondary"
                    size="small"
                    startIcon={<ShuffleIcon fontSize="small" />}
                    variant={"outlined"}
                    onClick={() => handleRandomChangeExerciseForRound(roundIndex, index, isCardio)}
                  />
                }>
                <ListItemText>
                  {`${index + 1}. ${exercise.label}`} <Chip label={chipLabel} size="small" color={isCardio ? "error" : "primary"} />
                </ListItemText>

              </ListItem>
            )
          })}
        </List>
      </Grid>
    </Fragment>
  )
}