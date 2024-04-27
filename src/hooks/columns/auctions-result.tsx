import { AmountTypography } from "@/components/ui/containers/AmountTypography";
import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { getWinner } from "@/functions/results/get-winner";
import { LeaderBoard } from "@/services/result/auction/types";
import { ModalAction } from "@/views/auctions/modals/AuctionLogBody";
import { Box, Button, Typography } from "@mui/material";

interface AuctionResultColsProps {
  handleModal: (
    type: ModalAction,
    fullname: string,
    id: string,
    userId: string,
  ) => void;
  winner: string;
  leaderBoard: LeaderBoard[] | [object];
}

export default function useColumns(props: AuctionResultColsProps) {
  const { handleModal, winner, leaderBoard } = props;
  const winnerData = getWinner(leaderBoard as LeaderBoard[], winner);
  const isWinnerRejected = winner && winnerData?.isRejected;
  const columns = [
    {
      flex: 0.012,
      field: "dealerID",
      minWidth: 110,
      headerName: "Dealer ID",
      headerClassName: "super-app-theme--header",
      renderCell: ({ row }: any) => {
        const { userId } = row;

        return <ClickableTypography name={userId} />;
      },
    },
    {
      flex: 0.03,
      field: "name",
      minWidth: 120,
      headerName: "Dealer Name",
      renderCell: ({ row }: any) => {
        const { fullname } = row;
        return <ClickableTypography name={fullname ?? "-"} />;
      },
    },
    {
      flex: 0.03,
      field: "phone",
      minWidth: 50,
      headerName: "Phone",
      renderCell: ({ row }: any) => {
        const { contactNo } = row;
        return <Typography noWrap>{contactNo ?? "-"}</Typography>;
      },
    },
    {
      flex: 0.03,
      field: "currentBid",
      minWidth: 50,
      headerName: "Current Bid",
      renderCell: ({ row }: any) => {
        const { amount } = row;
        return <AmountTypography text={amount} />;
      },
    },
    {
      flex: 0.025,
      field: "action",
      minWidth: 100,
      headerName: "Actions",
      renderCell: ({ row }: any) => {
        const { isRejected, fullname, id, userId } = row;
        const isWinner = userId === winner;
        const disableChoose = !isWinnerRejected;

        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isWinner || isRejected ? (
              <Button
                onClick={() => handleModal("Reject", fullname, id, userId)}
                disabled={isRejected}
                variant={"contained"}
                color="error"
              >
                {isRejected ? "Rejected" : "Reject"}
              </Button>
            ) : (
              <Button
                onClick={() => handleModal("Choose", fullname, id, userId)}
                disabled={disableChoose}
                variant="contained"
                color="primary"
              >
                Choose
              </Button>
            )}
          </Box>
        );
      },
    },
  ];

  return columns;
}
