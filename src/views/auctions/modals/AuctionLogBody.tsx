import ConfirmModal from "@/components/ui/modals/ConfirmModal";
import useColumns from "@/hooks/columns/auctions-result";
import { addKey } from "@/utils/add-key";
import { Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import ActionsConfirmation from "./AuctionActionsConfirmation";
import { useUpdateResult } from "@/services/result/auction/patch";
import { useQueryClient } from "@tanstack/react-query";
import useCustomToast from "@/utils/toast";

interface LogBodyProps {
  leaderBoard: any[];
  carID: string;
}

export type ActionData = {
  fullname: string;
  type: ModalAction;
  id: string;
  userId?: string;
};

export type ModalAction = "Choose" | "Reject" | "Unsold";

export default function AuctionLogBody(props: LogBodyProps) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<ActionData>({
    type: "Choose",
    fullname: "",
    id: "",
    userId: "",
  });
  const isChoose = action.type === "Choose";
  const toast = useCustomToast();
  const queryClient = useQueryClient();
  const { leaderBoard, carID } = props;
  const leaderData = addKey(leaderBoard, "id", "_id");
  const columns = useColumns({
    handleModal,
  });
  const update = useUpdateResult();

  function handleModal(
    type: ModalAction,
    fullname: string,
    id: string,
    userId: string,
  ) {
    handleConfirmModal();
    setAction({
      fullname,
      type,
      id,
      userId,
    });
  }

  function handleUnsold() {
    handleConfirmModal();
    setAction({
      fullname: "",
      type: "Unsold",
      id: carID,
    });
  }

  function handleConfirmModal() {
    setOpen(!open);
  }

  function handleConfirm() {
    update.mutate(
      {
        id: carID,
        body: {
          status: isChoose ? "accept" : "reject",
          userId: action.userId ?? "",
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["auction-result"],
          });
          handleConfirmModal();
          toast.success(
            isChoose ? `User Accepted as highest Bidder` : `Offer Rejected`,
          );
        },
      },
    );
  }

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
            rows={(leaderData as any) ?? []}
            rowCount={10}
            paginationMode="server"
          />
        </Grid>

        <Grid marginTop={2}>
          <Button onClick={handleUnsold} variant="contained" color="error">
            Mark Us UNSOLD
          </Button>
        </Grid>
      </Grid>
      <ConfirmModal
        open={open}
        dailogueTitle={`Are you sure to ${action.type}?`}
        handleClose={handleConfirmModal}
        ContentComponent={
          <ActionsConfirmation
            fullname={action.fullname}
            type={action.type}
            handleClose={handleConfirmModal}
            handleConfirm={() => handleConfirm()}
          />
        }
        icon="tabler:info-hexagon"
        iconSize={"1.5rem"}
        titleFont={20}
      />
    </>
  );
}
