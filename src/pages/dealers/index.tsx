import { DealerMetrics } from "@/views/customers/cards/DealerMetrics";
import { Grid } from "@mui/material";
import React from "react";

const Dealers = () => {
  return (
    <Grid>
      <DealerMetrics />
    </Grid>
  );
};

Dealers.authGuard = true;
Dealers.guestGuard = false;

export default Dealers;
