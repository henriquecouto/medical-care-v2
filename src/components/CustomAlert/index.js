import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default function CustomAlert({ open, handle, severity, message }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handle}>
      <Alert
        onClose={handle}
        severity={severity}
        elevation={6}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
