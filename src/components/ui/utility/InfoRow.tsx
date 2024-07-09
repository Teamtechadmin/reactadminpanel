import { Grid, Typography } from "@mui/material";
import Countdown from "react-countdown";

export const InfoRow = ({
  label,
  value,
  index,
  isCounter,
}: {
  label: string;
  value: string;
  index: number;
  isCounter?: boolean;
}) => (
  <Grid
    display="flex"
    paddingY={1}
    justifyContent={index % 2 === 0 ? "start" : "end"}
  >
    <Typography fontWeight={600} marginRight={1}>
      {label}:
    </Typography>
    {isCounter ? (
      <Countdown
        date={Date.now() + Number(300000)}
        intervalDelay={1000}
        precision={0}
        renderer={({ hours, minutes, seconds }) => {
          const pad = (n: number) => String(n).padStart(2, "0");
          return (
            <Typography>{`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`}</Typography>
          );
        }}
      />
    ) : (
      <Typography>{value}</Typography>
    )}
  </Grid>
);
