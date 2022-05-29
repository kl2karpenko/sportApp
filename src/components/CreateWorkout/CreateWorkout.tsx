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

import {useNavigate} from "react-router-dom";

import {BodyParts} from "../../data/bodyPartsForWorkout";
import {SportAppContext} from "../../SportAppContext";
import {WorkoutSessionFields} from "../../services/WorkoutSessionService/WorkoutSessionFields";
import {TValues} from "../../interfaces_deprecated/TValues";
import {WorkoutType, WorkoutTypesList} from "../../interfaces_deprecated/WorkoutType";
import IRound from "../../models/Round/IRound";
import FormComponent from "./FormComponent";


// const handleChangeTypeOfWorkoutForTheRound = (exerciseNum: number, value: string) => {
//   let exercises = [...workoutSettings.generated_body_parts_list];
//   exercises[exerciseNum] = value;
//
//   setWorkoutSettings((state: IWorkoutType) => ({
//     ...state,
//     generated_body_parts_list: exercises
//   }))
// };
//
// const handleChangeExerciseForRound = (round: number, exerciseNum: number, value: string) => {
//   const allExercises = workoutSettings.all_exercises_for_generated_list;
//
//   // workoutTypes find this exercise
//   allExercises[round].exercises[exerciseNum] = getWorkoutExercise(value);
//   setWorkoutSettings((state: IWorkoutType) => ({
//     ...state,
//     all_exercises_for_generated_list: allExercises
//   }))
// };

// const handleRandomChangeExerciseForRound = (round: number, exerciseNum: number) => {
//   const allExercises = workoutSettings.all_exercises_for_generated_list;
//   const thisRoundObj = allExercises[round];
//   const thisExercise = thisRoundObj.exercises[exerciseNum];
//   const allExercisesOfThisType = workoutTypes[thisExercise.id.includes("cardio") ? BodyParts.cardio : thisRoundObj.bodyPartName];
//   let randomExercise: IBodyPartsForWorkout = allExercisesOfThisType[getRandomInt(0, allExercisesOfThisType.length - 1)];
//
//   handleChangeExerciseForRound(round, exerciseNum, randomExercise.id);
// };


export default function CreateWorkout(): React.ReactElement {
  const { workoutSettings, workoutSession, setWorkoutSession, workoutType, setWorkoutType, setDialogProps } = useContext(SportAppContext);
  const navigate = useNavigate();
  const [url, setUrl] = useState<string>("");
  const updateState = (stateName: WorkoutSessionFields, stateVal: number): void => {
    workoutSettings?.updateWorkoutSessionValue(stateName, stateVal);
    setWorkoutSession(workoutSettings?.getWorkoutSessionValues()!);
  };
  console.log(workoutSession, " workoutSession");

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
                    workoutSettings?.generateWorkoutSession();
                    setWorkoutSession(workoutSettings?.getWorkoutSessionValues()!);
                  }}>
                    Create a workout!
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    // disabled={!workoutSettings.generated_body_parts_list.length && !workoutSettings.all_exercises_for_generated_list?.length}
                    onClick={() => {
                      // setDialogProps({
                      //   open: true,
                      //   title: "Workout preview",
                      //   content: (
                      //     <Grid container spacing={2} direction="column">
                      //       <Grid item xs={12}>
                      //         {/*<WorkoutPreview*/}
                      //         {/*  handleChangeExerciseForRound={handleChangeExerciseForRound}*/}
                      //         {/*  handleRandomChangeExerciseForRound={handleRandomChangeExerciseForRound}*/}
                      //         {/*/>*/}
                      //       </Grid>
                      //     </Grid>
                      //   ),
                      //   actionConfirmCb: () => {
                      //     setCurrentWorkoutSession((state: IWorkoutSession) => ({
                      //       ...state,
                      //       inProgress: true,
                      //       round: 1,
                      //       exercise: 1,
                      //       url
                      //     }));
                      //     navigate("workout");
                      //   }
                      // });
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
                              // onChange={(e: ChangeEvent, { props: { value } }: { props: { value: string }}) => {
                              //   handleChangeTypeOfWorkoutForTheRound(index, value)
                              // }}
                            >
                              {/* TODO: change the part where we take bodyPartsList */}
                              {workoutSettings?.workoutBuilder.bodyPartsList.map((bodyPartsNameInside: TValues<typeof BodyParts>) => (
                                <MenuItem key={bodyPartsNameInside} value={bodyPartsNameInside}>{
                                  workoutSettings?.workoutBuilder.getLabelForBodyList(bodyPartsNameInside)
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