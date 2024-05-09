import { useUpdateDealer } from "@/services/users/patch";
import { errorMessageParser } from "@/utils/error";
import useCustomToast from "@/utils/toast";
import { Button, Grid, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

interface DealerVerifyProps {
  id: string;
  handleClose: () => void;
  isView?: boolean;
}

export default function DealerDocumentVerifyBody(props: DealerVerifyProps) {
  const { id, handleClose, isView } = props;

  const verifyDocument = useUpdateDealer();
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  function handleConfirm() {
    verifyDocument.mutate(
      {
        body: {
          isDocumentsVerified: "VERIFIED",
        },
        id,
      },
      {
        onSuccess: () => handleSuccess(),
        onError: (err) => handleError(err),
      },
    );
  }

  function handleSuccess() {
    toast.success("Documents set as Verified");
    queryClient.invalidateQueries({
      queryKey: [isView ? "user" : "users"],
    });
    handleClose();
  }

  function handleError(err: Error | AxiosError | unknown) {
    toast.error(errorMessageParser(err));
    handleClose();
  }

  return (
    <Grid padding={3}>
      <Typography>
        By Clicking on Confirm, You are about to verify the documents of this
        particular dealer
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
