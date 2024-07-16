import ConfirmModal from "@/components/ui/modals/ConfirmModal";
import { LiveTabTypes } from "@/types/live/auctions";
import { Button, Grid, Typography } from "@mui/material";

interface Props {
  open: boolean;
  handleClose: () => void;
  handleStopProceed: () => void;
  type: LiveTabTypes;
}

export const StopAuctionConfirmation = (props: Props) => {
  const { handleClose, open, type, handleStopProceed } = props;
  return (
    <ConfirmModal
      dailogueTitle="Confirmation Needed"
      titleFont={20}
      handleClose={handleClose}
      open={open}
      icon="tabler:ban"
      iconSize={22}
      ContentComponent={
        <Grid padding={3}>
          <Typography fontWeight={500}>
            {" "}
            Do you really want to stop the {type}? Clicking on Proceed will end
            the {type}!
          </Typography>
          <Grid display={"flex"} justifyContent={"end"} gap={2} paddingTop={2}>
            <Button onClick={handleClose} variant="outlined" color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleStopProceed}
              variant="contained"
              color="error"
            >
              Proceed
            </Button>
          </Grid>
        </Grid>
      }
    />
  );
};
