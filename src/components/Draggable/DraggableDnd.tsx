// import React, { useState } from "react";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import MovableItem from "./MovableItem";
// import DraggableListColumn from "./DraggableListColumn";
//
// import { Grid, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
// import { Height as HeightIcon } from "@material-ui/icons";
//
// import { IBodyPartsForWorkout } from "../../interfaces/IBodyPartsForWorkout";
// import { makeStyles } from "@mui/styles";
// import { find } from "lodash-es";
//
// export const COLUMN_NAMES = {
//   AVAILABLE_EXERCISES: "AVAILABLE_EXERCISES",
//   SELECTED_EXERCISES: "SELECTED_EXERCISES"
// }
// export const COLUMN_NAMES_TITLES = {
//   AVAILABLE_EXERCISES: "Choose Exercises",
//   SELECTED_EXERCISES: "Selected Exercises for Round"
// }
//
// const useStyles = makeStyles({
//   list: {
//     border: "1px solid #d9d1d1",
//     padding: "4px 16px",
//     minHeight: "150px"
//   },
//   hoverItem: {
//     cursor: "move"
//   }
// });
//
// export const filterSelectedExercises = (items: IBodyPartsForWorkout[], selected: IBodyPartsForWorkout[]): IBodyPartsForWorkout[] =>
//   items.map((item: IBodyPartsForWorkout) => {
//     if (find(selected, item)) return false;
//
//     return item;
//   }).filter(Boolean) as IBodyPartsForWorkout[];
//
// const DraggableDnd = ({ initialItems, onEnd, maxNumberItems }: {
//   initialItems: IBodyPartsForWorkout[];
//   onEnd: (items: IBodyPartsForWorkout[]) => void;
//   maxNumberItems: number;
// }) => {
//   const [items, setItems] = useState<IBodyPartsForWorkout[]>(initialItems);
//   const classes = useStyles();
//
//   const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
//     const dragItem = items[dragIndex];
//
//     if (dragItem) {
//       setItems((prevState) => {
//         const coppiedStateArray = [...prevState];
//
//         // remove item by "hoverIndex" and put "dragItem" instead
//         const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
//
//         // remove item by "dragIndex" and put "prevItem" instead
//         coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
//
//         return coppiedStateArray;
//       });
//     }
//   };
//
//   const returnItemsForColumn = (columnName: string): React.ReactElement[] => {
//     return items
//       .filter((item) => item.column === columnName)
//       .map((item, index) => (
//         <ListItem key={item.id} className={classes.hoverItem}>
//           <ListItemIcon>
//             <HeightIcon />
//           </ListItemIcon>
//           <ListItemText>
//             <MovableItem
//               label={item.label}
//               currentColumnName={item.column}
//               setItems={setItems}
//               index={index}
//               moveCardHandler={moveCardHandler}
//             />
//           </ListItemText>
//         </ListItem>
//       ));
//   };
//
//   const { AVAILABLE_EXERCISES, SELECTED_EXERCISES } = COLUMN_NAMES;
//
//   return (
//     <DndProvider backend={HTML5Backend}>
//       <Grid container spacing={3}>
//         <Grid item xs={6}>
//           <DraggableListColumn title={AVAILABLE_EXERCISES}>
//             <List className={classes.list}>
//               {/*@ts-ignore*/}
//               {returnItemsForColumn(AVAILABLE_EXERCISES)}
//             </List>
//           </DraggableListColumn>
//         </Grid>
//         <Grid item xs={6}>
//           <DraggableListColumn title={SELECTED_EXERCISES} maxNumberItems={maxNumberItems}>
//             <List className={classes.list}>
//               {/*@ts-ignore*/}
//               {returnItemsForColumn(SELECTED_EXERCISES)}
//             </List>
//           </DraggableListColumn>
//         </Grid>
//       </Grid>
//     </DndProvider>
//   );
// };
//
// export default DraggableDnd;
