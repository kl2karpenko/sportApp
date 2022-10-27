import React, { Dispatch } from "react";

import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
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
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <Typography align="center" variant={"h4"}>{description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant={"h3"}>{exerciseName || "COMPLETED WORKOUT!"}</Typography>
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