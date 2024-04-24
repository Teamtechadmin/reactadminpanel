import ConfirmModal from "@/components/ui/modals/ConfirmModal";
import useColumns from "@/hooks/columns/auctions-result";
import { addKey } from "@/utils/add-key";
import { Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import ActionsConfirmation from "./AuctionActionsConfirmation";

interface LogBodyProps {
  leaderBoard: any[];
}

export type ActionData = {
  fullname: string;
  type: ModalAction;
};

export type ModalAction = "Choose" | "Reject" | "Unsold";

export default function AuctionLogBody(props: LogBodyProps) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<ActionData>({
    type: "Choose",
    fullname: "",
  });

  const { leaderBoard } = props;
  const leaderData = addKey(leaderBoard, "id", "_id");
  const columns = useColumns({
    handleModal,
  });

  function handleModal(type: ModalAction, fullname: string) {
    handleConfirmModal();
    setAction({
      fullname,
      type,
    });
  }

  function handleUnsold() {
    handleConfirmModal();
    setAction({
      fullname: "",
      type: "Unsold",
    });
  }

  function handleConfirmModal() {
    setOpen(!open);
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
            handleClose={() => console.log("Close")}
            handleConfirm={() => console.log("Confirm")}
          />
        }
        icon="tabler:info-hexagon"
        iconSize={"1.5rem"}
        titleFont={20}
      />
    </>
  );
}
