// import React, { useRef } from "react";
// import { useDrag, useDrop } from "react-dnd";
// import { COLUMN_NAMES } from "./DraggableDnd";
// import { IBodyPartsForWorkout } from "../../interfaces/IBodyPartsForWorkout";
// import { Box, LinearProgress, Theme, Typography } from "@mui/material";
// import {makeStyles} from "@mui/styles";
//
// interface IMovableItemProps {
//   label: string;
//   index: number;
//   currentColumnName?: string;
//   moveCardHandler: Function;
//   setItems: Function;
// }
//
//
// const useStyles = makeStyles({
//   item: {
//     border: "1px solid #d9d1d1",
//     padding: "4px 16px",
//     minHeight: "30px",
//     width: 200
//   }
// });
//
// const MovableItem = ({
//   label,
//   index,
//   currentColumnName,
//   moveCardHandler,
//   setItems
// }: IMovableItemProps) => {
//   const classes = useStyles();
//   const changeItemColumn = (currentItem: Partial<IBodyPartsForWorkout>, columnName: string) => {
//     setItems((prevState: IBodyPartsForWorkout[]) => {
//       return prevState.map((e: any) => {
//         return {
//           ...e,
//           column: e.label === currentItem.label ? columnName : e.column
//         };
//       });
//     });
//   };
//
//   const ref = useRef(null);
//
//   const [, drop] = useDrop({
//     accept: "ALL",
//     hover(item: any, monitor) {
//       if (!ref.current) {
//         return;
//       }
//       const dragIndex = item.index;
//       const hoverIndex = index;
//       // Don't replace items with themselves
//       if (dragIndex === hoverIndex) {
//         return;
//       }
//       // Determine rectangle on screen
//       const hoverBoundingRect = (ref.current as any).getBoundingClientRect();
//       // Get vertical middle
//       const hoverMiddleY =
//         (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//       // Determine mouse position
//       const clientOffset = monitor.getClientOffset();
//       // Get pixels to the top
//       const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;
//       // Only perform the move when the mouse has crossed half of the items height
//       // When dragging downwards, only move when the cursor is below 50%
//       // When dragging upwards, only move when the cursor is above 50%
//       // Dragging downwards
//       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//         return;
//       }
//       // Dragging upwards
//       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//         return;
//       }
//       // Time to actually perform the action
//       moveCardHandler(dragIndex, hoverIndex);
//       // Note: we're mutating the monitor item here!
//       // Generally it's better to avoid mutations,
//       // but it's good here for the sake of performance
//       // to avoid expensive index searches.
//       item.index = hoverIndex;
//     }
//   });
//
//   const [{ isDragging }, drag] = useDrag({
//     type: "ALL",
//     item: { index, label, currentColumnName, type: "ALL" },
//     end: (item, monitor) => {
//       const dropResult = monitor.getDropResult();
//
//       if (dropResult) {
//         const { name } = dropResult as { dropEffect: string; name: string };
//         const { AVAILABLE_EXERCISES, SELECTED_EXERCISES } = COLUMN_NAMES;
//         switch (name) {
//         case AVAILABLE_EXERCISES:
//           changeItemColumn(item, AVAILABLE_EXERCISES);
//           break;
//         case SELECTED_EXERCISES:
//           changeItemColumn(item, SELECTED_EXERCISES);
//           break;
//         default:
//           break;
//         }
//       }
//     },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging()
//     })
//   });
//
//   const opacity = isDragging ? 0.1 : 1;
//
//   drag(drop(ref));
//
//   return (
//     <Box ref={ref} style={{ opacity }}>
//       {label}
//     </Box>
//   );
// };
//
// export default MovableItem;