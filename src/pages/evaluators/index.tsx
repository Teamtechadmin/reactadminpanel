import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SearchHeaders from "../../views/customers/searchHeader/SearchHeaders";
import DataTable from "../../views/evaluators/dataTable/DataTable";
import EvaluatorDrawer from "@/views/evaluators/drawer/EvaluatorDrawer";
import EvaluatorSuccessModal from "@/views/evaluators/modals/EvaluatorSuccessModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { EvaluatorAddFormType } from "@/types/evaluators/formTypes";
import { useFormSchema } from "@/hooks/schema/evaluators";
import { EvaluatorsCreateResponseData } from "@/services/evaluators/create/types";
import { useAddEvaluators } from "@/services/evaluators/create/post";
import { useQueryClient } from "@tanstack/react-query";
import {
  Evaluator,
  EvaluatorActionMode,
} from "@/services/evaluators/list/types";
import { useUpdateEvaluator } from "@/services/evaluators/update/patch";
import evaluatorSubmit from "@/functions/evaluators/submit-evaluator";
import useCustomToast from "@/utils/toast";

const defaultValues = {
  name: "",
  status: "",
};

const defaultEvalValues = {
  fullName: "",
  contactNumber: "",
  email: "",
  location: "",
};

const Evaluators = () => {
  const { control } = useForm({
    defaultValues,
  });
  const schema = useFormSchema();
  const {
    control: controlEvaluator,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EvaluatorAddFormType>({
    defaultValues: defaultEvalValues,
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState({});
  const [mode, setMode] = useState<EvaluatorActionMode>("add");
  const [data, setData] = useState<Evaluator>();
  const addEvaluator = useAddEvaluators();
  const updateEvaluator = useUpdateEvaluator();
  const queryClient = useQueryClient();
  const toast = useCustomToast();
  const isEdit = mode === "edit";

  function handleClick() {
    setOpen(!open);
    reset(defaultEvalValues);
    setSuccessMsg({});
    setMode("add");
  }

  function onSubmit(val: EvaluatorAddFormType) {
    evaluatorSubmit({
      isEdit,
      value: val,
      add: addEvaluator,
      update: updateEvaluator,
      handleSuccess,
      id: data?.id,
    });
  }

  function handleSuccess(
    res: EvaluatorsCreateResponseData,
    isEditMode: boolean,
  ) {
    handleClick();
    queryClient.invalidateQueries({
      queryKey: ["evaluators"],
    });
    if (!isEditMode) {
      setSuccessMsg(res);
      setOpenSuccess(!openSuccess);
    } else {
      toast.success("Evaluator Updated Successfully");
    }
  }

  function handleEdit(evaluator: Evaluator) {
    setOpen(!open);
    setMode("edit");
    setSuccessMsg({});
    setData(evaluator);
    reset({
      contactNo: evaluator.contactNo,
      email: evaluator.email,
      fullname: evaluator.fullname,
      location: evaluator.location,
    });
  }

  return (
    <Grid>
      <SearchHeaders control={control} />
      <DataTable handleAdd={handleClick} handleEdit={handleEdit} />
      <EvaluatorDrawer
        open={open}
        handleClick={handleClick}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={controlEvaluator}
        errors={errors}
        apiError={addEvaluator.error}
      />
      <EvaluatorSuccessModal
        open={openSuccess}
        setOpen={setOpenSuccess}
        successMsg={successMsg}
      />
    </Grid>
  );
};

Evaluators.authGuard = true;
Evaluators.guestGuard = false;

export default Evaluators;
