import React from "react";

export interface IDialogProps {
  open: boolean;
  title?: string;
  content?: string | React.ReactElement;
  actionCloseLabel?: string;
  actionCloseCb?: Function;
  actionConfirmLabel?: string;
  actionConfirmCb?: Function;
}