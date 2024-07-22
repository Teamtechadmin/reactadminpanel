import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { getWinner } from "@/functions/results/get-winner";
import { LeaderBoard } from "@/services/result/auction/types";
import { OtbLogProps } from "@/types/results/type";
import { formatToAmount } from "@/utils/convert-to-rs";
import { handleRedirection } from "@/utils/handle-redirection";
import { Box, Button, Chip, Typography } from "@mui/material";
import { useRouter } from "next/router";

type RowType = {
  id: string;
  _id: string;
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

type StatusType = "PENDING" | "NOBID";

interface OtbColumnProps {
  handleLog: ({ model, leaderBoard, id }: OtbLogProps) => void;
}

const status = {
  PENDING: "warning",
  NOBID: "error",
};

function getStatus(value: StatusType) {
  return status[value];
}

const useColumns = (props: OtbColumnProps) => {
  const { handleLog } = props;
  const router = useRouter();
  const columns = [
    {
      flex: 0.012,
      field: "id",
      minWidth: 110,
      headerName: "Car ID",
      renderCell: ({ row }: CellType) => {
        const { uniqueId, _id } = row;

        return (
          <ClickableTypography
            name={uniqueId}
            onClick={() => {
              handleRedirection("cars", _id, router);
            }}
          />
        );
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
        const dealerId = dealer?.userId ?? "";
        return (
          <ClickableTypography
            name={dealer?.uniqueId ?? "-"}
            onClick={() => {
              handleRedirection("dealers", dealerId, router);
            }}
          />
        );
      },
    },
    {
      flex: 0.05,
      field: "name",
      minWidth: 120,
      headerName: "Car Name",
      renderCell: ({ row }: CellType) => {
        const { model, _id } = row;

        return (
          <ClickableTypography
            name={model}
            onClick={() => {
              handleRedirection("cars", _id, router);
            }}
          />
        );
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
        const dealerId = dealer?.userId ?? "";
        return (
          <ClickableTypography
            name={dealer?.fullname ?? "-"}
            onClick={() => {
              handleRedirection("dealers", dealerId, router);
            }}
          />
        );
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
    {
      flex: 0.03,
      field: "action",
      minWidth: 240,
      headerName: "Actions",
      renderCell: ({ row }: CellType) => {
        const { model, status, leaderBoard, winner, _id } = row;
        const isNoBid = status === "NOBID";
        const disableLog = isNoBid;

        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              onClick={() =>
                handleLog({
                  model,
                  leaderBoard,
                  winner,
                  id: _id,
                })
              }
              variant="contained"
              disabled={disableLog}
            >
              OTB Log
            </Button>
          </Box>
        );
      },
    },
  ];

  return columns;
};

export default useColumns;
