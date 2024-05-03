import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { getWinner } from "@/functions/results/get-winner";
import { AuctionData } from "@/services/result/auction/types";
import { CarAuctionOtbHandleTypes } from "@/types/cars/car";
import { BillHandleType } from "@/types/results/type";
import { Box, Button, Chip, Typography } from "@mui/material";

interface Props {
  handleAuctionOtb: (carId: string, type: CarAuctionOtbHandleTypes) => void;
  handleRC: (id: string) => void;
  handleBill: (row: AuctionData, type: BillHandleType) => void;
}

type CellType = {
  row: AuctionData;
};

type AuctionStatus = "PROCUREMENT" | "NOBID" | "UNSOLD";

const auctionStatus = {
  PROCUREMENT: {
    title: "PROCUREMENT",
    color: "success",
  },
  UNSOLD: {
    title: "UNSOLD",
    color: "error",
  },
  NOBID: {
    title: "NO BID",
    color: "error",
  },
};

function getAuctionStat(auctionStat: AuctionStatus) {
  return auctionStatus[auctionStat];
}

const useColumns = (props: Props) => {
  const { handleAuctionOtb, handleRC, handleBill } = props;

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
      flex: 0.035,
      field: "action",
      minWidth: 260,
      headerName: "Actions",
      renderCell: ({ row }: CellType) => {
        const { _id, status, procurement_status } = row;
        const isProcured = status === "PROCUREMENT";
        const isUnsold = status === "UNSOLD";
        const isViewBill = procurement_status?.[0];

        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isUnsold && (
              <Button
                onClick={() => handleAuctionOtb(_id, "auction")}
                variant="contained"
              >
                Re-auction
              </Button>
            )}
            {isUnsold && (
              <Button
                onClick={() => handleAuctionOtb(_id, "otb")}
                variant="contained"
              >
                OTB
              </Button>
            )}
            {isProcured && (
              <Button onClick={() => handleRC(_id)} variant="contained">
                RC Transfer
              </Button>
            )}
            {isProcured && (
              <Button
                onClick={() => handleBill(row, isViewBill ? "view" : "give")}
                variant="contained"
              >
                {isViewBill ? "View Bill" : "Give Bill"}
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
