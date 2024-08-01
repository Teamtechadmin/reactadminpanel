import TextFormField from "@/components/ui/inputfields/TextFormField";
import { Button, Grid } from "@mui/material";
import { Control, useFieldArray } from "react-hook-form";
import { BillCustomFields } from "./BillCustomFields";
import { BillForm } from "@/types/results/type";

interface Props {
  isView: boolean;
  disableTotalAmt: boolean;
  control: Control<BillForm>;
}

export const BillFields = (props: Props) => {
  const { control, isView, disableTotalAmt } = props;
  const { append, fields, remove } = useFieldArray({
    name: "additionalCharges",
    control,
  });
  return (
    <Grid item xs={7.5} display={"flex"} flexDirection={"column"} gap={2}>
      <Grid>
        <TextFormField
          control={control}
          id="totalAmount"
          label="Bid Amount"
          placeholder="Bid Amount"
          size="medium"
          isDisabled={isView || disableTotalAmt}
          type="number"
          InputProps={{
            startAdornment: <Grid mr={1}>₹</Grid>,
          }}
        />
      </Grid>
      <Grid>
        <TextFormField
          control={control}
          id="rcDeposit"
          label="Refundable RC Deposit"
          placeholder="Refundable RC Deposit"
          size="medium"
          isDisabled
          type="number"
          InputProps={{
            startAdornment: <Grid mr={1}>₹</Grid>,
          }}
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
          isDisabled={isView}
          InputProps={{
            endAdornment: <Grid mr={1}>%</Grid>,
          }}
        />
      </Grid>
      <Grid>
        <TextFormField
          control={control}
          id="parkingCharge"
          label="Parking Charge"
          placeholder="Parking Charge"
          size="medium"
          type="number"
          isDisabled={isView}
          InputProps={{
            startAdornment: <Grid mr={1}>₹</Grid>,
          }}
        />
      </Grid>
      <Grid>
        <TextFormField
          control={control}
          id="transportationCharge"
          label="Transportation Charges"
          placeholder="Transportation Charges"
          size="medium"
          type="number"
          isDisabled={isView}
          InputProps={{
            startAdornment: <Grid mr={1}>₹</Grid>,
          }}
        />
      </Grid>
      <Grid>
        <TextFormField
          control={control}
          id="discount"
          label="Discount"
          placeholder="Discount"
          size="medium"
          type="number"
          isDisabled={isView}
          InputProps={{
            startAdornment: <Grid mr={1}>₹</Grid>,
          }}
        />
      </Grid>
      <BillCustomFields
        isView={isView}
        control={control}
        fields={fields}
        remove={remove}
      />
      {!isView && (
        <Grid>
          <Button
            onClick={() => append({ name: "", value: 0, tax: 0 })}
            variant="outlined"
          >
            + Add Custom Charge
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
