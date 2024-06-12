import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import CarBasicDetails from "./CarBasicDetails";

export default function CarDetailsBasicCard() {
  return (
    <Grid>
      <Grid
        paddingX={3}
        paddingY={2}
        display={"flex"}
        flexDirection={"column"}
        gap={1}
      >
        <Typography fontWeight={600} fontSize={18}>
          Car Details
        </Typography>
        <Typography fontSize={12} color={"GrayText"}>
          Detailed obtained at the time of lead generation.
        </Typography>
      </Grid>
      <Divider />
      <Grid>
        <CarBasicDetails />
      </Grid>
    </Grid>
  );
}
