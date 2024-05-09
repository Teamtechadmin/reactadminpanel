import { Dealer } from "@/types/customers/get";
import { numberToINR } from "@/utils/convert-to-rs";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

function getCustomerData(data: Dealer) {
  return [
    {
      label: "Name",
      value: data?.fullname,
    },
    {
      label: "Status",
      value: data?.isBlocked ? "Blocked" : "Active",
    },
    {
      label: "Document Status",
      value: data?.isDocumentsVerified ? "Verified" : "Not Verified",
    },
    {
      label: "Phone Number",
      value: data?.contactNo,
    },
    {
      label: "Business Name As per GSTIN",
      value: data?.businessName,
    },
    {
      label: "Business Address",
      value: data?.businessAddress,
    },
    {
      label: "Pincode",
      value: data?.pincode,
    },
    {
      label: "District, State",
      value: `${data?.district ?? ""}`,
    },
    {
      label: "Security Deposit",
      value: numberToINR(data?.depositedAmount),
    },
  ];
}

const CustomerDetails = ({ data }: { data: Dealer }) => {
  const customerData = getCustomerData(data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {customerData?.map((data) => {
            return (
              <TableRow key={data.label}>
                <TableCell component="th" scope="row">
                  {data.label}
                </TableCell>
                <TableCell>{data.value}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerDetails;
