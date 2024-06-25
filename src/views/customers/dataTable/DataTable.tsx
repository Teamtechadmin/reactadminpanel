import { Card, CardHeader, Grid, Theme, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useColumns from "../../../hooks/columns/customers";
import { useGetUsers } from "@/services/users/get";
import { addKey } from "@/utils/add-key";
import ConfirmModal from "@/components/ui/modals/ConfirmModal";
import DealerDocumentVerifyBody from "../modals/DealerDocumentVerifyBody";
import { useRouter } from "next/router";

interface Props {
  search: string;
}

const DataTable = (props: Props) => {
  const { search } = props;
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );
  const defaultRowHeight = 55;

  const router = useRouter();

  const columns = useColumns({
    handleView,
    handleVerify,
  });
  const [params, setParams] = useState({
    page: 0,
    pageSize: 10,
  });
  const [confirm, setConfirm] = useState(false);
  const [cusId, setCusId] = useState("");

  const { data: dealers } = useGetUsers({
    params: { ...params, role: "DEALER", contactNo: search },
  });
  const data = dealers?.data?.data;
  const dataWithId = addKey(data, "id", "_id") || [];
  const totalEntries = dealers?.data?.count || 0;

  function handleView(id: string) {
    router.push(`/dealers/${id}`);
  }

  function handleVerify(id: string) {
    handleVerifyModal();
    setCusId(id);
  }
  function handleVerifyModal() {
    setConfirm(!confirm);
  }

  return (
    <>
      <Card>
        <CardHeader
          sx={{ p: 2 }}
          titleTypographyProps={{ variant: "h6" }}
          title={"Dealers"}
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
            rows={(dataWithId as any) ?? []}
            rowCount={totalEntries}
            paginationMode="server"
            paginationModel={params}
            onPaginationModelChange={setParams}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 15 } },
            }}
          />
        </Grid>
      </Card>
      <ConfirmModal
        dailogueTitle="Are you sure to verify?"
        handleClose={handleVerifyModal}
        icon="tabler:info-hexagon"
        iconSize={"1.5rem"}
        titleFont={20}
        open={confirm}
        ContentComponent={
          <DealerDocumentVerifyBody
            id={cusId}
            handleClose={handleVerifyModal}
          />
        }
      />
    </>
  );
};

export default DataTable;
