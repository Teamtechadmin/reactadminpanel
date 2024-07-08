import { LiveTabTypes } from "@/types/live/auctions";
import { Grid } from "@mui/material";
import React from "react";
import { ViewerLogValues } from "./ViewerLogValues";
import OtbViewerLogDataGrid from "./dataTable/OtbViewerLogDataGrid";
import AuctionViewerLogDataGrid from "./dataTable/AuctionViewerLogDataGrid";

const viewLogDataGrids = {
  auction: <AuctionViewerLogDataGrid />,
  otb: <OtbViewerLogDataGrid />,
};

export default function ViewersLogModalBody(props: { type: LiveTabTypes }) {
  return (
    <Grid padding={2}>
      <ViewerLogValues type={props.type} />
      <Grid paddingY={4}>{viewLogDataGrids[props.type]}</Grid>
    </Grid>
  );
}
