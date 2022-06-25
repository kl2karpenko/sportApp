import React, { ChangeEvent, Fragment } from "react";

import { Typography, Grid, MenuItem, Box, Select, FormControl, Button } from "@mui/material";
import ShuffleIcon from "@material-ui/icons/Cached";
import {IBodyPartsForWorkout} from "../../../interfaces_deprecated/IBodyPartsForWorkout";
import IRound from "../../../models/Round/IRound";
import IExercise from "../../../models/Exercise/IExercise";
import WorkoutRoundExercises from "../../../models/WorkoutRoundExercises/WorkoutRoundExercises";
import WorkoutBuilderService from "../../../services/WorkoutBuilderService/WorkoutBuilderService";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/main";

interface IWorkoutRoundExercisesPreviewProps {
  round: IRound;
  roundIndex: number;
  workoutCreatorService: WorkoutBuilderService;
  handleRandomChangeExerciseForRound: (round: number, exerciseNum: number) => void;
  handleChangeExerciseForRound(roundIndex: number, exerciseIndex: number, value: string): void;
}

export default function HIITWorkoutPreviewRound({
  round,
  roundIndex,
  workoutCreatorService,
  handleRandomChangeExerciseForRound,
  handleChangeExerciseForRound
}: IWorkoutRoundExercisesPreviewProps
) {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const allExercises: IExercise[] = round.exercisesList;
  const workoutExercises: WorkoutRoundExercises = new WorkoutRoundExercises(workoutSession?.exercisesLength || 0, round.bodyId);

  return (

    <Fragment key={round.bodyId}>
      <Grid item xs={12}>
        <Typography variant="body1" color={"primary"}>{workoutCreatorService.getBodyPartLabel(round.bodyId)}</Typography>
      </Grid>
      {allExercises.map((exercise: IExercise, index) => {
        const isCardio = workoutExercises.isExerciseCardio(exercise);
        const allExercisesForThisBP: IExercise[] = workoutExercises.getListOfExerciseForBodyId() || [];
        const allCardioExercises: IExercise[] = workoutExercises.getCardioExercisesList() || [];
        const listToRender = isCardio ? allCardioExercises : allExercisesForThisBP;

        return (
          <Grid key={exercise.id} item xs={12}>
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
  )
}