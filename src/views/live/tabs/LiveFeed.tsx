import { Card, CardHeader, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { SetStateAction } from "react";
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
  log: any;
  openStop: boolean;
  openViews: boolean;
  handleViewers: () => void;
  params: { page: number; pageSize: number };
  setParams: React.Dispatch<SetStateAction<{ page: number; pageSize: number }>>;
  isFetching?: boolean;
  rowCount?: number;
}

function getLog(id: string, data: any) {
  return data?.find((item: { id: string }) => item.id === id);
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
    params,
    setParams,
    isFetching,
    rowCount,
  } = props;
  const capitalisedType = capitaliseFirstLetter(type ?? "");
  const logData = getLog(log?.id, data);
  console.log(logData, "logData");
  return (
    <>
      <Card>
        <CardHeader title={`Live ${capitalisedType}`}></CardHeader>
        <Grid padding={2}>
          <DataGrid
            autoHeight
            pagination
            rowHeight={55}
            columnHeaderHeight={55}
            disableRowSelectionOnClick
            disableColumnSelector
            columns={columns}
            rows={data ?? []}
            rowCount={rowCount ?? 10}
            loading={isFetching}
            paginationMode="server"
            paginationModel={params}
            onPaginationModelChange={setParams}
          />
        </Grid>
      </Card>
      <LogModal
        type={type}
        handleClose={handleClose}
        openLog={openLog}
        log={logData}
      />
      <StopAuctionConfirmation
        handleClose={handleStop}
        open={openStop}
        type={type}
      />
      <ViewersLogModal
        handleClose={handleViewers}
        log={logData}
        openLog={openViews}
        type={type}
      />
    </>
  );
}
