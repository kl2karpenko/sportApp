import React, { useContext } from "react";

import {Grid, Typography, Button, Box} from "@mui/material";
import IRound from "../../../models/Round/IRound";
import WorkoutBuilderService from "../../../services/WorkoutBuilderService/WorkoutBuilderService";
import {IExercisesList} from "../../../models/ExercisesList/IExercisesList";
import ExercisesList from "../../../models/ExercisesList/ExercisesList";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/main";
import ShuffleIcon from "@material-ui/icons/Cached";

interface IWorkoutPreviewProps {
  workoutBuilderService: WorkoutBuilderService;
}

export default function HIITWorkoutPreview({ workoutBuilderService }: IWorkoutPreviewProps) {
  const workoutSession = useSelector((state: RootState) => state.workoutSession);

  const handleChangeBodyPartForRound = (roundIndex: number) => {
    console.log("handleChangeExerciseForRound", roundIndex);
    // const allExercisesData: IExercisesList = new ExercisesList();
    // const exercise = allExercisesData.findExerciseById(value)!;
    //
    // console.log("new exercise", exercise);
    // workoutBuilderService?.updateCurrentWorkoutSessionRoundExercise(roundIndex, exerciseIndex, exercise);
    // // setWorkoutSession(workoutBuilderService?.getCurrentWorkoutSession());
  };

  // THIS SHOULD DIFFER FROM TABATA PREVIEW
  return (
    <Grid container direction="column">
      {
        workoutSession?.rounds?.map((round: IRound, roundIndex: number) => (
          <Grid container key={`bodyPart-${roundIndex}`}>
            <Grid item xs={6}>
              <Typography variant={"body1"}>{round.bodyId}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Box
                minWidth={30}
                pl={2}
                pr={0.5}
                component={Button}
                color="secondary"
                size="large"
                startIcon={<ShuffleIcon fontSize="large" />}
                variant={"outlined"}
                onClick={() => handleChangeBodyPartForRound(roundIndex)}
              />
            </Grid>
          </Grid>
        ))
      }
    </Grid>
  )
}