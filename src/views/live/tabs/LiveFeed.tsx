import { Card, CardHeader, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { LogModal } from "../modals/LogModal";
import { StopAuctionConfirmation } from "../modals/StopAuctionConfirmation";
import { ViewersLogModal } from "../modals/ViewersLogModal";
import { capitaliseFirstLetter } from "@/utils/capitalise-firstletter";

interface Props<T> {
  type: "auction" | "otb";
  data: T[];
  columns: GridColDef[];
  openLog: boolean;
  handleClose: () => void;
  handleStop: () => void;
  log: T;
  openStop: boolean;
  openViews: boolean;
  handleViewers: () => void;
}

export default function LiveFeed<T>(props: Props<T>) {
  const {
    columns,
    data,
    type,
    openLog,
    handleClose,
    log,
    handleStop,
    openStop,
    handleViewers,
    openViews,
  } = props;
  const capitalisedType = capitaliseFirstLetter(type ?? "");
  return (
    <>
      <Card>
        <CardHeader title={`Live ${capitalisedType}`}></CardHeader>
        <Grid padding={2}>
          <DataGrid
            columns={columns}
            rows={data}
            disableColumnSelector
            rowSelection={false}
          />
        </Grid>
      </Card>
      <LogModal
        type={type}
        handleClose={handleClose}
        openLog={openLog}
        log={log}
      />
      <StopAuctionConfirmation
        handleClose={handleStop}
        open={openStop}
        type={type}
      />
      <ViewersLogModal
        handleClose={handleViewers}
        log={log}
        openLog={openViews}
        type={type}
      />
    </>
  );
}
