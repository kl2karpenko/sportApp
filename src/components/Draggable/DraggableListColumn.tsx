// import {useDrop} from "react-dnd";
// import React from "react";
// import { makeStyles } from "@mui/styles";
// import { Typography, Box, Theme, Grid } from "@mui/material";
// import { COLUMN_NAMES_TITLES, COLUMN_NAMES } from "./DraggableDnd";
//
// interface IDraggableListColumnProps {
//   children: React.ReactElement;
//   title: string;
//   maxNumberItems?: number;
// }
//
// const useStyles = makeStyles((theme: Theme) => ({
//   listToDrop: {
//     background: theme.palette.primary.main
//   }
// }));
//
// const DraggableListColumn = ({ children, title, maxNumberItems }: IDraggableListColumnProps) => {
//   const classes = useStyles();
//   const [{ isOver, canDrop }, drop] = useDrop({
//     accept: "ALL",
//     drop: () => ({ name: title }),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//       canDrop: monitor.canDrop()
//     }),
//     // Override monitor.canDrop() function
//     canDrop: (item: { currentColumnName: string }) => {
//       const { AVAILABLE_EXERCISES, SELECTED_EXERCISES } = COLUMN_NAMES;
//       const { currentColumnName } = item;
//
//       console.log(children.props.children.length);
//
//       if (currentColumnName === SELECTED_EXERCISES) {
//         return maxNumberItems && children.props.children.length < maxNumberItems;
//       }
//
//       return true;
//     }
//   });
//
//   const getBackgroundColor = () => {
//     if (isOver) {
//       if (canDrop) {
//         return "rgb(188,251,255)";
//       } else if (!canDrop) {
//         return "rgb(255,188,188)";
//       }
//     } else {
//       return "";
//     }
//   };
//
//   return (
//     <Grid container ref={drop} spacing={3} direction={"column"}>
//       <Grid item xs={12}>
//         <Typography variant={"h5"}>{COLUMN_NAMES_TITLES[title]}</Typography>
//       </Grid>
//       <Grid item xs={12}>
//         <Box className={isOver ? classes.listToDrop : ""}>
//           {children}
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };
//
// export default DraggableListColumn;