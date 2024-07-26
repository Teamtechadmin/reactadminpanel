import { Card, CardHeader, Grid, Theme, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useColumns from "../../../hooks/columns/otb";
import { addKey } from "@/utils/add-key";
import { useGetAuctionResults } from "@/services/result/auction/get";
import { OtbLogProps } from "@/types/results/type";
import LogModal from "@/views/auctions/modals/AuctionLogModal";
import OtbLogBody from "../modals/OtbModalBody";

interface Props {
  searchText: string;
}

const DataTable = (props: Props) => {
  const { searchText } = props;
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
  const [logData, setLogData] = useState<OtbLogProps>({
    model: "",
    winner: "",
    id: "",
  });
  const [openLog, setOpenLog] = useState(false);

  const { data: otbData, isLoading } = useGetAuctionResults({
    ...params,
    status: "PENDING",
    search: searchText,
  });

  function handleLog({ model, leaderBoard, winner, id }: OtbLogProps) {
    handleOtbLog();
    setLogData({
      leaderBoard,
      model,
      winner,
      id,
    });
  }

  function handleOtbLog() {
    setOpenLog(!openLog);
  }

  const otbResponse: any = otbData?.data;
  const otb = addKey(otbResponse, "id", "_id") ?? [];
  const selectedItem =
    Array.isArray(otb) && otb?.find((car) => car?.id === logData?.id);

  return (
    <>
      <Card>
        <CardHeader
          sx={{ p: 2 }}
          titleTypographyProps={{ variant: "h6" }}
          title={"OTB"}
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
            rows={otb as any}
            loading={isLoading}
            rowCount={10}
            paginationMode="server"
            paginationModel={params}
            onPaginationModelChange={setParams}
          />
        </Grid>
      </Card>
      <LogModal
        open={openLog}
        dailogueTitle={logData?.model}
        handleClose={handleOtbLog}
        ContentComponent={
          <OtbLogBody
            leaderData={selectedItem?.leaderBoard ?? []}
            winner={selectedItem?.winner}
            carID={selectedItem?.id}
            handleOtbLog={handleOtbLog}
          />
        }
        icon="tabler:article"
        titleFont={22}
        iconSize={"1.65rem"}
        maxWidth="md"
      />
    </>
  );
};

export default DataTable;
