import { Card, CardHeader, Grid, Theme, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useColumns from "../../../hooks/columns/results";
import { useGetAuctionResults } from "@/services/result/auction/get";
import { addKey } from "@/utils/add-key";
import { CarAuctionOtbHandleTypes } from "@/types/cars/car";
import AuctionDialogue from "@/views/cars/dailogue/AuctionDialogue";
import ConfirmModal from "@/components/ui/modals/ConfirmModal";
import { ConfirmBody } from "@/components/ui/custom/confirm/ConfirmBody";
import useUpdateCarById from "@/hooks/actions/cars/update-car";
import useCustomToast from "@/utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import { AuctionData } from "@/services/result/auction/types";
import { BillDialogue } from "../modals/BillDialogue";
import { BillHandleType } from "@/types/results/type";

const DataTable = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );
  const defaultRowHeight = 55;

  const columns = useColumns({
    handleAuctionOtb,
    handleRC,
    handleBill,
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
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openBill, setOpenBill] = useState(false);
  const [bill, setBill] = useState<AuctionData | null>(null);
  const [billType, setBillType] = useState<BillHandleType>("give");

  const update = useUpdateCarById();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const [modal, setModal] = useState<CarAuctionOtbHandleTypes>("auction");

  function handleAuctionOtb(carId: string, type: CarAuctionOtbHandleTypes) {
    setId(carId);
    setOpenApprove(!openApprove);
    setModal(type);
  }

  function handleRC(id: string) {
    handleConfirmModal();
    setId(id);
  }

  function handleConfirmModal() {
    setOpenConfirm(!openConfirm);
  }

  function handleRCSubmit() {
    update({
      body: { status: "RCTRANSFER" },
      id,
      handleSuccess: () => {
        handleConfirmModal();
        toast.success("Status set to RC Transfer"),
          queryClient.invalidateQueries({
            queryKey: ["auction-result"],
          });
      },
    });
  }

  function handleBill(data: AuctionData, type: BillHandleType) {
    handleBillOpen();
    setBill(data);
    setBillType(type);
  }

  function handleBillOpen() {
    setOpenBill(!openBill);
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
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
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
        <ConfirmModal
          open={openConfirm}
          dailogueTitle={`Are you sure?`}
          handleClose={handleConfirmModal}
          ContentComponent={
            <ConfirmBody
              handleClose={handleConfirmModal}
              handleSubmit={handleRCSubmit}
              text={
                "By Clicking on Submit this car will be marked to RC Transfer Status"
              }
            />
          }
          icon="tabler:info-hexagon"
          iconSize={"1.5rem"}
          titleFont={20}
          hideClose
        />

        <BillDialogue
          open={openBill}
          handleClose={handleBillOpen}
          data={bill as AuctionData}
          type={billType}
          carID={bill?._id ?? ""}
        />
      </Grid>
    </Card>
  );
};

export default DataTable;
