import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { LiveAuctionLog } from "@/types/live/auctions";
import { numberToINR } from "@/utils/convert-to-rs";
import { Typography } from "@mui/material";
import Countdown from "react-countdown";

interface CellType {
  row: LiveAuctionLog;
}

export const useColumns = () => {
  const columns = [
    {
      flex: 0.0105,
      field: "id",
      minWidth: 100,
      headerName: "Dealership ID",
      headerClassName: "super-app-theme--header",
      renderCell: ({ row }: CellType) => {
        const { dealershipID } = row;
        return <ClickableTypography name={dealershipID} />;
      },
    },
    {
      flex: 0.0105,
      field: "dealershipName",
      minWidth: 50,
      headerName: "Dealership Name",
      renderCell: ({ row }: CellType) => {
        return (
          <ClickableTypography name={row?.dealershipName}></ClickableTypography>
        );
      },
    },
    {
      flex: 0.0155,
      field: "phone",
      minWidth: 50,
      headerName: "Phone",
      renderCell: ({ row }: CellType) => {
        return <Typography>{row.phone}</Typography>;
      },
    },
    {
      flex: 0.0145,
      field: "location",
      minWidth: 50,
      headerName: "Location",
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{row.location}</Typography>;
      },
    },
    {
      flex: 0.0145,
      field: "currentBid",
      minWidth: 50,
      headerName: "Current Bid",
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{numberToINR(row.currentBid)}</Typography>;
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
      field: "bidType",
      minWidth: 50,
      headerName: "Bid Type",
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{row?.bidType}</Typography>;
      },
    },
  ];
  return columns;
};
