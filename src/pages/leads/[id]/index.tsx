import usePrefillFields from "@/hooks/leads/prefill/usePrefillFields";
import useFormSchema from "@/hooks/schema/leads/update/schema";
import { useUpdateLead } from "@/services/leads/patch/patch";
import { useLeadStore } from "@/store/leads/store";
import { LeadUpdate } from "@/types/leads/patch/types";
import useCustomToast from "@/utils/toast";
import CallInfoCard from "@/views/leads/view/CallInfoCard";
import CarDetailsBasicCard from "@/views/leads/view/CarDetailsBasicCard";
import FollowUpCard from "@/views/leads/view/FollowUpCard";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const leadStatuses = [
  "NOTCONTACTED",
  "EVOLUTIONCONFIRMED",
  "EVOLUTIONSCHEDULED",
  "EVOLUTIONCOMPLETED",
  "RESCHEDULING",
  "NONRESPONSIVE",
  "EVOLUTIONEXPIRED",
];

const defaultValues = {
  sellerName: "",
  owner: "",
  relation: "",
  district: "",
  pinCode: "",
  locationLink: "",
  address: "",
  landMark: "",
  sellingReason: "",
  floodAffected: "",
  expectedPrice: 0,
  initialCallDate: new Date(),
  teleCallerId: "",
  followUps: [
    {
      status: "",
      date: new Date(),
      notes: "",
    },
  ],
};

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
    resolver: yupResolver<any>(schema),
    defaultValues,
  });

  const { fields, append } = useFieldArray({
    control,
    name: "followUps",
  });

  const maxFields = fields.length <= 2;

  const [owner] = watch(["owner"]);
  const toast = useCustomToast();
  const router = useRouter();
  const update = useUpdateLead();

  const onSubmit: any = (val: LeadUpdate) => {
    const followUps: any = val?.followUps;
    const subStatus = followUps?.map((item: { status: string }) => item.status);
    const addedLeads = lead?.subStatus || [];
    const leadBody: any = {
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
      teleCallerId: val.teleCallerId,
      initialFollowUpNotes: followUps?.[0]?.notes,
      followUpNotes: followUps?.[1]?.notes,
      finalFollowUpNotes: followUps?.[2]?.notes,
      initialCallDate: followUps?.[0]?.date,
      followUpCallDate: followUps?.[1]?.date,
      finalCallDate: followUps?.[2]?.date,
      ...(addedLeads?.length < subStatus.length && {
        subStatus: [subStatus[subStatus.length - 1]],
      }),
    };

    const matchedStatus = subStatus.find((status: string) =>
      leadStatuses.includes(status),
    );

    if (matchedStatus) {
      leadBody.leadStatus = matchedStatus;
    }
    update.mutate(
      {
        id: lead?._id ?? "",
        body: leadBody,
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

  function handleAdd() {
    if (fields.length <= 2) {
      append(defaultValues.followUps);
    }
  }

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
        {fields.map((field, index) => {
          const heading = index === 0 ? "Customer Status" : "";
          const addedFollowUps = lead?.subStatus?.length ?? 0;
          const disableFields = addedFollowUps >= index + 1;
          return (
            <Card key={field.id} sx={{ my: 3 }}>
              <FollowUpCard
                customHeading={heading}
                control={control}
                errors={errors?.followUps}
                index={index}
                isDisabled={disableFields}
              />
            </Card>
          );
        })}
        <Grid display={"flex"} gap={2} justifyContent={"end"}>
          {maxFields && (
            <Button onClick={handleAdd} variant="outlined">
              Add Follow Up
            </Button>
          )}
          <Button disabled={update.isPending} type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
