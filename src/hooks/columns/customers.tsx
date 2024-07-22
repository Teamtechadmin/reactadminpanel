import { ButtonIcon } from "@/components/ui/buttons/ButtonIcon";
import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { handleRedirection } from "@/utils/handle-redirection";
import { Box, Chip, Typography } from "@mui/material";
import { useRouter } from "next/router";

export type StatusType = "Deactivated" | "Active";

export type DocStatus = "NOTSUBMITTED" | "SUBMITTED";

interface RowType {
  status: StatusType;
  isDocumentsVerified: DocStatus;
  location: string;
  id: string;
  name: string;
  phone: string;
}

type CellType = {
  row: RowType;
};

const statusColor = {
  Deactivated: "error",
  Active: "success",
};

const docColor = {
  SUBMITTED: "success",
  NOTSUBMITTED: "warning",
  VERIFIED: "success",
};

function getStatusColor(status: StatusType) {
  return statusColor[status] as any;
}

function getDocumentColor(documentStatus: DocStatus) {
  return docColor[documentStatus];
}

export const disableStatus = ["VERIFIED", "NOTSUBMITTED"];

const useColumns = ({
  handleView,
  handleVerify,
}: {
  handleView: (id: string) => void;
  handleVerify: (id: string) => void;
}) => {
  const router = useRouter();
  const columns: any = [
    {
      flex: 0.012,
      field: "id",
      minWidth: 110,
      headerName: "Dealer ID",
      headerClassName: "super-app-theme--header",
      renderCell: ({ row }: any) => {
        const { userId, id } = row;
        return (
          <ClickableTypography
            onClick={() => {
              handleRedirection("dealers", id, router);
            }}
            name={userId}
          />
        );
      },
    },
    {
      flex: 0.03,
      field: "name",
      minWidth: 120,
      headerName: "Customer Name",
      renderCell: ({ row }: any) => {
        const { fullname, id } = row;

        return (
          <ClickableTypography
            onClick={() => {
              handleRedirection("dealers", id, router);
            }}
            name={fullname}
          />
        );
      },
    },
    {
      flex: 0.03,
      field: "phone",
      minWidth: 50,
      headerName: "Phone No.",
      renderCell: ({ row }: any) => {
        const { contactNo } = row;
        return <Typography noWrap>{contactNo}</Typography>;
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
      flex: 0.026,
      field: "documents",
      minWidth: 50,
      headerName: "Documents",
      renderCell: ({ row }: CellType) => {
        return (
          <Chip
            label={row.isDocumentsVerified ?? "-"}
            variant="outlined"
            color={getDocumentColor(row.isDocumentsVerified) as any}
          />
        );
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
              icon="tabler:discount-check"
              title="Verify"
              disabled={disableVerify}
              onClick={() => handleVerify(id)}
            />
          </Box>
        );
      },
    },
  ];

  return columns;
};

export default useColumns;
