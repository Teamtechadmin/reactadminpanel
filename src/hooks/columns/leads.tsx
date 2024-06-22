import { ButtonIcon } from "@/components/ui/buttons/ButtonIcon";
import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { Lead, LeadStatus } from "@/services/leads/list/types";
import { formatDateAndTime } from "@/utils/format-date-and-time";
import { Box, Chip, Typography } from "@mui/material";

type CellType = {
  row: Lead;
};

type StatusColorType = {
  [key in LeadStatus]: string;
};

const statusColor: StatusColorType = {
  RESCHEDULING: "warning",
  EVOLUTIONCOMPLETED: "success",
  EVOLUTIONCONFIRMED: "info",
  EVOLUTIONEXPIRED: "secondary",
  EVOLUTIONSCHEDULED: "info",
  NONRESPONSIVE: "error",
  NOTCONTACTED: "error",
  "NOTCONTACTED,EVOLUTIONCONFIRMED,EVOLUTIONSCHEDULED,EVOLUTIONCOMPLETED,RESCHEDULING,NONRESPONSIVE,EVOLUTIONEXPIRED":
    "info",
};

const statusLabel: StatusColorType = {
  RESCHEDULING: "Rescheduling",
  EVOLUTIONCOMPLETED: "Evaluation Completed",
  EVOLUTIONCONFIRMED: "Evaluation Confirmed",
  EVOLUTIONEXPIRED: "Evaluation Expired",
  EVOLUTIONSCHEDULED: "Evaluation Scheduled",
  NONRESPONSIVE: "Non Responsive",
  NOTCONTACTED: "Not Contacted",
  "NOTCONTACTED,EVOLUTIONCONFIRMED,EVOLUTIONSCHEDULED,EVOLUTIONCOMPLETED,RESCHEDULING,NONRESPONSIVE,EVOLUTIONEXPIRED":
    "",
};

function getStatusColor(status: LeadStatus) {
  return (statusColor[status] as any) || "info";
}

const getStatusLabel = (value: LeadStatus) => statusLabel[value];

export const notDisableStatus = ["EVOLUTIONCONFIRMED", "NOTSUBMITTED"];

const useColumns = ({
  handleView,
  handleAssign,
}: {
  handleView: (row: Lead) => void;
  handleAssign: (row: Lead) => void;
}) => {
  const columns: any = [
    {
      flex: 0.0125,
      field: "id",
      minWidth: 120,
      headerName: "Lead ID",
      headerClassName: "super-app-theme--header",
      renderCell: ({ row }: CellType) => {
        const { leadId } = row;
        return <ClickableTypography name={leadId} />;
      },
    },
    {
      flex: 0.03,
      field: "date",
      minWidth: 120,
      headerName: "Date",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography>{formatDateAndTime(new Date(row?.createdAt))}</Typography>
        );
      },
    },
    {
      flex: 0.0175,
      field: "purpose",
      minWidth: 50,
      headerName: "Inspection Purpose",
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{row?.proposeOfInspection}</Typography>;
      },
    },
    {
      flex: 0.022,
      field: "brand",
      minWidth: 50,
      headerName: "Car Brand",
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{row?.make}</Typography>;
      },
    },
    {
      flex: 0.022,
      field: "location",
      minWidth: 50,
      headerName: "Location",
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{row?.city}</Typography>;
      },
    },
    {
      flex: 0.0185,
      field: "phone",
      minWidth: 50,
      headerName: "Phone",
      renderCell: ({ row }: CellType) => {
        const { sellerMobileNumber } = row;
        return <Typography noWrap>{sellerMobileNumber}</Typography>;
      },
    },
    {
      flex: 0.025,
      field: "status",
      minWidth: 50,
      headerName: "Status",
      renderCell: ({ row }: CellType) => {
        const { leadStatus } = row;
        return (
          leadStatus && (
            <Chip
              label={getStatusLabel(leadStatus)}
              variant="outlined"
              color={getStatusColor(leadStatus)}
            />
          )
        );
      },
    },
    {
      flex: 0.0175,
      field: "action",
      minWidth: 30,
      headerName: "Actions",
      renderCell: ({ row }: CellType) => {
        const { leadStatus } = row;
        const disableVerify = !notDisableStatus.includes(leadStatus);
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ButtonIcon
              icon="tabler:eye"
              title="View"
              onClick={() => handleView(row)}
            />
            <ButtonIcon
              icon="tabler:user-check"
              title="Assign"
              disabled={disableVerify}
              onClick={() => handleAssign(row)}
            />
          </Box>
        );
      },
    },
  ];

  return columns;
};

export default useColumns;
