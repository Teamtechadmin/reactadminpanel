import { AmountTypography } from "@/components/ui/containers/AmountTypography";
import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { BillHandleType, OtbLeaderBoardRow } from "@/types/results/type";
import { handleRedirection } from "@/utils/handle-redirection";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

interface OtbResultColsProps {
  handleBill: (data: OtbLeaderBoardRow, type: BillHandleType) => void;
}

export default function useColumns(props: OtbResultColsProps) {
  const { handleBill } = props;
  const router = useRouter();
  const columns = [
    {
      flex: 0.012,
      field: "dealerID",
      minWidth: 110,
      headerName: "Dealer ID",
      headerClassName: "super-app-theme--header",
      renderCell: ({ row }: any) => {
        const { userId, uniqueId } = row;

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
      flex: 0.03,
      field: "name",
      minWidth: 120,
      headerName: "Dealer Name",
      renderCell: ({ row }: any) => {
        const { fullname, userId } = row;
        return (
          <ClickableTypography
            name={fullname ?? "-"}
            onClick={() => {
              handleRedirection("dealers", userId, router);
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
      flex: 0.03,
      field: "type",
      minWidth: 50,
      headerName: "Type",
      renderCell: () => {
        return <Typography>Quote</Typography>;
      },
    },
    {
      flex: 0.025,
      field: "action",
      minWidth: 100,
      headerName: "Actions",
      renderCell: ({ row }: { row: OtbLeaderBoardRow }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button onClick={() => handleBill(row, "give")} variant="contained">
              Give Bill
            </Button>
          </Box>
        );
      },
    },
  ];

  return columns;
}
