import TextFormField from "@/components/ui/inputfields/TextFormField";
import TimePickerForm from "@/components/ui/inputfields/TimePickerForm";
import { ApproveCar } from "@/types/cars/approve";
import { Button, DialogActions, Grid } from "@mui/material";
import { Control } from "react-hook-form";

interface AuctionControlProps {
  control: Control<ApproveCar>;
  errors: any;
  handleCancel: () => void;
  isAuction: boolean;
  isLoading: boolean;
}

export function AuctionContent(auctionContentProps: AuctionControlProps) {
  const { control, errors, handleCancel, isAuction, isLoading } =
    auctionContentProps;
  return (
    <Grid padding={3} container display={"flex"} gap={2} width={"100%"}>
      <Grid width={"100%"}>
        <TimePickerForm
          id="bidStartTime"
          control={control}
          error={errors?.bidStartTime}
          label="Start Bid Time"
        />
      </Grid>
      <Grid width={"100%"}>
        <TimePickerForm
          id="bidEndTime"
          control={control}
          error={errors?.bidEndTime}
          label="End Bid Time"
        />
      </Grid>
      <Grid width={"100%"}>
        <TextFormField
          control={control}
          id="realValue"
          error={errors?.realValue}
          label={isAuction ? "Fair Market Price" : "OTB Price"}
          size="medium"
          type="number"
          InputProps={{
            startAdornment: <Grid mr={1}>₹</Grid>,
          }}
        />
      </Grid>
      {isAuction && (
        <Grid width={"100%"}>
          <TextFormField
            control={control}
            id="highestBid"
            error={errors?.highestBid}
            label={"Starting Bid"}
            size="medium"
            type="number"
            InputProps={{
              startAdornment: <Grid mr={1}>₹</Grid>,
            }}
          />
        </Grid>
      )}
      <Grid width={"100%"}>
        <DialogActions className="dialog-actions-dense">
          <Button disabled={isLoading} type="submit" variant="contained">
            Proceed
          </Button>
          <Button onClick={handleCancel} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Grid>
    </Grid>
  );
}
