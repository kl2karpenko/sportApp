import React, { Dispatch, SetStateAction } from "react";

import { IDialogProps } from "../interfaces/IDialogProps";
import { PaletteMode } from "@mui/material";

export interface ISportAppContext {
  dialogProps: IDialogProps;
  setDialogProps: Dispatch<SetStateAction<IDialogProps>>;
  setMode: Dispatch<SetStateAction<PaletteMode>>;
}

export const SportAppContext = React.createContext({} as ISportAppContext);