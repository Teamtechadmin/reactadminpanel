import { LiveTabTypes } from "@/types/live/auctions";
import { Grid } from "@mui/material";
import React from "react";
import { LogValues } from "./LogValues";
import { AuctionLogDataGrid } from "./dataTable/AuctionLogDataGrid";
import OtbLogDataGrid from "./dataTable/OtbLogDataGrid";

const logDataGrids = {
  auction: <AuctionLogDataGrid />,
  otb: <OtbLogDataGrid />,
};

export default function LogModalBody(props: { type: LiveTabTypes }) {
  return (
    <Grid padding={2}>
      <LogValues type={props.type} />
      <Grid paddingY={4}>{logDataGrids[props.type]}</Grid>
    </Grid>
  );
}
