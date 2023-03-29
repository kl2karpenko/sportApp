import React from "react";
import { generateRandomWorkoutExerciseInRound } from "../../../store/workoutSession";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Cached";

export type TExerciseDetailVariant = "cardSmall" | "cardBig"
export interface IExerciseDetailProps {
  variant?: TExerciseDetailVariant;
  img?: string;
  label?: string;
  title: string;
  description?: string;
  roundIndex: number;
  exerciseIndex: number;
  isCardio: boolean;
}

export default function ExerciseDetail({ variant, description, title, label, img, roundIndex, exerciseIndex, isCardio }: IExerciseDetailProps): React.ReactElement {
  const dispatch = useDispatch();
  const handleRandomChangeExerciseForRound = (roundIndex: number, exerciseIndex: number, isCardio: boolean) => {
    dispatch(generateRandomWorkoutExerciseInRound({ roundIndex, exerciseIndex, isCardio }))
  };
  const { classes } = useStyles();
  const isSmall = variant === "cardSmall";

  return (
    <Card variant="elevation" elevation={2} className={classes.exerciseCard}>
      <CardContent>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <Typography align="center" variant={!isSmall ? "h4" : "h6"} className={!isSmall ? classes.textSecondary : classes.textPrimary}>{title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant={!isSmall ? "h3" : "body1"}>{label || " - "}</Typography>
          </Grid>
          {img && (<Grid item xs={12} className={classes.imgWrapper}>
            <img className={classes.img} src={img} alt={label} />
          </Grid>)}
          {description && (<Grid item xs={12}>
            <Box className={classes.description}>
              <Typography className={classes.descriptionText}  variant="body1">{description}</Typography>
            </Box>
          </Grid>)}
          <Grid item xs={12} justifySelf={"flex-end"}>
            <Box
              className={classes.shuffle}
              component={Button}
              size="large"
              startIcon={<ShuffleIcon fontSize="small" color={"secondary"} />}
              variant={"outlined"}
              onClick={() => handleRandomChangeExerciseForRound(roundIndex, exerciseIndex, isCardio)}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}