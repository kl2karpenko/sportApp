import React from "react";

import { Card, CardContent, Typography, Grid } from "@mui/material";

interface IExerciseDetailProps {
  exerciseName?: string;
  video?: string;
  description: string;
}

export default function ExerciseDetail({ description, video, exerciseName }: IExerciseDetailProps): React.ReactElement {
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <Typography align="center" variant="h6">{description}</Typography>
          </Grid>
          <Grid item xs={12}>
            {video ? <img src={video} alt="exerciseName" height={450} width={450} /> : ""}
            {!video ? <Typography align="center" variant="h5">{exerciseName || "REST!"}</Typography> : ""}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}