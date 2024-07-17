import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { LiveAuctionLog } from "@/types/live/auctions";
import { numberToINR } from "@/utils/convert-to-rs";
import { handleRedirection } from "@/utils/handle-redirection";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

interface CellType {
  row: LiveAuctionLog;
}

export const useColumns = () => {
  const router = useRouter();
  const columns = [
    {
      flex: 0.0105,
      field: "id",
      minWidth: 100,
      headerName: "Dealership ID",
      headerClassName: "super-app-theme--header",
      renderCell: ({ row }: CellType) => {
        const { uniqueId, userId } = row;
        return (
          <ClickableTypography
            onClick={() => handleRedirection("dealers", userId, router)}
            name={uniqueId}
          />
        );
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
            onClick={() => handleRedirection("dealers", row.userId, router)}
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
