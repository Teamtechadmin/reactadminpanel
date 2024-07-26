import ConfirmModal from "@/components/ui/modals/ConfirmModal";
import useColumns from "@/hooks/columns/otb-results";
import { AuctionData, LeaderBoard } from "@/services/result/auction/types";
import { BillHandleType, OtbLeaderBoardRow } from "@/types/results/type";
import { addKey } from "@/utils/add-key";
import { BillDialogue } from "@/views/results/modals/BillDialogue";
import { Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import OtbConfirmModalBody from "./OtbConfirmModalBody";
import useUpdateCarById from "@/hooks/actions/cars/update-car";
import useCustomToast from "@/utils/toast";
import { useQueryClient } from "@tanstack/react-query";

interface OtbLogProps {
  leaderData: LeaderBoard[];
  winner: string;
  carID: string;
  handleOtbLog: () => void;
}

export default function OtbLogBody(props: OtbLogProps) {
  const { leaderData, carID, handleOtbLog } = props;
  const [open, setOpen] = useState(false);
  const [openUnsold, setOpenUnsold] = useState(false);
  const [data, setData] = useState<AuctionData | OtbLeaderBoardRow>();
  const [type, setType] = useState<BillHandleType>("give");
  const { updateCar, isPending } = useUpdateCarById();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  function handleModal() {
    setOpen(!open);
  }

  function handleUnsoldOpen() {
    setOpenUnsold(!openUnsold);
  }

  function handleUnsold() {
    handleUnsoldOpen();
  }

  const columns = useColumns({
    handleBill,
  });

  const handleUnsoldSubmit = () => {
    updateCar({
      body: {
        status: "UNSOLD",
      },
      id: carID,
      handleSuccess: () => {
        toast.success("Car Marked as UNSOLD Successfully!");
        handleUnsold();
        queryClient.invalidateQueries({
          queryKey: ["auction-result"],
        });
        handleOtbLog();
      },
    });
  };

  function handleBill(billData: OtbLeaderBoardRow) {
    handleModal();
    setData(billData);
    setType("give");
  }
  const leaderBoard = addKey(leaderData, "id", "_id");

  return (
    <>
      <Grid padding={3}>
        <Grid>
          <DataGrid
            pagination
            columnHeaderHeight={55}
            disableRowSelectionOnClick
            disableColumnSelector
            columns={columns ?? []}
            rows={(leaderBoard as any) ?? []}
            paginationMode="server"
            pageSizeOptions={[]}
            loading={false}
          />
        </Grid>

        <Grid marginTop={2}>
          <Button onClick={handleUnsold} variant="contained" color="error">
            Mark As UNSOLD
          </Button>
        </Grid>
      </Grid>
      <BillDialogue
        open={open}
        data={data as OtbLeaderBoardRow}
        handleClose={handleModal}
        type={type}
        carID={carID}
        isOtb
      />
      <ConfirmModal
        open={openUnsold}
        ContentComponent={
          <OtbConfirmModalBody
            handleClose={handleUnsoldOpen}
            handleSubmit={handleUnsoldSubmit}
            isDisabled={isPending}
          />
        }
        dailogueTitle="Are you sure to continue?"
        icon="tabler:info-hexagon"
        iconSize={"1.5rem"}
        titleFont={20}
        handleClose={handleUnsoldOpen}
      />
    </>
  );
}
