import { BillForm } from "@/types/results/type";
import { CalcProps } from "@/views/results/ui/BillSummary";

export const getBillCalculations = (
  values: BillForm,
  calculations?: CalcProps | null,
) => {
  const primaryCharges = [
    {
      label: "Bid Amount",
      amount: values?.totalAmount,
    },
    {
      label: "Refundable RC Deposit",
      amount: values?.rcDeposit,
    },
    {
      label: "TCS",
      amount: calculations?.tcs,
    },
    {
      label: "Service Rate",
      amount: values.serviceRate,
      isPercentage: true,
    },
    {
      label: "Service Fee",
      amount: calculations?.serviceFee,
    },
    {
      label: "GST on Service Fee",
      amount: calculations?.gstFee,
    },
    {
      label: "Parking Charges",
      amount: values.parkingCharge,
    },
    {
      label: "GST on Parking Charges",
      amount: calculations?.parkingGst,
    },
    {
      label: "Transportation Charges",
      amount: values.transportationCharge,
    },
    {
      label: "GST on Transportation Charges",
      amount: calculations?.transportationGst,
    },
  ];
  const additionalCharges = values?.additionalCharges?.flatMap(
    (charge, index) => {
      const taxAmount = calculations?.additionalChargeFees[index].taxFee;
      const amount = calculations?.additionalChargeFees[index].value;
      return [
        {
          label: charge.name,
          amount,
        },
        {
          label: `GST on ${charge.name}`,
          amount: taxAmount,
        },
      ];
    },
  );

  const totalCharges = [
    {
      label: "Total Discount",
      amount: values?.discount,
    },
    {
      label: "Total Amount",
      amount: calculations?.totalAmtDue,
      isHighlight: true,
    },
  ];

  return {
    additionalCharges,
    primaryCharges,
    totalCharges,
  };
};
