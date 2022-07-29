import React, { Dispatch } from "react";

import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { generateRandomWorkoutExerciseInRound } from "../../../store/workoutSession";
import { useDispatch, useSelector } from "react-redux";
import ShuffleIcon from "@material-ui/icons/Cached";
import { RootState } from "../../../store/main";

interface IExerciseDetailProps {
  exerciseName?: string;
  description: string;
  roundIndex: number;
  exerciseIndex: number;
  isCardio: boolean;
  handleRandomChangeExerciseForRound: (roundIndex: number, exerciseIndex: number, isCardio: boolean) => { payload: any; type: string; };
}

export default function TabataExerciseDetail({ handleRandomChangeExerciseForRound, description, exerciseName, roundIndex, exerciseIndex, isCardio }: IExerciseDetailProps): React.ReactElement {
  const activeWorkout = useSelector((state: RootState) => state.activeWorkout);
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const { isResting, activeRoundIndex, activeExerciseIndex } = activeWorkout;
  const { rounds: allRounds, includeCardio } = workoutSession;
  const currentRoundExercises = allRounds[activeRoundIndex].exercisesList || [];
  const cardioExercise = includeCardio ? currentRoundExercises[currentRoundExercises.length - 1] : {};
  const isActive = activeExerciseIndex === exerciseIndex;

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <Typography align="center" variant={"h4"}>{description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant={"h3"}>{isResting && isActive ? cardioExercise?.label : (exerciseName || "COMPLETED WORKOUT!")}</Typography>
          </Grid>
          <Grid item xs={12} justifySelf={"flex-end"}>
            <Box
              minWidth={15}
              pl={2}
              pr={0.5}
              component={Button}
              color="secondary"
              size="small"
              startIcon={<ShuffleIcon fontSize="small" />}
              variant={"outlined"}
              onClick={() => handleRandomChangeExerciseForRound(roundIndex, exerciseIndex, isCardio)}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}