import SelectFormField from "@/components/ui/inputfields/SelectField";
import TextFormField from "@/components/ui/inputfields/TextFormField";
import TimePickerForm from "@/components/ui/inputfields/TimePickerForm";
import { renderMenuItems } from "@/components/ui/utility/MenuItem";
import { statuses } from "@/data/leads/status";
import { Grid } from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";

interface Props {
  control: Control<any>;
  errors: any;
}

export default function CustomerStatus(props: Props) {
  const { control, errors } = props;
  return (
    <Grid container display={"flex"} padding={2} gap={3}>
      <Grid item lg={4}>
        <SelectFormField
          control={control}
          id="status"
          label="Schedule Status"
          renderMenuItems={renderMenuItems}
          data={statuses ?? []}
          size="medium"
          required
        />
      </Grid>
      <Grid item lg={4}>
        <TimePickerForm
          control={control}
          error={errors?.initialCallDate}
          id="initialCallDate"
          label="Schedule date & time"
        />
      </Grid>
      <Grid item lg={4}>
        <TextFormField
          control={control}
          id="initialFollowUpNotes"
          error={errors?.initialFollowUpNotes}
          size="medium"
          label="Notes"
          multiline
          rows={3}
        />
      </Grid>
    </Grid>
  );
}
