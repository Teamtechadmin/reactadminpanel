import { Grid, Typography } from "@mui/material";
import CarDetails from "./CarDetails";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormSchema from "@/hooks/schema/leads/add/schema";
import { useAddLeads } from "@/services/leads/post/post";
import useCustomToast from "@/utils/toast";
import { errorMessageParser } from "@/utils/error";
import { useQueryClient } from "@tanstack/react-query";
import { LeadBody } from "@/services/leads/post/types";

const defaultValues = {
  make: "",
  rto: "",
  monthAndYearOfManufacture: "",
  model: "",
  fuelType: "",
  transmission: "",
  variant: "",
  ownershipNumber: "",
  odometerReading: "",
  sellingPlan: "",
  sellerMobileNumber: "",
  source: "",
  purpose: "SELLING",
  registrationNumber: "",
};

interface Props {
  handleClose: () => void;
}

export default function AddLeadDialogueBody(props: Props) {
  const { handleClose } = props;
  const schema = useFormSchema();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LeadBody>({
    defaultValues,
    resolver: yupResolver<any>(schema),
  });

  const create = useAddLeads();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const onSubmit = (val: LeadBody) => {
    create.mutate(
      {
        ...val,
        proposeOfInspection: "SELLING",
      },
      {
        onSuccess: () => {
          toast.success("Lead Added Successfully");
          queryClient.invalidateQueries({
            queryKey: ["leads"],
          });
          handleClose();
          reset();
        },
        onError: (err) => toast.error(errorMessageParser(err)),
      },
    );
  };

  return (
    <Grid padding={3}>
      <Typography fontSize={"1.25rem"} fontWeight={500}>
        Car Details
      </Typography>
      <CarDetails
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </Grid>
  );
}
