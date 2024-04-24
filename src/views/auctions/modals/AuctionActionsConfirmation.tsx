import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { ModalAction } from "./AuctionLogBody";

interface Props {
  fullname: string;
  type: ModalAction;
  handleConfirm: () => void;
  handleClose: () => void;
}

export default function ActionsConfirmation(props: Props) {
  const { fullname, type, handleConfirm, handleClose } = props;
  const isChoose = type === "Choose";
  const isUnsold = type === "Unsold";
  const name = fullname ?? "User";
  return (
    <Grid padding={3}>
      <Typography>
        {isChoose
          ? `${name} will be choosen as new winner. Are you sure you want to continue?`
          : isUnsold
            ? `The car will be moved to UNSOLD if no bidders are interested. Are you sure to continue?`
            : `${name} will be removed from negotiation. Are you sure you want to continue?`}
      </Typography>
      <Grid display={"flex"} gap={1} mt={2} justifyContent={"end"}>
        <Button variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button color="error" variant="contained" onClick={handleClose}>
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
}
