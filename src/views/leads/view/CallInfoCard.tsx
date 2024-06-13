import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import CallInfoForm from "./CallInfoForm";
import { Control } from "react-hook-form";

interface Props {
  control: Control<any>;
  errors: any;
  owner: string;
}

export default function CallInfoCard(props: Props) {
  const { control, errors, owner } = props;
  return (
    <Grid>
      <Grid
        paddingX={3}
        paddingY={2}
        display={"flex"}
        flexDirection={"column"}
        gap={1}
      >
        <Typography fontWeight={600} fontSize={18}>
          Call Information
        </Typography>
        <Typography fontSize={12} color={"GrayText"}>
          Detailed obtained at the time of lead generation.
        </Typography>
      </Grid>
      <Divider />
      <Grid>
        <CallInfoForm control={control} errors={errors} owner={owner} />
      </Grid>
    </Grid>
  );
}
