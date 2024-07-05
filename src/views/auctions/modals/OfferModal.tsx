import { Button, DialogActions, Grid, Typography } from "@mui/material";
import LogModal from "./AuctionLogModal";
import { AmountTypography } from "@/components/ui/containers/AmountTypography";
import TextFormField from "@/components/ui/inputfields/TextFormField";
import { useForm } from "react-hook-form";
import TimePickerForm from "@/components/ui/inputfields/TimePickerForm";
import { getWinner } from "@/functions/results/get-winner";
import { numberToINR } from "@/utils/convert-to-rs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormSchema } from "@/hooks/schema/results/auction/schema";
import IconifyIcon from "@/components/ui/icon";
import { calculateTimeDifference } from "@/utils/calculate-duration";
import { useUpdateResult } from "@/services/result/auction/patch";
import { useQueryClient } from "@tanstack/react-query";
import useCustomToast from "@/utils/toast";
import { errorMessageParser } from "@/utils/error";
import { AxiosError } from "axios";

interface OfferModalProps {
  open: boolean;
  handleClose: () => void;
  data: any;
  selectedId: string;
}

interface OfferModalBodyProps {
  selectedData: any;
  handleClose: () => void;
  isView: boolean;
}

interface OfferModalBodyValues {
  amount: number;
  startTime: Date;
  endTime: Date;
}

const defaultValues = {
  amount: 0,
  startTime: new Date(),
  endTime: new Date(),
};

export const OfferModalBody = (props: OfferModalBodyProps) => {
  const { selectedData, handleClose, isView } = props;
  const { winner, leaderBoard } = selectedData || {};
  const winnerData = getWinner(leaderBoard, winner);
  const biddedAmount = winnerData?.amount;
  const schema = useFormSchema({
    minAmount: Number(biddedAmount ?? 0),
  });
  const update = useUpdateResult();
  const queryClient = useQueryClient();
  const toast = useCustomToast();
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [amount, startTime, endTime] = watch([
    "amount",
    "startTime",
    "endTime",
  ]);
  const duration = calculateTimeDifference(String(startTime), String(endTime));
  function onSubmit(values: OfferModalBodyValues) {
    update.mutate(
      {
        id: selectedData?.id,
        body: {
          status: "offer",
          startTime: String(values.startTime),
          endTime: String(values.endTime),
          userId: null,
          amount: values.amount,
        },
      },
      {
        onSuccess: () => handleSuccess(),
        onError: (err) => handleError(err),
      },
    );
  }

  function handleSuccess() {
    queryClient.invalidateQueries({
      queryKey: ["auction-result"],
    });
    handleCancel();
    toast.success(
      `Offer Sent to ${winnerData?.fullname ?? "User"} Successfully`,
    );
  }

  function handleError(err: Error | AxiosError | unknown) {
    toast.error(errorMessageParser(err));
  }

  function handleCancel() {
    reset();
    handleClose();
  }

  const finalPrice = selectedData?.finalPrice?.[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid p={3} display={"flex"} flexDirection={"column"} gap={2}>
        <Grid display={"flex"} gap={1}>
          <Typography fontSize={16} fontWeight={700}>
            Bidded Price:{" "}
          </Typography>
          <AmountTypography text={String(biddedAmount ?? "0")} />
        </Grid>
        {isView && (
          <Grid display={"flex"} gap={1}>
            <Typography fontSize={16} fontWeight={700}>
              Customer Final Price:{" "}
            </Typography>
            <AmountTypography text={String(finalPrice ?? "0")} />
          </Grid>
        )}
        {!isView && (
          <>
            <Grid container display={"flex"} alignItems={"center"} gap={1}>
              <Grid item lg={3} display={"flex"}>
                <Typography fontSize={16} fontWeight={700}>
                  Negotiated Price:{" "}
                </Typography>
              </Grid>
              <Grid item lg={6}>
                <TextFormField
                  isDisabled={isView}
                  control={control}
                  id="amount"
                  placeholder="Enter Amount"
                  error={errors?.amount}
                />
              </Grid>
            </Grid>
            <Grid container display={"flex"} gap={1}>
              <Grid item lg={3} display={"flex"}>
                <Typography fontSize={16} fontWeight={700}>
                  Start Time:{" "}
                </Typography>
              </Grid>
              <Grid item lg={6}>
                <TimePickerForm
                  control={control}
                  id="startTime"
                  error={errors.startTime as any}
                />
              </Grid>
            </Grid>
            <Grid container display={"flex"} gap={1}>
              <Grid item lg={3} display={"flex"}>
                <Typography fontSize={16} fontWeight={700}>
                  End Time:{" "}
                </Typography>
              </Grid>
              <Grid item lg={6}>
                <TimePickerForm
                  minDate={startTime}
                  control={control}
                  id="endTime"
                  error={errors?.endTime as any}
                />
              </Grid>
            </Grid>
            <Grid display={"flex"} alignItems={"start"} gap={1}>
              <IconifyIcon icon={"tabler:info-hexagon"} color="#ffbf00" />
              <Typography>
                An Offer will be submitted to {winnerData?.fullname ?? "User"}{" "}
                for {numberToINR(amount ?? "0")}. Timer will run for {duration}{" "}
                minutes{" "}
              </Typography>
            </Grid>
            <Grid>
              <DialogActions>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
                <Button onClick={handleCancel} variant="outlined">
                  Cancel
                </Button>
              </DialogActions>
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
};

export const OfferModal = (props: OfferModalProps) => {
  const { open, handleClose, data, selectedId } = props;
  const selectedCarData =
    data && data?.find((item: { id: string }) => item.id === selectedId);
  const isView = selectedCarData?.negotiation_status === "VIEW";

  return (
    <LogModal
      hideClose={!isView}
      maxWidth="sm"
      dailogueTitle={isView ? "View Offer" : "Give Offer"}
      ContentComponent={
        <OfferModalBody
          isView={isView}
          handleClose={handleClose}
          selectedData={selectedCarData}
        />
      }
      handleClose={handleClose}
      open={open}
      icon="tabler:receipt"
      iconSize={"1.5rem"}
      titleFont={20}
    />
  );
};
