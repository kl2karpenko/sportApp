import React, { Fragment } from "react";

import {
  Box,
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Select,
  SelectChangeEvent, MenuItem, FormControl
} from "@mui/material";
import ShuffleIcon from "@material-ui/icons/Cached";
import IRound from "../../../models/Round/IRound";
import IExercise from "../../../models/Exercise/IExercise";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { getBodyPartLabel } from "../../../store/bodyParts";
import { getAllExercisesForBodyPart, getCardioExercisesList, getRoundByIndex } from "../../../store/workoutSession";
import { TValues } from "../../../interfaces/TValues";
import { EBodyParts } from "../../../data/bodyPartsForWorkout";

interface IWorkoutRoundExercisesPreviewProps {
  round: Partial<IRound>;
  roundIndex: number;
  handleRandomChangeExerciseForRound: (round: number, exerciseNum: number, isCardio: boolean) => void;
  handleChangeExerciseForRound(roundIndex: number, exerciseIndex: number, value: string): void;
}

export default function HIITWorkoutPreviewRound({
  round,
  roundIndex,
  handleRandomChangeExerciseForRound,
  handleChangeExerciseForRound
}: IWorkoutRoundExercisesPreviewProps
) {
  const currentRound = useSelector((state: RootState) => getRoundByIndex(state.workoutSession, roundIndex));
  const bodyPartName: TValues<typeof EBodyParts> = round.bodyId as TValues<typeof EBodyParts>;
  const bodyPartLabel: string = useSelector((state: RootState) => getBodyPartLabel(state.bodyParts, bodyPartName));
  const exercisesInThisRound = round.exercisesList || [];
  const allExercises = useSelector((state: RootState) => getAllExercisesForBodyPart(state.workoutSession, bodyPartName)) || [];
  const cardioExercises = useSelector((state: RootState) => getCardioExercisesList(state.workoutSession)) || [];

  return (
    <Fragment key={round.bodyId}>
      <Grid item xs={12}>
        <Typography variant="body1" color={"primary"}>{bodyPartLabel}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {(currentRound.exercisesList || []).map((exercise: Partial<IExercise>, index) => {
            const exId = exercise.id || "";
            const isCardio = exId.includes("cardio");
            return (
              <Grid item xs={12} key={`${roundIndex}-${index}-${exId}`}>
                <Grid container>
                  <Grid item xs={11}><FormControl size="small">
                    <Select
                      style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "pre" }}
                      id={exercise.id}
                      value={exercise.id}
                      // @ts-ignore
                      onChange={(e: SelectChangeEvent, { props: { value } }: { props: { value: string }}) =>
                        handleChangeExerciseForRound(roundIndex, index, value)
                      }
                    >
                      {(!isCardio ? allExercises : cardioExercises).map((exercise: Partial<IExercise>) => (
                        <MenuItem key={exercise.id} value={exercise.id}>
                          {exercise?.label?.length! > 80 ? exercise.label?.substring(0,80) + "..." : exercise?.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  </Grid>
                  <Grid item xs={1}>
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
                  </Grid>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Fragment>
  )
}