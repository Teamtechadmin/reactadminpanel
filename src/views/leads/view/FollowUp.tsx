import SelectFormField from "@/components/ui/inputfields/SelectField";
import TextFormField from "@/components/ui/inputfields/TextFormField";
import TimePickerForm from "@/components/ui/inputfields/TimePickerForm";
import { renderMenuItems } from "@/components/ui/utility/MenuItem";
import { statuses } from "@/data/leads/status";
import { Grid } from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";

interface FollowUpProps {
  control: Control<any>;
  errors: any;
  index: number;
  isDisabled?: boolean;
}

export default function FollowUp(props: FollowUpProps) {
  const { control, errors, index, isDisabled } = props;
  return (
    <Grid container display={"flex"} padding={2} gap={3}>
      <Grid item lg={4}>
        <SelectFormField
          control={control}
          id={`followUps.${[index]}.status`}
          label="Schedule Status"
          error={errors?.[index]?.status}
          renderMenuItems={renderMenuItems}
          data={statuses ?? []}
          size="medium"
          required
          isDisabled={Boolean(isDisabled)}
        />
      </Grid>
      <Grid item lg={4}>
        <TimePickerForm
          control={control}
          error={errors?.[index]?.date}
          id={`followUps.${[index]}.date`}
          label="Schedule date & time"
          isDisabled={isDisabled}
        />
      </Grid>
      <Grid item lg={4}>
        <TextFormField
          control={control}
          id={`followUps.${[index]}.notes`}
          error={errors?.[index]?.notes}
          size="medium"
          label="Notes"
          multiline
          rows={3}
          isDisabled={isDisabled}
        />
      </Grid>
    </Grid>
  );
}
