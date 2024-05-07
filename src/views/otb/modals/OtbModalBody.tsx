import useColumns from "@/hooks/columns/otb-results";
import { AuctionData, LeaderBoard } from "@/services/result/auction/types";
import { BillHandleType, OtbLeaderBoardRow } from "@/types/results/type";
import { addKey } from "@/utils/add-key";
import { BillDialogue } from "@/views/results/modals/BillDialogue";
import { Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

interface OtbLogProps {
  leaderData: LeaderBoard[];
  winner: string;
  carID: string;
}

export default function OtbLogBody(props: OtbLogProps) {
  const { leaderData, carID } = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<AuctionData | OtbLeaderBoardRow>();
  const [type, setType] = useState<BillHandleType>("give");

  function handleModal() {
    setOpen(!open);
  }

  function handleUnsold() {
    console.log("");
  }

  const columns = useColumns({
    handleBill,
  });

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
            Mark Us UNSOLD
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
    </>
  );
}
