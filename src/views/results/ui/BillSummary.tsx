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
          isHighlight?: boolean;
        }) => {
          const label = result.label !== "" ? result.label : "-";
          const isHighlight = result.isHighlight;
          return (
            <Grid
              key={result?.label}
              container
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography
                sx={{ paddingTop: isHighlight ? 1 : 0 }}
                fontWeight={isHighlight ? 600 : 400}
              >
                {label}
              </Typography>
              {result?.isPercentage ? (
                <Typography
                  sx={{ paddingTop: isHighlight ? 1 : 0 }}
                  fontWeight={isHighlight ? 600 : 400}
                >
                  {result?.amount}%
                </Typography>
              ) : (
                <AmountTypography
                  sx={{ paddingTop: isHighlight ? 1 : 0 }}
                  isHighlight={isHighlight}
                  text={String(result?.amount ?? "0")}
                />
              )}
            </Grid>
          );
        },
      )}
    </Grid>
  );
};
