import IconifyIcon from "@/components/ui/icon";
import TextFormField from "@/components/ui/inputfields/TextFormField";
import { BillForm } from "@/types/results/type";
import { Grid, IconButton } from "@mui/material";
import { Control, UseFieldArrayRemove } from "react-hook-form";

interface Props {
  control: Control<BillForm>;
  fields: any;
  remove: UseFieldArrayRemove;
}

export const BillCustomFields = (props: Props) => {
  const { control, fields, remove } = props;

  return fields?.map((field: { id: string }, index: number) => {
    return (
      <Grid key={field.id} display={"flex"} gap={1}>
        <Grid>
          <TextFormField
            control={control}
            id={`additionalCharges[${index}].name`}
            label="Charge Name"
            size="medium"
          />
        </Grid>
        <Grid>
          <TextFormField
            control={control}
            id={`additionalCharges[${index}].value`}
            label="Value"
            size="medium"
            InputProps={{
              startAdornment: <Grid mr={1}>₹</Grid>,
            }}
          />
        </Grid>
        <Grid>
          <TextFormField
            control={control}
            id={`additionalCharges[${index}].tax`}
            label="Tax"
            size="medium"
            InputProps={{
              endAdornment: <Grid mr={1}>%</Grid>,
            }}
          />
        </Grid>
        <Grid display={"flex"} alignItems={"center"}>
          <IconButton
            onClick={() => {
              remove(index);
            }}
          >
            <IconifyIcon icon={"tabler:x"} color="red" fontSize={"1rem"} />
          </IconButton>
        </Grid>
      </Grid>
    );
  });
};
