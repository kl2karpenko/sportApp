import React, { Dispatch, SetStateAction } from "react";

import { IDialogProps } from "./interfaces_deprecated/IDialogProps";

export interface ISportAppContext {
  dialogProps: IDialogProps;
  setDialogProps: Dispatch<SetStateAction<IDialogProps>>;
}

export const SportAppContext = React.createContext({} as ISportAppContext);