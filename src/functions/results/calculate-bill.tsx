import { BillForm } from "@/types/results/type";

export const calculateBill = (values?: BillForm) => {
  if (values) {
    const { totalAmount, gstRate, serviceRate } = values;

    const total = Number(totalAmount ?? 0);
    const service = Number(serviceRate ?? 0);
    const gst = Number(gstRate ?? 0);

    const serviceFee = (service / 100) * total;
    const gstFee = (gst / 100) * serviceFee;
    const totalDue = total + serviceFee + gstFee;
    return {
      totalDue,
      gstFee,
      serviceFee,
    };
  }
};
