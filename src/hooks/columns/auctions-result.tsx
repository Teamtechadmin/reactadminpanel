import { AmountTypography } from "@/components/ui/containers/AmountTypography";
import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { ModalAction } from "@/views/auctions/modals/AuctionLogBody";
import { Box, Button, Typography } from "@mui/material";

interface AuctionResultColsProps {
  handleModal: (type: ModalAction, fullname: string) => void;
}

export default function useColumns(props: AuctionResultColsProps) {
  const { handleModal } = props;
  const columns = [
    {
      flex: 0.012,
      field: "dealerID",
      minWidth: 110,
      headerName: "Dealer ID",
      headerClassName: "super-app-theme--header",
      renderCell: ({ row }: any) => {
        const { id } = row;

        return <ClickableTypography name={id} />;
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
      flex: 0.02,
      field: "action",
      minWidth: 230,
      headerName: "Actions",
      renderCell: ({ row }: any) => {
        const { isRejected, fullname } = row;
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              onClick={() => handleModal("Choose", fullname)}
              disabled={isRejected}
              variant="contained"
              color="primary"
            >
              Choose
            </Button>
            <Button
              onClick={() => handleModal("Reject", fullname)}
              disabled={isRejected}
              variant="contained"
              color="error"
            >
              Reject
            </Button>
          </Box>
        );
      },
    },
  ];

  return columns;
}
