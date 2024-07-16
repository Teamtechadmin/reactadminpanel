import { LiveTabTypes } from "@/types/live/auctions";
import { Grid } from "@mui/material";
import React from "react";
import { ViewerLogValues } from "./ViewerLogValues";
import OtbViewerLogDataGrid from "./dataTable/OtbViewerLogDataGrid";
import AuctionViewerLogDataGrid from "./dataTable/AuctionViewerLogDataGrid";

export default function ViewersLogModalBody(props: {
  type: LiveTabTypes;
  data: any;
}) {
  const viewLogDataGrids = {
    auction: <AuctionViewerLogDataGrid data={props?.data?.viewerList} />,
    otb: <OtbViewerLogDataGrid />,
  };
  return (
    <Grid padding={2}>
      <ViewerLogValues type={props.type} data={props.data} />
      <Grid paddingY={4}>{viewLogDataGrids[props.type]}</Grid>
    </Grid>
  );
}
