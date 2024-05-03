import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { getWinner } from "@/functions/results/get-winner";
import { LeaderBoard } from "@/services/result/auction/types";
import { formatToAmount } from "@/utils/convert-to-rs";
import { Chip, Typography } from "@mui/material";

type RowType = {
  id: string;
  uniqueId: string;
  customerId: string;
  model: string;
  customer: string;
  phone: number;
  otb: number;
  status: StatusType;
  winner: string;
  leaderBoard: LeaderBoard[];
  highestBid: string;
};

type CellType = {
  row: RowType;
};

type StatusType = "PENDING";

const status = {
  PENDING: "warning",
};

function getStatus(value: StatusType) {
  return status[value];
}

const useColumns = () => {
  const columns = [
    {
      flex: 0.012,
      field: "id",
      minWidth: 110,
      headerName: "Car ID",
      renderCell: ({ row }: CellType) => {
        const { uniqueId } = row;

        return <ClickableTypography name={uniqueId} />;
      },
    },
    {
      flex: 0.012,
      field: "customerId",
      minWidth: 110,
      headerName: "Customer ID",
      renderCell: ({ row }: CellType) => {
        const { leaderBoard, winner } = row;
        const dealer = getWinner(leaderBoard, winner);

        return <ClickableTypography name={dealer?.userId ?? "-"} />;
      },
    },
    {
      flex: 0.05,
      field: "name",
      minWidth: 120,
      headerName: "Car Name",
      renderCell: ({ row }: CellType) => {
        const { model } = row;

        return <ClickableTypography name={model} />;
      },
    },
    {
      flex: 0.03,
      field: "customerName",
      minWidth: 120,
      headerName: "Customer Name",
      renderCell: ({ row }: CellType) => {
        const { leaderBoard, winner } = row;
        const dealer = getWinner(leaderBoard, winner);

        return <ClickableTypography name={dealer?.fullname ?? "-"} />;
      },
    },
    {
      flex: 0.03,
      field: "phone",
      minWidth: 50,
      headerName: "Phone",
      renderCell: ({ row }: CellType) => {
        const { leaderBoard, winner } = row;
        const dealer = getWinner(leaderBoard, winner);
        return <Typography noWrap>{dealer?.contactNo}</Typography>;
      },
    },
    {
      flex: 0.026,
      field: "otb",
      minWidth: 50,
      headerName: "OTB Price",
      renderCell: ({ row }: CellType) => {
        const { highestBid } = row;
        return <Typography noWrap>{formatToAmount(highestBid)}</Typography>;
      },
    },
    {
      flex: 0.026,
      field: "status",
      minWidth: 50,
      headerName: "Status",
      renderCell: ({ row }: CellType) => {
        return (
          <Chip
            label={row.status}
            variant="outlined"
            color={getStatus(row.status) as any}
          />
        );
      },
    },
  ];

  return columns;
};

export default useColumns;
