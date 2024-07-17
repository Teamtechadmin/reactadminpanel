import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { ViewersAuctionLog } from "@/types/live/auctions";
import { handleRedirection } from "@/utils/handle-redirection";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

interface CellType {
  row: ViewersAuctionLog;
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
      flex: 0.0105,
      field: "dealershipName",
      minWidth: 50,
      headerName: "Dealership Name",
      renderCell: ({ row }: CellType) => {
        return (
          <ClickableTypography
            onClick={() => handleRedirection("dealers", row.userId, router)}
            name={row?.fullname}
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
        return <Typography noWrap>{row?.district}</Typography>;
      },
    },
  ];
  return columns;
};
