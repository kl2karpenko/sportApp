import React, {ChangeEvent, useContext, useMemo, useState} from "react";

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

import { useNavigate } from "react-router-dom";

import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { SportAppContext } from "../../SportAppContext";
import { WorkoutSessionFields } from "../../services/WorkoutSessionService/WorkoutSessionFields";
import { TValues } from "../../interfaces_deprecated/TValues";
import { WorkoutType, WorkoutTypesList } from "../../interfaces_deprecated/WorkoutType";
import IRound from "../../models/Round/IRound";
import FormComponent from "./FormComponent";
import WorkoutPreview from "../WorkoutPreview";
import WorkoutCreatorService from "../../services/WorkoutCreatorService/WorkoutCreatorService";
import { IExercisesList } from "../../models/ExercisesList/IExercisesList";
import ExercisesList from "../../models/ExercisesList/ExercisesList";

interface ICreateWorkoutProps {
  workoutCreatorService: WorkoutCreatorService;
}

export default function CreateWorkout({ workoutCreatorService }: ICreateWorkoutProps): React.ReactElement {
  const { workoutSession, setWorkoutSession, workoutType, setWorkoutType, setDialogProps } = useContext(SportAppContext);
  const navigate = useNavigate();
  // const [url, setUrl] = useState<string>("");
  const updateState = (stateName: WorkoutSessionFields, stateVal: number): void => {
    workoutCreatorService?.updateCurrentWorkoutSession(stateName, stateVal);
    setWorkoutSession(workoutCreatorService?.getCurrentWorkoutSession());
  };

  const handleChangeExerciseForRound = (roundIndex: number, exerciseIndex: number, value: string) => {
    console.log("handleChangeExerciseForRound", roundIndex, exerciseIndex, value);
    const allExercisesData: IExercisesList = new ExercisesList();
    const exercise = allExercisesData.findExerciseById(value)!;

    console.log("new exercise", exercise);
    workoutCreatorService?.updateCurrentWorkoutSessionRoundExercise(roundIndex, exerciseIndex, exercise);
    setWorkoutSession(workoutCreatorService?.getCurrentWorkoutSession());
  };

  const handleRandomChangeExerciseForRound = (round: number, exerciseNum: number) => {
    // const allExercises = workoutSettings.all_exercises_for_generated_list;
    // const thisRoundObj = allExercises[round];
    // const thisExercise = thisRoundObj.exercises[exerciseNum];
    // const allExercisesOfThisType = workoutTypes[thisExercise.id.includes("cardio") ? BodyParts.cardio : thisRoundObj.bodyPartName];
    // let randomExercise: IBodyPartsForWorkout = allExercisesOfThisType[getRandomInt(0, allExercisesOfThisType.length - 1)];
    //
    // handleChangeExerciseForRound(round, exerciseNum, randomExercise.id);
  };

  const handleChangeBodyPartForTheRound = (roundIndex: number, value: TValues<typeof EBodyParts>) => {
    workoutCreatorService?.updateCurrentWorkoutSessionRound(roundIndex, value);
  };

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
                    onClick={() => {
                      workoutCreatorService?.generateWorkout();
                      setWorkoutSession(workoutCreatorService?.getCurrentWorkoutSession());
                    }}
                  >
                    Generate a workout!
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    disabled={!workoutSession?.rounds.length}
                    onClick={() => {
                      setDialogProps({
                        open: true,
                        title: "Workout preview",
                        content: (
                          <Grid container spacing={2} direction="column">
                            <Grid item xs={12}>
                              <WorkoutPreview
                                workoutCreatorService={workoutCreatorService}
                                handleRandomChangeExerciseForRound={handleRandomChangeExerciseForRound}
                                handleChangeExerciseForRound={handleChangeExerciseForRound}
                              />
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
                    Click Here to start!
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
                      onChange={(e: ChangeEvent, { props: { value } }: { props: { value: WorkoutType }}) => setWorkoutType(value)}
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
                              {workoutCreatorService?.getBodyParts().map((bodyPartsNameInside: TValues<typeof EBodyParts>) => (
                                <MenuItem key={bodyPartsNameInside} value={bodyPartsNameInside}>{
                                  workoutCreatorService?.getBodyPartLabel(bodyPartsNameInside)
                                }</MenuItem>
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