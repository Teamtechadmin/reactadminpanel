import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { LiveOtbLog } from "@/types/live/auctions";
import { numberToINR } from "@/utils/convert-to-rs";
import { handleRedirection } from "@/utils/handle-redirection";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

interface CellType {
  row: LiveOtbLog;
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
            name={uniqueId}
            onClick={() => {
              handleRedirection("dealers", userId, router);
            }}
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
        const userId = row?.userId ?? "";
        return (
          <ClickableTypography
            name={row?.fullname}
            onClick={() => {
              handleRedirection("dealers", userId, router);
            }}
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
        return <Typography>{row.district}</Typography>;
      },
    },
    {
      flex: 0.0145,
      field: "quote",
      minWidth: 50,
      headerName: "Quote Price",
      renderCell: ({ row }: CellType) => {
        return <Typography>{numberToINR(row.amount)}</Typography>;
      },
    },
  ];
  return columns;
};
