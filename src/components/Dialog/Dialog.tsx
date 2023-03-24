import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { useContext } from "react";
import { SportAppContext } from "../SportAppContext";

export default function ModalDialog() {
  const { dialogProps, setDialogProps } = useContext(SportAppContext);
  const { open, title, content, actionCloseCb, actionCloseLabel, actionConfirmCb, actionConfirmLabel } = dialogProps;

  const handleDialogClose = () => {
    setDialogProps({
      open: false
    });

    if (actionCloseCb) {
      actionCloseCb();
    }
  };
  const handleDialogConfirm = () => {
    setDialogProps({
      open: false
    });

    if (actionConfirmCb) {
      actionConfirmCb();
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      open={open}
      onClose={handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="dialog-title">{title || "Dialog Title Default"}</DialogTitle>
      <DialogContent>
        {typeof content === "string" ? <DialogContentText id="dialog-description">{content}</DialogContentText> : content}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="secondary" variant="outlined">
          {actionCloseLabel || "Close"}
        </Button>
        <Button onClick={handleDialogConfirm} color="primary" variant="outlined">
          {actionConfirmLabel || "Ok"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}