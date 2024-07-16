import IconifyIcon from "@/components/ui/icon";
import { Grid, Typography } from "@mui/material";

interface Props {
  watchCount: number;
}

export const ViewersBadge = (props: Props) => {
  const { watchCount } = props;
  return (
    <Grid
      sx={{ backgroundColor: "#dfdfdf" }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={2}
      gap={1}
      padding={1}
    >
      <IconifyIcon icon={"tabler:eye"} color="GrayText" />
      <Typography align="right" color={"GrayText"}>
        People Watching ({watchCount ?? 0})
      </Typography>
    </Grid>
  );
};
