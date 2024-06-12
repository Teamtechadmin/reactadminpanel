import useColumns from "@/hooks/columns/assign-evaluators-lead";
import { useAssignEvaluator } from "@/services/leads/evaluators/assign/patch";
import { useGetAllEvaluators } from "@/services/leads/evaluators/list/get";
import { EvaluatorData } from "@/services/leads/evaluators/list/types";
import { addKey } from "@/utils/add-key";
import { errorMessageParser } from "@/utils/error";
import useCustomToast from "@/utils/toast";
import SearchHeaders from "@/views/customers/searchHeader/SearchHeaders";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  handleClose: () => void;
  leadID: string;
}

export default function AssignEvaluatorDialogueBody(props: Props) {
  const { handleClose, leadID } = props;
  const { control } = useForm();
  const [params, setParams] = useState({
    page: 0,
    pageSize: 10,
  });
  const { data } = useGetAllEvaluators(params);
  const assign = useAssignEvaluator();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const handleAssign = (row: EvaluatorData) => {
    assign.mutate(
      {
        id: leadID,
        body: {
          evaluatorId: row._id,
          status: "assign",
          assignEvaluatorTime: new Date().toISOString(),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["leads"],
          });
          toast.success(
            `Lead Assigned to ${row.fullname ?? "Evaluator"} Successfully`,
          );
          handleClose();
        },
        onError: (err) => toast.error(errorMessageParser(err)),
      },
    );
    handleClose();
  };
  const columns = useColumns({
    handleAssign,
  });

  const evaluators = data?.data?.data;
  const evaluatorData = addKey(evaluators ?? [], "id", "_id") || [];
  return (
    <Grid paddingX={3}>
      <SearchHeaders control={control} />
      <Grid paddingBottom={4}>
        <DataGrid
          autoHeight
          pagination
          columnHeaderHeight={55}
          disableRowSelectionOnClick
          disableColumnSelector
          columns={(columns as any) ?? []}
          // loading={isLoading}
          rows={evaluatorData ?? []}
          rowCount={data?.data?.count ?? 0}
          paginationMode="server"
          paginationModel={params}
          onPaginationModelChange={setParams as any}
        />
      </Grid>
    </Grid>
  );
}
