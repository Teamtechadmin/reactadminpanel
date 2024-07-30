import IconifyIcon from "@/components/ui/icon";
import TextFormField from "@/components/ui/inputfields/TextFormField";
import { BillForm } from "@/types/results/type";
import { Grid, IconButton } from "@mui/material";
import { Control, UseFieldArrayRemove } from "react-hook-form";

interface Props {
  control: Control<BillForm>;
  fields: any;
  remove: UseFieldArrayRemove;
  isView: boolean;
}

export const BillCustomFields = (props: Props) => {
  const { control, fields, remove, isView } = props;

  return fields?.map((field: { id: string }, index: number) => {
    return (
      <Grid key={field.id} display={"flex"} gap={1}>
        <Grid>
          <TextFormField
            control={control}
            id={`additionalCharges[${index}].name`}
            label="Charge Name"
            size="medium"
            isDisabled={Boolean(isView)}
          />
        </Grid>
        <Grid>
          <TextFormField
            control={control}
            id={`additionalCharges[${index}].value`}
            label="Value"
            size="medium"
            type="number"
            isDisabled={Boolean(isView)}
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
            type="number"
            isDisabled={Boolean(isView)}
            size="medium"
            InputProps={{
              endAdornment: <Grid mr={1}>%</Grid>,
            }}
          />
        </Grid>
        {!isView && (
          <Grid display={"flex"} alignItems={"center"}>
            <IconButton
              onClick={() => {
                remove(index);
              }}
            >
              <IconifyIcon icon={"tabler:x"} color="red" fontSize={"1rem"} />
            </IconButton>
          </Grid>
        )}
      </Grid>
    );
  });
};
