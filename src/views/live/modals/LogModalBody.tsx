import { LiveTabTypes } from "@/types/live/auctions";
import { Grid } from "@mui/material";
import React from "react";
import { LogValues } from "./LogValues";
import { AuctionLogDataGrid } from "./dataTable/AuctionLogDataGrid";
import OtbLogDataGrid from "./dataTable/OtbLogDataGrid";

export default function LogModalBody(props: { type: LiveTabTypes; data: any }) {
  const leaderBoard = props?.data?.leaderBoard?.map(
    (item: any, index: number) => {
      return {
        ...item,
        id: index,
      };
    },
  );
  const logDataGrids = {
    auction: <AuctionLogDataGrid log={leaderBoard} />,
    otb: <OtbLogDataGrid log={leaderBoard} />,
  };
  return (
    <Grid padding={2}>
      <LogValues type={props.type} data={props.data} />
      <Grid paddingY={4}>{logDataGrids[props.type]}</Grid>
    </Grid>
  );
}
