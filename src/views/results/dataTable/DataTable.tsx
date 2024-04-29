import { Card, CardHeader, Grid, Theme, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useColumns from "../../../hooks/columns/results";
import { useGetAuctionResults } from "@/services/result/auction/get";
import { addKey } from "@/utils/add-key";
import { CarAuctionOtbHandleTypes } from "@/types/cars/car";
import AuctionDialogue from "@/views/cars/dailogue/AuctionDialogue";

const DataTable = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );
  const defaultRowHeight = 55;

  const columns = useColumns({
    handleAuctionOtb,
  });
  const [params, setParams] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data } = useGetAuctionResults({
    ...params,
    status: "PROCUREMENT,UNSOLD,NOBID",
  });
  const resultData = data?.data;
  const results = addKey(resultData as any, "id", "_id") ?? [];

  const [id, setId] = useState("");
  const [openApprove, setOpenApprove] = useState(false);
  const [modal, setModal] = useState<CarAuctionOtbHandleTypes>("auction");

  function handleAuctionOtb(carId: string, type: CarAuctionOtbHandleTypes) {
    setId(carId);
    setOpenApprove(!openApprove);
    setModal(type);
  }
  const resultDataCount: any = data;
  const count = resultDataCount?.count;

  return (
    <Card>
      <CardHeader
        sx={{ p: 2 }}
        titleTypographyProps={{ variant: "h6" }}
        title={"Results"}
      ></CardHeader>
      <Grid padding={2}>
        <DataGrid
          autoHeight
          pagination
          getRowHeight={() => {
            return isSmallScreen ? defaultRowHeight / 2 : defaultRowHeight;
          }}
          columnHeaderHeight={55}
          disableRowSelectionOnClick
          disableColumnSelector
          columns={columns}
          rows={results as any}
          rowCount={(count as number) ?? 0}
          paginationMode="server"
          paginationModel={params}
          onPaginationModelChange={setParams}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 15 } },
          }}
        />
        <AuctionDialogue
          open={openApprove}
          setOpen={setOpenApprove}
          id={id}
          isList
          modal={modal}
          isResult
        />
      </Grid>
    </Card>
  );
};

export default DataTable;
