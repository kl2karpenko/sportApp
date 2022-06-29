import React, { ChangeEvent, Fragment } from "react";

import { Box, Button, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import ShuffleIcon from "@material-ui/icons/Cached";
import { IBodyPartsForWorkout } from "../../../interfaces_deprecated/IBodyPartsForWorkout";
import IRound from "../../../models/Round/IRound";
import IExercise from "../../../models/Exercise/IExercise";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/main";
import { geExercisesListForBodyPart, getCardioExercisesList } from "../../../store/allExercises";
import { getBodyPartLabel } from "../../../store/bodyParts";
import { getRoundByIndex, isExerciseCardio } from "../../../store/workoutSession";

interface IWorkoutRoundExercisesPreviewProps {
  round: IRound;
  roundIndex: number;
  handleRandomChangeExerciseForRound: (round: number, exerciseNum: number) => void;
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
  const bodyPartName = round.bodyId;
  const bodyPartLabel: string = useSelector((state: RootState) => getBodyPartLabel(state.bodyParts, bodyPartName));
  const allExercisesForThisBP: IExercise[] = useSelector((state: RootState) => geExercisesListForBodyPart(state.allExercises, bodyPartName));
  const allCardioExercises: IExercise[] = useSelector((state: RootState) => getCardioExercisesList(state.allExercises));
  const exercisesInThisRound = currentRound.exercisesList;
  const exercisesInThisRoundIds = currentRound.exercisesList.map((ex: IExercise) => ex.id);

  return (
    <Fragment key={round.bodyId}>
      <Grid item xs={12}>
        <Typography variant="body1" color={"primary"}>{bodyPartLabel}</Typography>
      </Grid>
      {exercisesInThisRound.map((exercise: IExercise, index) => {
        const isCardio = isExerciseCardio(exercise);
        const listToRender = isCardio ? allCardioExercises : allExercisesForThisBP;

        return (
          <Grid key={`${roundIndex}-${exercise.id}`} item xs={12}>
            <Grid container alignItems={"center"} spacing={1} justifyItems={"flex-start"}>
              <Grid item>
                <Typography variant={"body2"}>{`${index + 1}.`}</Typography>
              </Grid>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 700 }} size="small">
                  <Select
                    id={`workout_parts-${index}`}
                    value={exercise.id}
                    onChange={(e: ChangeEvent, { props: { value } }: { props: { value: string }}) => {
                      handleChangeExerciseForRound(roundIndex, index, value)
                    }}
                  >
                    {listToRender.map((bodyPartWorkout: IBodyPartsForWorkout) => (
                      <MenuItem
                        key={bodyPartWorkout.id}
                        disabled={exercisesInThisRoundIds.includes(bodyPartWorkout.id)}
                        value={bodyPartWorkout.id}>
                        {bodyPartWorkout.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Box
                  minWidth={30}
                  pl={2}
                  pr={0.5}
                  component={Button}
                  color="secondary"
                  size="large"
                  startIcon={<ShuffleIcon fontSize="large" />}
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