import { Card, CardHeader } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { LogModal } from "../modals/LogModal";
import { StopAuctionConfirmation } from "../modals/StopAuctionConfirmation";

interface Props<T> {
  type: "auction" | "otb";
  data: T[];
  columns: GridColDef[];
  openLog: boolean;
  handleClose: () => void;
  handleStop: () => void;
  log: T;
  openStop: boolean;
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
  } = props;
  return (
    <>
      <Card>
        <CardHeader title={`Live ${type}`}></CardHeader>
        <DataGrid
          columns={columns}
          rows={data}
          disableColumnSelector
          rowSelection={false}
        />
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
    </>
  );
}
