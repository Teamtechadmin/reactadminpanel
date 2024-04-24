import { Card, CardHeader, Grid, Theme, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useColumns from "@/hooks/columns/auctions";
import { useGetAuctionResults } from "@/services/result/auction/get";
import { addKey } from "@/utils/add-key";
import { LeaderBoard } from "@/services/result/auction/types";
import AuctionLogBody from "../modals/AuctionLogBody";
import LogModal from "../modals/AuctionLogModal";

const DataTable = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );
  const defaultRowHeight = 55;

  const columns = useColumns({
    handleLog,
  });
  const [params, setParams] = useState({
    page: 0,
    pageSize: 10,
  });
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState({ leaderBoard: [{}], model: "" });

  const auctions = useGetAuctionResults();
  const auctionData: any = auctions?.data?.data;
  const auctionWithId = addKey(auctionData, "id", "_id") ?? [];

  function handleLog(leaderBoard: LeaderBoard[], model: string) {
    handleModal();
    setLog({
      leaderBoard,
      model,
    });
  }

  function handleModal() {
    setOpen(!open);
  }
  return (
    <React.Fragment>
      <Card>
        <CardHeader
          sx={{ p: 2 }}
          titleTypographyProps={{ variant: "h6" }}
          title={"Auctions"}
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
            rows={auctionWithId as any}
            rowCount={10}
            paginationMode="server"
            paginationModel={params}
            onPaginationModelChange={setParams}
            // initialState={{
            //   pagination: { paginationModel: { page: 1, pageSize: 10 } },
            // }}
          />
        </Grid>
      </Card>
      <LogModal
        open={open}
        dailogueTitle={log.model}
        ContentComponent={<AuctionLogBody leaderBoard={log.leaderBoard} />}
        handleClose={handleModal}
        icon="tabler:article"
        titleFont={22}
        iconSize={"1.65rem"}
        maxWidth="md"
      />
    </React.Fragment>
  );
};

export default DataTable;
