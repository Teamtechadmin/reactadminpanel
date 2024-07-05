import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { getWinner } from "@/functions/results/get-winner";
import { AuctionData, LogProps } from "@/services/result/auction/types";
import { Box, Button, Chip, Typography } from "@mui/material";

interface Props {
  handleLog: (props: LogProps) => void;
}

type CellType = {
  row: AuctionData;
};

type AuctionStatus = "DEAL_LOST" | "PROCUREMENT" | "NEGOTIATION";

const auctionStatus = {
  DEAL_LOST: {
    title: "DEAL LOST",
    color: "error",
  },
  PROCUREMENT: {
    title: "PROCUREMENT",
    color: "success",
  },
  NEGOTIATION: {
    title: "NEGOTIATION",
    color: "warning",
  },
};

function getAuctionStat(auctionStat: AuctionStatus) {
  return auctionStatus[auctionStat];
}

const useColumns = (props: Props) => {
  const { handleLog } = props;
  const columns = [
    {
      flex: 0.012,
      field: "id",
      minWidth: 110,
      headerName: "Dealer ID",
      headerClassName: "super-app-theme--header",
      renderCell: ({ row }: CellType) => {
        const { winner, leaderBoard } = row;
        const dealer = getWinner(leaderBoard, winner);
        return <ClickableTypography name={dealer?.userId ?? "-"} />;
      },
    },
    {
      flex: 0.025,
      field: "carID",
      minWidth: 120,
      headerName: "Car ID",
      renderCell: ({ row }: CellType) => {
        const { uniqueId } = row;

        return <ClickableTypography name={String(uniqueId) ?? "-"} />;
      },
    },
    {
      flex: 0.05,
      field: "dealer",
      minWidth: 200,
      headerName: "Dealer Name",
      renderCell: ({ row }: CellType) => {
        const { winner, leaderBoard } = row;
        const dealer = getWinner(leaderBoard, winner);
        return <Typography noWrap>{dealer?.fullname}</Typography>;
      },
    },
    {
      flex: 0.04,
      field: "phone",
      minWidth: 150,
      headerName: "Phone",
      renderCell: ({ row }: CellType) => {
        const { winner, leaderBoard } = row;
        const dealer = getWinner(leaderBoard, winner);
        return <Typography noWrap>{dealer?.contactNo ?? ""}</Typography>;
      },
    },
    {
      flex: 0.06,
      field: "model",
      minWidth: 250,
      headerName: "Car Model",
      renderCell: ({ row }: CellType) => {
        const { model } = row;
        return <Typography noWrap>{model}</Typography>;
      },
    },
    {
      flex: 0.026,
      field: "highest_bid",
      minWidth: 200,
      headerName: "Highest Bid",
      renderCell: ({ row }: CellType) => {
        const { winner, leaderBoard } = row;
        const dealer = getWinner(leaderBoard, winner);
        return <Typography>{dealer?.amount}</Typography>;
      },
    },
    {
      flex: 0.026,
      field: "status",
      minWidth: 250,
      headerName: "Status",
      renderCell: ({ row }: CellType) => {
        const chipData = getAuctionStat(row.status as any) as any;
        return (
          <Chip
            label={chipData?.title ?? "-"}
            variant="outlined"
            color={chipData?.color ?? "error"}
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
        const { model, _id, status, negotiation_status } = row;
        const isNoBid = status === "NOBID";
        const disableLog = isNoBid;
        const isGiveOffer = status === "NEGOTIATION";
        const isViewOffer = negotiation_status === "VIEW";

        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              onClick={() =>
                handleLog({
                  id: _id,
                  model,
                  type: "log",
                })
              }
              variant="contained"
              disabled={disableLog}
            >
              Bid Log
            </Button>
            {isGiveOffer && (
              <Button
                onClick={() =>
                  handleLog({
                    id: _id,
                    model,
                    type: "offer",
                  })
                }
                variant="contained"
                disabled={disableLog}
              >
                {isViewOffer ? "View Offer" : "Give Offer"}
              </Button>
            )}
          </Box>
        );
      },
    },
  ];

  return columns;
};

export default useColumns;
