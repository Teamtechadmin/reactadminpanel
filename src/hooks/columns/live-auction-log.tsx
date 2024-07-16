import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { LiveAuctionLog } from "@/types/live/auctions";
import { numberToINR } from "@/utils/convert-to-rs";
import { Typography } from "@mui/material";

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
        const { uniqueId } = row;
        return <ClickableTypography name={uniqueId} />;
      },
    },
    {
      flex: 0.015,
      field: "dealershipName",
      minWidth: 50,
      headerName: "Dealership Name",
      renderCell: ({ row }: CellType) => {
        return (
          <ClickableTypography
            name={row?.fullname ?? "-"}
          ></ClickableTypography>
        );
      },
    },
    {
      flex: 0.0155,
      field: "phone",
      minWidth: 50,
      headerName: "Phone",
      renderCell: ({ row }: CellType) => {
        return <Typography>{row.contactNo}</Typography>;
      },
    },
    {
      flex: 0.0145,
      field: "location",
      minWidth: 50,
      headerName: "Location",
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{row.district ?? "-"}</Typography>;
      },
    },
    {
      flex: 0.0145,
      field: "currentBid",
      minWidth: 50,
      headerName: "Current Bid",
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{numberToINR(row.amount)}</Typography>;
      },
    },
    {
      flex: 0.0125,
      field: "bidType",
      minWidth: 50,
      headerName: "Bid Type",
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{row?.type}</Typography>;
      },
    },
  ];
  return columns;
};
