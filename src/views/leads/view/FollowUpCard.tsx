import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";
import FollowUp from "./FollowUp";

interface Props {
  control: Control<any>;
  errors: any;
  index: number;
  customHeading: string;
}

export default function FollowUpCard(props: Props) {
  const { control, errors, index, customHeading } = props;
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
          {customHeading ? customHeading : `Follow up ${index}`}
        </Typography>
        <Typography fontSize={12} color={"GrayText"}>
          Detailed obtained at the time of lead generation.
        </Typography>
      </Grid>
      <Divider />
      <Grid>
        <FollowUp index={index} control={control} errors={errors} />
      </Grid>
    </Grid>
  );
}
