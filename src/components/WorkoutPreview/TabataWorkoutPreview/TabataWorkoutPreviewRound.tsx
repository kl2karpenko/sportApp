import React, { Fragment } from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import IRound from "../../../models/Round/IRound";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { getBodyPartLabel } from "../../../store/bodyParts";
import IExercise from "../../../models/Exercise/IExercise";
import ShuffleIcon from "@mui/icons-material/Cached";
import { TValues } from "../../../interfaces/TValues";
import { EBodyParts } from "../../../data/bodyPartsForWorkout";
import { getAllExercisesForBodyPart, getCardioExercisesList } from "../../../store/workoutSession";
import TabataWorkoutManagerService from "../../../services/ActiveWorkoutManagerService/TabataWorkoutManagerService";

interface ITabataWorkoutPreviewRoundProps {
  round: Partial<IRound>;
  roundIndex: number;
  includeCardio: boolean;
  handleChangeExerciseForRound(roundIndex: number, exerciseIndex: number, exerciseValue: any): void;
  handleRandomChangeExerciseForRound(roundIndex: number, exerciseIndex: number, isCardio: boolean): void;
}

export default function TabataWorkoutPreviewRound({ round, includeCardio, roundIndex, handleRandomChangeExerciseForRound, handleChangeExerciseForRound }: ITabataWorkoutPreviewRoundProps) {
  const bodyPartName: TValues<typeof EBodyParts> = round.bodyId as TValues<typeof EBodyParts>;
  const bodyPartLabel: string = useSelector((state: RootState) => getBodyPartLabel(state.bodyParts, bodyPartName));
  const exercisesInThisRound = round.exercisesList || [];
  const allExercises = useSelector((state: RootState) => getAllExercisesForBodyPart(state.workoutSession, bodyPartName)) || [];
  const cardioExercises = useSelector((state: RootState) => getCardioExercisesList(state.workoutSession)) || [];
  const tabataIndexes = TabataWorkoutManagerService.TABATA_EXERCISES_INDEXES;

  const firstExIndex = includeCardio ? tabataIndexes.firstExWithCardio : tabataIndexes.firstExWithoutCardio;
  const secondExIndex = includeCardio ? tabataIndexes.secondExWithCardio : tabataIndexes.secondExWithoutCardio;

  return (
    <Fragment key={round.bodyId}>
      <Grid item xs={12}>
        <Typography variant="h5" color="primary">{bodyPartLabel}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4} direction="column">
          <Grid item xs={12}>
            {exercisesInThisRound.map((ex: Partial<IExercise>, index: number) => (
              <Grid container spacing={2} key={`${ex.id}-${index}`}>
                <Grid item xs={1}>
                  <FormLabel component="legend" id={ex.id}>{index + 1.}</FormLabel>
                </Grid>
                <Grid item xs={9}>
                  <FormControl fullWidth size="small">
                    <Select
                      id={ex.id}
                      value={ex.id}
                      // @ts-ignore
                      onChange={(e: SelectChangeEvent, { props: { value } }: { props: { value: string }}) =>
                        handleChangeExerciseForRound(roundIndex, index, value)
                      }
                    >
                      {([firstExIndex,secondExIndex].includes(index) ? allExercises : cardioExercises).map((exercise: Partial<IExercise>) => (
                        <MenuItem key={exercise.id} value={exercise.id}>
                          {exercise?.label?.length! > 80 ? exercise.label?.substring(0,80) + "..." : exercise?.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/*<Typography  variant="body1">{index + 1}. {ex.label}</Typography>*/}
                </Grid>
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
                    onClick={() => handleRandomChangeExerciseForRound(roundIndex, index, index === 2)}
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