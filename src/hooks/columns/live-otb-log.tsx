import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { LiveOtbLog } from "@/types/live/auctions";
import { numberToINR } from "@/utils/convert-to-rs";
import { Typography } from "@mui/material";

interface CellType {
  row: LiveOtbLog;
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
      field: "quote",
      minWidth: 50,
      headerName: "Quote Price",
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{numberToINR(row.quote)}</Typography>;
      },
    },
  ];
  return columns;
};
