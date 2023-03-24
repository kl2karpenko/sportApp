import React from "react";

import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Cached";
import useStyles from "./styles";
import { IExerciseDetailProps } from "./ExerciseDetail";

interface ITabataExerciseDetailProps extends IExerciseDetailProps {
  handleRandomChangeExerciseForRound: (roundIndex: number, exerciseIndex: number, isCardio: boolean) => { payload: any; type: string; };
}

export default function TabataExerciseDetail({ variant, handleRandomChangeExerciseForRound, description, exerciseName, exerciseImg, roundIndex, exerciseIndex, isCardio }: ITabataExerciseDetailProps): React.ReactElement {
  const { classes } = useStyles();
  const isSmall = variant === "cardSmall";

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <Typography align="center" variant={!isSmall ? "h4" : "h6"} className={!isSmall ? classes.textSecondary : classes.textPrimary}>{description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant={!isSmall ? "h3" : "body1"}>{exerciseName || " - "}</Typography>
          </Grid>
          {exerciseImg && (<Grid item xs={12}>
            <img className={classes.img} src={exerciseImg} alt={exerciseName} />
          </Grid>)}
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