import React, { ChangeEvent, Fragment } from "react";

import { Box, Button, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import ShuffleIcon from "@material-ui/icons/Cached";
import IRound from "../../../models/Round/IRound";
import IExercise from "../../../models/Exercise/IExercise";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { geExercisesListForBodyPart, getCardioExercisesList } from "../../../store/allExercises";
import { getBodyPartLabel } from "../../../store/bodyParts";
import { getRoundByIndex } from "../../../store/workoutSession";

interface IWorkoutRoundExercisesPreviewProps {
  round: IRound;
  roundIndex: number;
  handleRandomChangeExerciseForRound: (round: number, exerciseNum: number) => void;
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
      {(currentRound.exercisesList || []).map((exercise: IExercise, index) => {
        return (
          <Grid key={`${roundIndex}-${exercise.id}`} item xs={12}>
            <Grid container alignItems={"center"} spacing={1} justifyItems={"flex-start"}>
              <Grid item>
                <Typography variant={"body2"}>{`${index + 1}.`}</Typography>
              </Grid>
              <Grid item>
                {exercise.label}
              </Grid>
              <Grid item>
                {/*<ShuffleIcon fontSize="large" color="secondary" size="small" onClick={() => handleRandomChangeExerciseForRound(roundIndex, index)} />*/}
                <Box
                  minWidth={15}
                  pl={2}
                  pr={0.5}
                  component={Button}
                  color="secondary"
                  size="small"
                  startIcon={<ShuffleIcon fontSize="small" />}
                  variant={"outlined"}
                  onClick={() => handleRandomChangeExerciseForRound(roundIndex, index)}
                />
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Fragment>
  )
}