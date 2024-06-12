import DatePickerForm from "@/components/ui/inputfields/DatePicker";
import SelectFormField from "@/components/ui/inputfields/SelectField";
import TextFormField from "@/components/ui/inputfields/TextFormField";
import { renderMenuItems } from "@/components/ui/utility/MenuItem";
import { districts } from "@/data/leads/districts";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import { Control } from "react-hook-form";

interface Props {
  control: Control<any>;
  errors: any;
}

const options = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
];

export default function CallInfoForm(props: Props) {
  const { control, errors } = props;
  const [show, setShow] = useState(false);
  return (
    <Grid container display={"flex"} padding={2} gap={3}>
      <Grid item lg={3.75}>
        <TextFormField
          control={control}
          id="sellerName"
          label="Car Seller Name"
          error={errors?.sellerName as any}
          size="medium"
          required
        />
      </Grid>
      <Grid item lg={3.75}>
        <SelectFormField
          control={control}
          id="owner"
          label="Owner"
          size="medium"
          renderMenuItems={renderMenuItems}
          data={options ?? []}
          error={errors?.owner}
          required
          handleOnChange={(e) => {
            const isNo = e.target.value === "no";
            setShow(Boolean(isNo));
          }}
        />
      </Grid>
      {show && (
        <Grid item lg={3.75}>
          <TextFormField
            control={control}
            id="relation"
            label="Relation"
            error={errors?.relation as any}
            size="medium"
          />
        </Grid>
      )}
      <Grid item lg={3.75}>
        <SelectFormField
          control={control}
          id="district"
          label="District"
          size="medium"
          renderMenuItems={renderMenuItems}
          data={districts ?? []}
          error={errors?.make}
        />
      </Grid>
      <Grid item lg={3.75}>
        <TextFormField
          id="pinCode"
          size="medium"
          control={control}
          error={errors?.pinCode as any}
          label="Pincode"
        />
      </Grid>
      <Grid item lg={3.75}>
        <TextFormField
          id="locationLink"
          size="medium"
          control={control}
          error={errors?.locationLink as any}
          label="Location Link"
        />
      </Grid>
      <Grid item lg={3.75}>
        <TextFormField
          id="address"
          size="medium"
          control={control}
          error={errors?.address as any}
          label="Address"
          multiline
          rows={3}
        />
      </Grid>
      <Grid item lg={3.75}>
        <TextFormField
          id="landMark"
          size="medium"
          control={control}
          error={errors?.landMark as any}
          label="Land Mark"
          multiline
          rows={3}
        />
      </Grid>
      <Grid item lg={3.75}>
        <TextFormField
          id="sellingReason"
          size="medium"
          control={control}
          error={errors?.sellingReason as any}
          label="Reasons for Selling"
          multiline
          rows={3}
        />
      </Grid>
      <Grid item lg={3.75}>
        <SelectFormField
          control={control}
          id="floodAffected"
          label="Flood Affected"
          size="medium"
          renderMenuItems={renderMenuItems}
          data={options ?? []}
          error={errors?.floodAffected}
          required
        />
      </Grid>
      <Grid item lg={3.75}>
        <TextFormField
          id="expectedPrice"
          size="medium"
          control={control}
          error={errors?.expectedPrice as any}
          label="Expected Price"
          required
          type="number"
        />
      </Grid>
      <Grid item lg={3.75}>
        <DatePickerForm
          control={control}
          id="initialCallDate"
          error={errors?.initialCallDate}
          minDate={new Date()}
          label="Initial Call Date"
          size="medium"
        />
      </Grid>
      <Grid item lg={3.75}>
        <TextFormField
          control={control}
          id="teleCallerId"
          error={errors?.teleCallerId}
          size="medium"
          label="Called By"
        />
      </Grid>
    </Grid>
  );
}
