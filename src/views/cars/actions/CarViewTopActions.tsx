import { ButtonIcon } from "@/components/ui/buttons/ButtonIcon";
import { Grid } from "@mui/material";
import React from "react";

interface CarViewTopActionsProps {
  handleOpen: () => void;
  isPending: boolean;
  handleDownload: () => void;
}

const CarViewTopActions = (props: CarViewTopActionsProps) => {
  const { handleDownload, handleOpen, isPending } = props;
  return (
    <Grid>
      <ButtonIcon
        icon="tabler:printer"
        onClick={handleOpen}
        title="Print as PDF"
        disabled={isPending}
      />
      <ButtonIcon
        icon="tabler:download"
        onClick={handleDownload}
        title="Export as PDF"
        disabled={isPending}
      />
    </Grid>
  );
};

export default CarViewTopActions;
