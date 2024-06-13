import usePrefillFields from "@/hooks/leads/prefill/usePrefillFields";
import useFormSchema from "@/hooks/schema/leads/update/schema";
import { useUpdateLead } from "@/services/leads/patch/patch";
import { useLeadStore } from "@/store/leads/store";
import { LeadUpdate } from "@/types/leads/patch/types";
import useCustomToast from "@/utils/toast";
import CallInfoCard from "@/views/leads/view/CallInfoCard";
import CarDetailsBasicCard from "@/views/leads/view/CarDetailsBasicCard";
import CustomerStatusCard from "@/views/leads/view/CustomerStatusCard";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const leadStatuses = [
  "NOTCONTACTED",
  "EVOLUTIONCONFIRMED",
  "EVOLUTIONSCHEDULED",
  "EVOLUTIONCOMPLETED",
  "RESCHEDULING",
  "NONRESPONSIVE",
  "EVOLUTIONEXPIRED",
];

export default function LeadDetailedPage() {
  const [refresh, setRefresh] = useState(1);
  const { lead } = useLeadStore();
  const schema = useFormSchema();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [owner] = watch(["owner"]);
  const toast = useCustomToast();
  const router = useRouter();
  const update = useUpdateLead();
  const onSubmit: any = (val: LeadUpdate) => {
    update.mutate(
      {
        id: lead?._id ?? "",
        body: {
          ...val,
          sellerName: val.sellerName,
          relation: val.owner === "yes" ? "owner" : val.relation,
          city: val.district,
          pinCode: val.pinCode,
          locationLink: val.locationLink,
          address: val.address,
          landMark: val.landMark,
          sellingReason: val.sellingReason,
          floodAffected: val.floodAffected,
          expectedPrice: val.expectedPrice,
          initialCallDate: val.initialCallDate,
          teleCallerId: val.teleCallerId,
          initialFollowUpNotes: val.initialFollowUpNotes,
          ...(leadStatuses.includes(val.status)
            ? { leadStatus: val.status }
            : { subStatus: val.status }),
        },
      },
      {
        onSuccess: () => {
          toast.success("Lead Updated Successfully");
          router.push("/leads");
        },
      },
    );
  };

  usePrefillFields({
    data: lead as any,
    setValue: setValue as any,
    setRefresh,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid key={refresh}>
        <Grid display={"flex"} gap={1} marginTop={3}>
          <Typography fontWeight={600} color={"GrayText"}>
            Lead ID:
          </Typography>
          <Typography color={"GrayText"}>{lead?.leadId}</Typography>
        </Grid>
        <Card sx={{ my: 3 }}>
          <CarDetailsBasicCard />
        </Card>
        <Card sx={{ my: 3 }}>
          <CallInfoCard control={control} errors={errors} owner={owner} />
        </Card>
        <Card sx={{ my: 3 }}>
          <CustomerStatusCard control={control} errors={errors} />
        </Card>
        <Grid display={"flex"} gap={2} justifyContent={"end"}>
          <Button variant="outlined">Add Follow Up</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
