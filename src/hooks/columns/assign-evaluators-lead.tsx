import { ButtonIcon } from "@/components/ui/buttons/ButtonIcon";
import { ClickableTypography } from "@/components/ui/containers/ClickableTypography";
import { EvaluatorData } from "@/services/leads/evaluators/list/types";
import { Box, Typography } from "@mui/material";

type CellType = {
  row: EvaluatorData;
};

const useColumns = ({
  handleAssign,
}: {
  handleAssign: (row: EvaluatorData) => void;
}) => {
  const columns: any = [
    {
      flex: 0.012,
      field: "id",
      minWidth: 110,
      headerName: "Evaluator ID",
      headerClassName: "super-app-theme--header",
      renderCell: ({ row }: CellType) => {
        const { userId } = row;
        return <ClickableTypography name={userId} />;
      },
    },
    {
      flex: 0.03,
      field: "fullname",
      minWidth: 120,
      headerName: "Name",
      renderCell: ({ row }: CellType) => {
        return <ClickableTypography name={row?.fullname} />;
      },
    },
    {
      flex: 0.02,
      field: "pendingEvaluatedCars",
      minWidth: 40,
      headerName: "Pending Valuations",
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{row?.pendingEvaluatedCars}</Typography>;
      },
    },
    {
      flex: 0.02,
      field: "completeEvaluatedCars",
      minWidth: 50,
      headerName: "Completed Valuations",
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{row?.completeEvaluatedCars}</Typography>;
      },
    },
    {
      flex: 0.025,
      field: "location",
      minWidth: 50,
      headerName: "Location",
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{row?.location}</Typography>;
      },
    },
    {
      flex: 0.022,
      field: "phone",
      minWidth: 50,
      headerName: "Phone",
      renderCell: ({ row }: CellType) => {
        const { contactNo } = row;
        return <Typography noWrap>{contactNo}</Typography>;
      },
    },
    {
      flex: 0.02,
      field: "action",
      minWidth: 30,
      headerName: "Actions",
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ButtonIcon
              icon="tabler:user-check"
              title="Assign"
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
