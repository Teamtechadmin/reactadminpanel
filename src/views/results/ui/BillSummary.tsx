import { AmountTypography } from "@/components/ui/containers/AmountTypography";
import { getBillCalculations } from "@/functions/results/get-bill-calculations";
import { BillForm } from "@/types/results/type";
import { Grid, Typography } from "@mui/material";

export interface CalcProps {
  totalDue: number;
  totalAmtDue: number;
  serviceFee: number;
  gstFee: number;
  tcs: number;
  transportationGst: number;
  parkingGst: number;
  additionalChargeFees: { taxFee: number; value: number }[];
}

interface Props {
  calculations?: CalcProps | null;
  values: BillForm;
}

export const BillSummary = (props: Props) => {
  const { calculations, values } = props;
  const { additionalCharges, primaryCharges, totalCharges } =
    getBillCalculations(values, calculations);
  const results = Array.isArray(additionalCharges)
    ? [...primaryCharges, ...additionalCharges, ...totalCharges]
    : [...primaryCharges, ...totalCharges];

  return (
    <Grid display={"flex"} flexDirection={"column"} gap={1} item xs={4}>
      {results?.map(
        (result: {
          label?: string;
          amount?: number;
          isPercentage?: boolean;
        }) => {
          const label = result.label !== "" ? result.label : "-";
          return (
            <Grid
              key={result?.label}
              container
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography>{label}</Typography>
              {result?.isPercentage ? (
                <Typography>{result?.amount}%</Typography>
              ) : (
                <AmountTypography text={String(result?.amount ?? "0")} />
              )}
            </Grid>
          );
        },
      )}
    </Grid>
  );
};
