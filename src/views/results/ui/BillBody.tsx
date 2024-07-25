import { getWinner } from "@/functions/results/get-winner";
import { usePrefillBill } from "@/hooks/utils/bill";
import { useUpdateResult } from "@/services/result/auction/patch";
import { AuctionData } from "@/services/result/auction/types";
import { BillForm, OtbLeaderBoardRow } from "@/types/results/type";
import { errorMessageParser } from "@/utils/error";
import useCustomToast from "@/utils/toast";
import { Button, DialogActions, Grid } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { BillFields } from "./BillFields";
import { BillSummary } from "./BillSummary";
import { calculateBill } from "@/functions/results/calculate-bill";

interface BillBodyProps<T> {
  data: T;
  handleClose: () => void;
  isView: boolean;
  carID: string;
  isOtb?: boolean;
}

const defaultValues = {
  totalAmount: 0,
  serviceRate: 0.5,
  gstRate: 18,
  parkingCharge: 0,
  transportationCharge: 0,
  discount: 0,
};

export function BillBody<T extends AuctionData | OtbLeaderBoardRow>(
  props: BillBodyProps<T>,
) {
  const { data, handleClose, isView, isOtb, carID } = props;
  const { control, setValue, watch, handleSubmit } = useForm<BillForm>({
    defaultValues,
  });

  function getWinnerData(): any {
    if (isOtb) {
      return { amount: (data as OtbLeaderBoardRow)?.amount };
    } else {
      return getWinner(
        (data as AuctionData)?.leaderBoard ?? [],
        (data as AuctionData)?.winner ?? "",
      );
    }
  }

  const winnerData = getWinnerData();
  const values = watch();

  const updateResult = useUpdateResult();
  const toast = useCustomToast();
  const queryClient = useQueryClient();
  const prefillData = { ...winnerData, finalPrice: data?.finalPrice };

  usePrefillBill({
    setValue,
    data: prefillData,
  });

  const calc = calculateBill(values);

  function onSubmit() {
    updateResult.mutate(
      {
        id: carID ?? "",
        body: {
          status: isOtb ? "otb_bill" : "bill",
          gst: Number(calc?.gstFee ?? 0),
          serviceFees: Number(calc?.serviceFee ?? 0),
          totalAmount: Number(calc?.totalDue ?? 0),
          ...(isOtb && { userId: data?.userId }),
          ...(isOtb && { amount: values?.totalAmount ?? 0 }),
        },
      },
      {
        onSuccess: () => {
          toast.success("Bill Send Successfully");
          queryClient.invalidateQueries({
            queryKey: ["auction-result"],
          });
          handleClose();
        },
        onError: (err) => toast.error(errorMessageParser(err)),
      },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        padding={3}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <BillFields control={control} isView={isView} />
        <BillSummary calculations={calc as any} values={values} />
      </Grid>
      {!isView && (
        <DialogActions sx={{ p: 3 }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      )}
    </form>
  );
}
