import React, { ChangeEvent, useContext, useState } from "react";

import {
  Card,
  CardContent,
  Select,
  Box,
  Typography,
  Grid,
  Button,
  FormControl,
  FormLabel,
  TextField,
  MenuItem
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import bodyPartsForWorkout, {BodyParts} from "../../data/bodyPartsForWorkout";
import { IWorkoutGeneratedExercisesList, IWorkoutType } from "../../interfaces/IWorkoutType";
import { SportAppContext } from "../../SportAppContext";
import {
  createRandomExercisesForAllRounds,
  generateListOfBodyPartsForAllRounds, getRandomInt
} from "../../helpers/workoutHelpers";
import { IWorkoutSession } from "../../interfaces/IWorkoutSession";
import { IBodyPartsForWorkout } from "../../interfaces/IBodyPartsForWorkout";
import WorkoutPreview from "./WorkoutPreview";
import workoutTypes from "../../data/workoutTypesList";

const allExercisesList = Object.values(workoutTypes).reduce((workoutTypesExercises: IBodyPartsForWorkout[], acc: IBodyPartsForWorkout[]) => {
  return [ ...acc, ...workoutTypesExercises ];
}, []);
const getWorkoutExercise = (exId: string) => {
  return allExercisesList.filter((ex: IBodyPartsForWorkout) => ex.id === exId)[0];
};

export default function CreateWorkout(): React.ReactElement {
  const { workoutSettings, setWorkoutSettings, setDialogProps, setCurrentWorkoutSession } = useContext(SportAppContext);
  const navigate = useNavigate();
  const [url, setUrl] = useState<string>("");
  const updateState = (stateName: string, stateVal: number | string) => {
    setWorkoutSettings((state: IWorkoutType) => {
      let newVal = {
        ...state,
        [stateName]: stateVal
      };

      if (stateName === "rounds") {
        newVal.generated_body_parts_list = generateListOfBodyPartsForAllRounds(newVal);
        newVal.all_exercises_for_generated_list = createRandomExercisesForAllRounds(newVal.generated_body_parts_list, workoutSettings);
      }

      if (stateName === "exercises") {
        newVal.all_exercises_for_generated_list = createRandomExercisesForAllRounds(newVal.generated_body_parts_list || generateListOfBodyPartsForAllRounds(newVal), workoutSettings);
      }

      return newVal;
    });
  }

  const handleChangeTypeOfWorkoutForTheRound = (exerciseNum: number, value: string) => {
    let exercises = [...workoutSettings.generated_body_parts_list];
    exercises[exerciseNum] = value;

    setWorkoutSettings((state: IWorkoutType) => ({
      ...state,
      generated_body_parts_list: exercises
    }))
  };

  const handleChangeExerciseForRound = (round: number, exerciseNum: number, value: string) => {
    const allExercises = workoutSettings.all_exercises_for_generated_list;

    // workoutTypes find this exercise
    allExercises[round].exercises[exerciseNum] = getWorkoutExercise(value);
    setWorkoutSettings((state: IWorkoutType) => ({
      ...state,
      all_exercises_for_generated_list: allExercises
    }))
  };

  const handleRandomChangeExerciseForRound = (round: number, exerciseNum: number) => {
    const allExercises = workoutSettings.all_exercises_for_generated_list;
    const thisRoundObj = allExercises[round];
    const thisExercise = thisRoundObj.exercises[exerciseNum];
    const allExercisesOfThisType = workoutTypes[thisExercise.id.includes("cardio") ? BodyParts.cardio : thisRoundObj.bodyPartName];
    let randomExercise: IBodyPartsForWorkout = allExercisesOfThisType[getRandomInt(0, allExercisesOfThisType.length - 1)];

    handleChangeExerciseForRound(round, exerciseNum, randomExercise.id);
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
                  <Button variant="contained" color="secondary" onClick={() => {
                    const { generated_body_parts_list = [] } = workoutSettings;
                    const bodyPartsForAllRounds = generated_body_parts_list.length ? generated_body_parts_list : generateListOfBodyPartsForAllRounds(workoutSettings);
                    const newWorkoutSettings: IWorkoutGeneratedExercisesList[] = createRandomExercisesForAllRounds(bodyPartsForAllRounds, workoutSettings);

                    setWorkoutSettings((state: IWorkoutType) => ({
                      ...state,
                      generated_body_parts_list: bodyPartsForAllRounds,
                      all_exercises_for_generated_list: newWorkoutSettings
                    }));
                  }}>
                    Create a workout!
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    disabled={!workoutSettings.generated_body_parts_list.length && !workoutSettings.all_exercises_for_generated_list?.length}
                    onClick={() => {
                      setDialogProps({
                        open: true,
                        title: "Workout preview",
                        content: (
                          <Grid container spacing={2} direction="column">
                            <Grid item xs={12}>
                              <WorkoutPreview
                                handleChangeExerciseForRound={handleChangeExerciseForRound}
                                handleRandomChangeExerciseForRound={handleRandomChangeExerciseForRound}
                              />
                            </Grid>
                          </Grid>
                        ),
                        actionConfirmCb: () => {
                          setCurrentWorkoutSession((state: IWorkoutSession) => ({
                            ...state,
                            inProgress: true,
                            round: 1,
                            exercise: 1,
                            url
                          }));
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
          <Grid container spacing={2} direction={"column"}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Grid container direction="column" spacing={2}>
                    {/*<Grid item xs={12}>*/}
                    {/*  <FormControl component="fieldset">*/}
                    {/*    <FormLabel component="legend">Choose the type of workout</FormLabel>*/}
                    {/*    <ToggleButtonGroup orientation="horizontal" value={workoutSettings.value} exclusive>*/}
                    {/*      {Object.values(workoutTypes).map((workout: IWorkoutType) => (*/}
                    {/*        <ToggleButton*/}
                    {/*          onClick={(e) => updateState("value", workout.value)}*/}
                    {/*          key={workout.value}*/}
                    {/*          value={workout.value}*/}
                    {/*          aria-label="list"*/}
                    {/*        >*/}
                    {/*          {workout.label}*/}
                    {/*        </ToggleButton>*/}
                    {/*      ))}*/}
                    {/*    </ToggleButtonGroup>*/}
                    {/*  </FormControl>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel component="legend">Choose number of rounds</FormLabel>
                        <TextField
                          id="rounds"
                          value={workoutSettings.rounds}
                          type="number"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState("rounds", Number(e.target.value))}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel component="legend">Choose number of exercises in round</FormLabel>
                        <TextField
                          id="exercises"
                          type="number"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState("exercises", Number(e.target.value))}
                          value={workoutSettings.exercises}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel component="legend">Choose duration of exercises (in seconds)</FormLabel>
                        <TextField
                          id="exercise_duration"
                          value={workoutSettings.exercise_duration}
                          type="number"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState("exercise_duration", Number(e.target.value))}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel component="legend">Choose rest duration between the exercises (in seconds)</FormLabel>
                        <TextField
                          id="rest_duration"
                          type="number"
                          value={workoutSettings.rest_duration}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState("rest_duration", Number(e.target.value))}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel component="legend">Choose duration of rest between the rounds (in seconds)</FormLabel>
                        <TextField
                          id="rest_between_rounds"
                          type="number"
                          value={workoutSettings.rest_between_rounds}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState("rest_between_rounds", Number(e.target.value))}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2} direction="column">
                    {workoutSettings.generated_body_parts_list?.map((bodyPartName: string, index: number) => {
                      const allExercises = workoutSettings.all_exercises_for_generated_list || [];
                      const currentBodyPartsExercises = allExercises[index];
                      const getTitleOfBodyPart = (workoutPart: string) => bodyPartsForWorkout[workoutPart];

                      return (
                        <Grid key={`${bodyPartName}-${index}`} item xs={12}>
                          <Grid container spacing={1} alignItems={"center"} justifyContent={"center"}>
                            <Grid item xs={12} key={`${bodyPartName}-round-${index}`}>
                              <FormControl fullWidth>
                                <FormLabel component="legend" id={`workout_parts-${index}`}>R: {index + 1}</FormLabel>
                                <Select
                                  id={`workout_parts-${index}`}
                                  value={bodyPartName}
                                  onChange={(e: ChangeEvent, { props: { value } }: { props: { value: string }}) => {
                                    handleChangeTypeOfWorkoutForTheRound(index, value)
                                  }}
                                >
                                  {Object.keys(bodyPartsForWorkout).map((workoutPart: string) => (
                                    <MenuItem key={workoutPart} value={workoutPart}>{getTitleOfBodyPart(workoutPart)}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            {/*<Grid item xs={2}>*/}
                            {/*  <Box mt={2}>*/}
                            {/*    <Button*/}
                            {/*      variant="contained"*/}
                            {/*      color={"info"}*/}
                            {/*      disabled={!workoutSettings.generated_body_parts_list.length && workoutSettings.all_exercises_for_generated_list && !workoutSettings.all_exercises_for_generated_list[index]?.exercises.length}*/}
                            {/*      onClick={() => {*/}
                            {/*        const items = getItemsForDraggableList(bodyPartName, currentBodyPartsExercises, selectedExercisesForRound);*/}
                            {/*        setDialogProps({*/}
                            {/*          open: true,*/}
                            {/*          title: "Create a workout for '" + getTitleOfBodyPart(bodyPartName) + "'",*/}
                            {/*          content: (*/}
                            {/*            <DraggableDnd*/}
                            {/*              onEnd={(items: IBodyPartsForWorkout[]) => {*/}
                            {/*                setSelectedExercisesForRound(items);*/}
                            {/*              }}*/}
                            {/*              initialItems={items}*/}
                            {/*              maxNumberItems={workoutSettings.rounds}*/}
                            {/*            />*/}
                            {/*          ),*/}
                            {/*          actionConfirmCb: (items: IBodyPartsForWorkout[]) => {*/}
                            {/*            setSelectedExercisesForRound(items);*/}
                            {/*          }*/}
                            {/*        });*/}
                            {/*      // open modal*/}
                            {/*      }}*/}
                            {/*    >*/}
                            {/*      <VisibilityIcon />*/}
                            {/*    </Button>*/}
                            {/*  </Box>*/}
                            {/*</Grid>*/}
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}