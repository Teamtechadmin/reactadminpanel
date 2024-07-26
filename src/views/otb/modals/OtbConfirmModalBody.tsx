import { Button, Grid, Typography } from "@mui/material";
import React from "react";

interface Props {
  handleSubmit: () => void;
  handleClose: () => void;
  isDisabled: boolean;
}

export default function OtbConfirmModalBody(props: Props) {
  const { handleClose, handleSubmit, isDisabled } = props;
  return (
    <Grid p={3}>
      <Typography>
        The car will be moved to UNSOLD. Are you sure to continue?
      </Typography>
      <Grid display={"flex"} justifyContent={"end"} gap={1} mt={3}>
        <Button
          disabled={isDisabled}
          onClick={handleSubmit}
          variant="contained"
        >
          CONFIRM
        </Button>
        <Button onClick={handleClose} variant="contained" color="error">
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
}
