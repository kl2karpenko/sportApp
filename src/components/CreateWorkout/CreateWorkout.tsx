import React, { ChangeEvent, useContext, useMemo } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { useNavigate } from "react-router-dom";

import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { SportAppContext } from "../../SportAppContext";
import { WorkoutSessionFields } from "../../interfaces/WorkoutSessionFields";
import { TValues } from "../../interfaces/TValues";
import { WorkoutType, WorkoutTypesList } from "../../interfaces/WorkoutType";
import IRound from "../../models/Round/IRound";
import FormComponent from "./FormComponent";
import WorkoutPreview from "../WorkoutPreview";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/main";

import {
  changeWorkoutType,
  generateWorkoutSession,
  updateWorkoutRoundByIndex,
  updateWorkoutSessionValue,
  regenerateWorkoutSessionRounds
} from "../../store/workoutSession";
import { RoundFields } from "../../models/Round/RoundFields";
import { getBodyPartsLabels, getBodyPartsList } from "../../store/bodyParts";

export default function CreateWorkout(): React.ReactElement {
  const dispatch = useDispatch();
  const { setDialogProps } = useContext(SportAppContext);
  const workoutSession = useSelector((state: RootState) => state.workoutSession);
  const bodyPartsList = useSelector((state: RootState) => getBodyPartsList(state.bodyParts));
  const bodyPartsLabels = useSelector((state: RootState) => getBodyPartsLabels(state.bodyParts));
  const workoutType = workoutSession.workoutType;
  const navigate = useNavigate();
  const updateState = (stateName: WorkoutSessionFields, stateVal: number) =>
    dispatch(updateWorkoutSessionValue({ field: stateName, value: stateVal }));
  const handleChangeBodyPartForTheRound = (roundIndex: number, fieldValue: TValues<typeof EBodyParts>) =>
    dispatch(updateWorkoutRoundByIndex({ roundIndex, fieldName: RoundFields.bodyId, fieldValue }));

  return (
    <Box p={10}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom component="div">
                Hello, let us create your perfect workout!!!
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={1}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ShuffleIcon />}
                    onClick={() => dispatch(generateWorkoutSession(workoutSession))}
                  >
                    Create!
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    disabled={!workoutSession?.rounds.length}
                    startIcon={<ShuffleIcon />}
                    onClick={() => dispatch(regenerateWorkoutSessionRounds(workoutSession))}
                  >
                    Regenerate
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="info"
                    startIcon={<VisibilityIcon />}
                    disabled={!workoutSession?.rounds?.length}
                    onClick={() => {
                      setDialogProps({
                        open: true,
                        title: "Workout preview",
                        content: (
                          <Grid container spacing={2} direction="column">
                            <Grid item xs={12}>
                              <WorkoutPreview />
                            </Grid>
                          </Grid>
                        ),
                        actionConfirmCb: () => {
                          // setCurrentWorkoutSession((state: IWorkoutSession) => ({
                          //   ...state,
                          //   inProgress: true,
                          //   round: 1,
                          //   exercise: 1,
                          //   url
                          // }));
                          navigate("workout");
                        }
                      });
                    }}
                  >
                    Preview And Start
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box mt={2}></Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel component="legend" id="workoutType">Workout Type</FormLabel>
                    <Select
                      id="workoutType"
                      value={workoutType}
                      onChange={(e: ChangeEvent, { props: { value } }: { props: { value: WorkoutType }}) => dispatch(changeWorkoutType(value))}
                    >
                      {/*  // TODO: change the place where I take this */}
                      {WorkoutTypesList.map((workoutTypeInside: WorkoutType) => (
                        <MenuItem key={workoutTypeInside} value={workoutTypeInside}>{
                          workoutTypeInside
                        }</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <FormComponent updateState={updateState} />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2} direction="column">
                {workoutSession?.rounds?.map((round: IRound, index: number) => {
                  const { bodyId } = round;
                  const bodyPartLabel = bodyPartsLabels[bodyId];
                  // const allExercises = workoutSettings.all_exercises_for_generated_list || [];

                  return (
                    <Grid key={`${bodyId}-${index}`} item xs={12}>
                      <Grid container spacing={1} alignItems={"center"} justifyContent={"center"}>
                        <Grid item xs={12} key={`${bodyId}-round-${index}`}>
                          <FormControl fullWidth>
                            <FormLabel component="legend" id={`workout_parts-${index}`}>R: {index + 1}</FormLabel>
                            <Select
                              id={`workout_parts-${index}`}
                              defaultValue={bodyId}
                              onChange={(e: ChangeEvent, { props: { value } }: { props: { value: TValues<typeof EBodyParts> }}) => {
                                handleChangeBodyPartForTheRound(index, value);
                              }}
                            >
                              {bodyPartsList.map((bodyPartsNameInside: TValues<typeof EBodyParts>) => (
                                <MenuItem key={bodyPartsNameInside} value={bodyPartsNameInside}>{bodyPartsLabels[bodyPartsNameInside]}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}