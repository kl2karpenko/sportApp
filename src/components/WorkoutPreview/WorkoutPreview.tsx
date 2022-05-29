import React, {ChangeEvent, Fragment, useContext} from "react";
import { IWorkoutGeneratedExercisesList, IWorkoutDeprecatedObj } from "../../interfaces_deprecated/IWorkoutDeprecatedObj";

import { Typography, Grid, MenuItem, Box, Select, FormControl, Button } from "@mui/material";
import ShuffleIcon from "@material-ui/icons/Cached";
import bodyPartsForWorkout, {BodyParts} from "../../data/bodyPartsForWorkout";
import {IBodyPartsForWorkout} from "../../interfaces_deprecated/IBodyPartsForWorkout";
import workoutTypes from "../../data/workoutTypesList";
import {SportAppContext} from "../../SportAppContext";

interface IWorkoutPreviewProps {
  handleChangeExerciseForRound: (round: number, exerciseNum: number, value: string) => void;
  handleRandomChangeExerciseForRound: (round: number, exerciseNum: number) => void;
}

export default function WorkoutPreview({ handleChangeExerciseForRound, handleRandomChangeExerciseForRound }: IWorkoutPreviewProps) {
  const { workoutSettings } = useContext(SportAppContext);
  const allCardio: IBodyPartsForWorkout[] = workoutTypes[BodyParts.cardio] || [];

  return (
    <Grid container direction="column">
      {workoutSettings.all_exercises_for_generated_list?.map((allExercises: IWorkoutGeneratedExercisesList, roundIndex: number) => (
        <Fragment key={allExercises.bodyPartName}>
          <Grid item xs={12}>
            <Typography variant="body1" color={"primary"}>{bodyPartsForWorkout[allExercises.bodyPartName as any]}</Typography>
          </Grid>
          {allExercises.exercises.map((exercise: IBodyPartsForWorkout, index: number) => {
            const allExercisesForThisBP: IBodyPartsForWorkout[] = workoutTypes[allExercises.bodyPartName] || [];
            const isCardio = exercise.id.includes("cardio");
            return (
              <Grid key={exercise.id + index} item xs={12}>
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
                        {(isCardio ? allCardio : allExercisesForThisBP).map((bodyPartWorkout: IBodyPartsForWorkout) => (
                          <MenuItem key={bodyPartWorkout.id} value={bodyPartWorkout.id}>{bodyPartWorkout.label}</MenuItem>
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
      ))}
    </Grid>
  )
}