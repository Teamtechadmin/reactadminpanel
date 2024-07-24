import { AmountTypography } from "@/components/ui/containers/AmountTypography";
import { Grid, Typography } from "@mui/material";

interface CalcProps {
  totalDue: number;
  serviceFee: number;
  gstFee: number;
}

interface Props {
  calculations: CalcProps | null;
}

export const BillSummary = (props: Props) => {
  const { calculations } = props;
  return (
    <Grid display={"flex"} flexDirection={"column"} gap={1} item xs={4}>
      <Grid container display={"flex"} justifyContent={"space-between"}>
        <Typography>Total Amount Due</Typography>
        <AmountTypography text={String(calculations?.totalDue ?? "0")} />
      </Grid>
      <Grid container display={"flex"} justifyContent={"space-between"}>
        <Typography>Service Fee</Typography>
        <AmountTypography text={String(calculations?.serviceFee ?? "0")} />
      </Grid>
      <Grid container display={"flex"} justifyContent={"space-between"}>
        <Typography>GST on Service Fee</Typography>
        <AmountTypography text={String(calculations?.gstFee ?? "0")} />
      </Grid>
    </Grid>
  );
};
