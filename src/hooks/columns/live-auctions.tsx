import { ButtonIcon } from "@/components/ui/buttons/ButtonIcon";
import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { ChipColorType } from "@/types/color/chipColor";
import { LiveAuction, LiveAuctionStatus } from "@/types/live/auctions";
import { numberToINR } from "@/utils/convert-to-rs";
import { formatDateAndTime } from "@/utils/format-date-and-time";
import { Box, Chip, Typography } from "@mui/material";
import Countdown from "react-countdown";

interface CellType {
  row: LiveAuction;
}

const statusColor = {
  LIVE: "success",
  COMPLETED: "info",
  STOPPED: "error",
  UPCOMING: "warning",
};

const getStatusColor = (status: LiveAuctionStatus) => {
  return statusColor[status] as ChipColorType;
};

const stopStatuses = ["UPCOMING", "LIVE"];

interface Props {
  handleLog: (item: LiveAuction) => void;
  handleStop: (id: string) => void;
}

export const useColumns = (props: Props) => {
  const { handleLog, handleStop } = props;
  const columns = [
    {
      flex: 0.0105,
      field: "id",
      minWidth: 100,
      headerName: "Auction ID",
      headerClassName: "super-app-theme--header",
      renderCell: ({ row }: CellType) => {
        const { auctionID } = row;
        return <ClickableTypography name={auctionID} />;
      },
    },
    {
      flex: 0.0105,
      field: "carID",
      minWidth: 50,
      headerName: "Car ID",
      renderCell: ({ row }: CellType) => {
        return <ClickableTypography name={row?.carID}></ClickableTypography>;
      },
    },
    {
      flex: 0.0155,
      field: "model",
      minWidth: 50,
      headerName: "Car Model",
      renderCell: ({ row }: CellType) => {
        return <ClickableTypography name={row?.model}></ClickableTypography>;
      },
    },
    {
      flex: 0.0145,
      field: "highestBid",
      minWidth: 50,
      headerName: "Highest Bid",
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{numberToINR(row?.highestBid)}</Typography>;
      },
    },
    {
      flex: 0.0225,
      field: "startTime",
      minWidth: 120,
      headerName: "Start Time",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography>{formatDateAndTime(new Date(row?.startTime))}</Typography>
        );
      },
    },

    {
      flex: 0.015,
      field: "timeRemaining",
      minWidth: 120,
      headerName: "Time Remaining",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap>
            <Countdown
              date={Date.now() + Number(row.remainingTime)}
              intervalDelay={1000}
              precision={0}
              renderer={({ hours, minutes, seconds }) => {
                const pad = (n: number) => String(n).padStart(2, "0");
                return (
                  <div>{`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`}</div>
                );
              }}
            />
          </Typography>
        );
      },
    },
    {
      flex: 0.0125,
      field: "totalBidders",
      minWidth: 50,
      headerName: "Total Bidders",
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{row?.totalBidders}</Typography>;
      },
    },
    {
      flex: 0.0145,
      field: "status",
      minWidth: 30,
      headerName: "Status",
      renderCell: ({ row }: CellType) => {
        const { status } = row;
        return (
          <Chip
            label={status}
            variant="outlined"
            color={getStatusColor(status as LiveAuctionStatus) ?? "info"}
          />
        );
      },
    },
    {
      flex: 0.0175,
      field: "action",
      minWidth: 30,
      headerName: "Actions",
      renderCell: ({ row }: CellType) => {
        const { status } = row;
        const isStoppable = stopStatuses.includes(status);
        const showLog = status !== "UPCOMING";
        const showBid = status === "LIVE";
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {showLog && (
              <ButtonIcon
                onClick={() => handleLog(row)}
                icon="tabler:article"
                title="Log"
              />
            )}
            {isStoppable && (
              <ButtonIcon
                onClick={() => handleStop(row.auctionID)}
                icon="tabler:ban"
                title="Stop Auction"
              />
            )}
            {showBid && <ButtonIcon icon="tabler:gavel" title="Bid" />}
            {showLog && <ButtonIcon icon="tabler:live-view" title="Viewers" />}
          </Box>
        );
      },
    },
  ];
  return columns;
};
