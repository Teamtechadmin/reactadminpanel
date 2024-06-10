import { ButtonIcon } from "@/components/ui/buttons/ButtonIcon";
import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { Box, Chip, Typography } from "@mui/material";

export type StatusType = "Deactivated" | "Active";

export type DocStatus = "NOTSUBMITTED" | "SUBMITTED";

interface RowType {
  status: StatusType;
  isDocumentsVerified: DocStatus;
  location: string;
  id: string;
  name: string;
  phone: string;
  date: Date;
}

type CellType = {
  row: RowType;
};

const statusColor = {
  Deactivated: "error",
  Active: "success",
};

function getStatusColor(status: StatusType) {
  return statusColor[status] as any;
}

export const disableStatus = ["VERIFIED", "NOTSUBMITTED"];

const useColumns = ({
  handleView,
  handleAssign,
}: {
  handleView: (id: string) => void;
  handleAssign: (id: string) => void;
}) => {
  const columns: any = [
    {
      flex: 0.012,
      field: "id",
      minWidth: 110,
      headerName: "Lead ID",
      headerClassName: "super-app-theme--header",
      renderCell: (row: RowType) => {
        const { id } = row;
        return <ClickableTypography name={id} />;
      },
    },
    {
      flex: 0.03,
      field: "date",
      minWidth: 120,
      headerName: "Date",
      renderCell: ({ row }: CellType) => {
        console.log(row);
        return <Typography>Date</Typography>;
      },
    },
    {
      flex: 0.03,
      field: "purpose",
      minWidth: 50,
      headerName: "Inspection Purpose",
      renderCell: ({ row }: any) => {
        const { contactNo } = row;
        return <Typography noWrap>{contactNo}</Typography>;
      },
    },
    {
      flex: 0.022,
      field: "brand",
      minWidth: 50,
      headerName: "Car Brand",
      renderCell: ({ row }: any) => {
        const { district } = row;
        return <Typography noWrap>{district}</Typography>;
      },
    },
    {
      flex: 0.022,
      field: "location",
      minWidth: 50,
      headerName: "Location",
      renderCell: ({ row }: any) => {
        const { district } = row;
        return <Typography noWrap>{district}</Typography>;
      },
    },
    {
      flex: 0.022,
      field: "phone",
      minWidth: 50,
      headerName: "Phone",
      renderCell: ({ row }: any) => {
        const { district } = row;
        return <Typography noWrap>{district}</Typography>;
      },
    },
    {
      flex: 0.025,
      field: "status",
      minWidth: 50,
      headerName: "Status",
      renderCell: ({ row }: any) => {
        const { isDeactivate } = row;
        const status = isDeactivate ? "Deactivated" : "Active";
        return (
          <Chip
            label={status}
            variant="outlined"
            color={getStatusColor(status)}
          />
        );
      },
    },
    {
      flex: 0.02,
      field: "action",
      minWidth: 30,
      headerName: "Actions",
      renderCell: ({ row }: any) => {
        const { id, isDocumentsVerified } = row;
        const disableVerify = disableStatus.includes(isDocumentsVerified);
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ButtonIcon
              icon="tabler:eye"
              title="View"
              onClick={() => handleView(id)}
            />
            <ButtonIcon
              icon="tabler:user-check"
              title="Verify"
              disabled={disableVerify}
              onClick={() => handleAssign(id)}
            />
          </Box>
        );
      },
    },
  ];

  return columns;
};

export default useColumns;
