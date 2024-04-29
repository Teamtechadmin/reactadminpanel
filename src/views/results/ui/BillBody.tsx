import { AmountTypography } from "@/components/ui/containers/AmountTypography";
import TextFormField from "@/components/ui/inputfields/TextFormField";
import { getWinner } from "@/functions/results/get-winner";
import { usePrefillBill } from "@/hooks/utils/bill";
import { useCalculateBill } from "@/hooks/utils/calculate-gst-bill";
import { useUpdateResult } from "@/services/result/auction/patch";
import { AuctionData } from "@/services/result/auction/types";
import { BillForm } from "@/types/results/type";
import { errorMessageParser } from "@/utils/error";
import useCustomToast from "@/utils/toast";
import {
  Button,
  DialogActions,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface BillBodyProps {
  data: AuctionData | null;
  handleClose: () => void;
}

const defaultValues = {
  totalAmount: 0,
  serviceRate: 0.5,
  gstRate: 18,
};

export const BillBody = (props: BillBodyProps) => {
  const { data, handleClose } = props;
  const winnerData = getWinner(data?.leaderBoard ?? [], data?.winner ?? "");
  const { control, setValue, watch, handleSubmit } = useForm<BillForm>({
    defaultValues,
  });
  const values = watch();
  const updateResult = useUpdateResult();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  usePrefillBill({
    setValue,
    data: winnerData,
  });

  const calc = useCalculateBill({
    values,
  });

  function onSubmit() {
    updateResult.mutate(
      {
        id: data?._id ?? "",
        body: {
          status: "bill",
          gst: calc?.gstFee,
          serviceFees: calc?.serviceFee,
          totalAmount: calc?.totalDue,
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
      <Grid padding={3} display={"flex"} flexDirection={"column"} gap={2}>
        <Grid>
          <TextFormField
            control={control}
            id="totalAmount"
            label="Total Amount"
            placeholder="Total Amount"
            size="medium"
            type="number"
          />
        </Grid>
        <Grid>
          <TextFormField
            control={control}
            id="serviceRate"
            label="Service Rate"
            placeholder="Service Rate"
            size="medium"
            type="number"
            InputProps={{
              endAdornment: <Grid mr={1}>%</Grid>,
            }}
          />
        </Grid>
        <Grid>
          <TextFormField
            control={control}
            id="gstRate"
            label="GST Rate"
            placeholder="GST Rate"
            size="medium"
            type="number"
            InputProps={{
              endAdornment: <Grid mr={1}>%</Grid>,
            }}
          />
        </Grid>
        <Divider />
        <Grid container display={"flex"} justifyContent={"space-between"}>
          <Typography>Total Amount Due</Typography>
          <AmountTypography text={String(calc?.totalDue ?? "0")} />
        </Grid>
        <Grid container display={"flex"} justifyContent={"space-between"}>
          <Typography>Service Fee</Typography>
          <AmountTypography text={String(calc?.serviceFee ?? "0")} />
        </Grid>
        <Grid container display={"flex"} justifyContent={"space-between"}>
          <Typography>GST on Service Fee</Typography>
          <AmountTypography text={String(calc?.gstFee ?? "0")} />
        </Grid>
      </Grid>
      <DialogActions>
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </form>
  );
};
