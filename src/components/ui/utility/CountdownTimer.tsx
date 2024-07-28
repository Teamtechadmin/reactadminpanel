import { LiveAuctionItem } from "@/services/live/auctions/list/types";
import { calculateRemainingTime } from "@/utils/calculate-remaining-time";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

interface Props {
  row: LiveAuctionItem;
  isAuction: boolean;
}

function CountdownTimer(props: Props) {
  const { row, isAuction } = props;
  const [refresh, setRefresh] = useState(0);
  const scheduledLabel = isAuction ? "SCHEDULED" : "OTB_SCHEDULED";
  const stoppedLabel = isAuction ? "STOPPED" : "OTB_STOPPED";
  const completedLabel = isAuction ? "COMPLETED" : "OTB_COMPLETED";
  const liveStatus = isAuction ? "LIVE" : "OTB";
  const isStopped = row?.status === stoppedLabel;
  const isCompleted = row?.status === completedLabel;
  const isScheduled = row.status === scheduledLabel;
  const startTime = Date.now() as any;
  const endTime = isScheduled ? row?.bidStartTime : row?.bidEndTime;
  const remainingTime =
    isStopped || isCompleted ? 0 : calculateRemainingTime(startTime, endTime);

  useEffect(() => {
    if (row?.status === liveStatus) {
      setRefresh(refresh + 1);
    }
  }, [row?.status]);

  return (
    <Typography key={`refresh_${refresh}`} noWrap>
      <Countdown
        date={startTime + remainingTime}
        intervalDelay={1000}
        precision={0}
        renderer={({ hours, minutes, seconds }) => {
          const pad = (n: number) => String(n).padStart(2, "0");
          return <div>{`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`}</div>;
        }}
      />
    </Typography>
  );
}

export default CountdownTimer;
