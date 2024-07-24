import { BillForm } from "@/types/results/type";

export const RC_DEPOSIT_AMT = 5900;

export const calculateBill = (values?: BillForm) => {
  if (values) {
    const {
      totalAmount,
      serviceRate,
      parkingCharge,
      transportationCharge,
      additionalCharges,
    } = values;

    const bidAmt = Number(totalAmount ?? 0);
    const service = Number(serviceRate ?? 0);
    const parking = Number(parkingCharge ?? 0);
    const transportation = Number(transportationCharge ?? 0);
    const gst = 18;

    const serviceFee = (service / 100) * bidAmt;
    const gstFee = (gst / 100) * serviceFee;
    const totalDue = bidAmt + serviceFee + gstFee;
    const tcs = bidAmt > 1000000 ? (1 / 100) * bidAmt : 0;
    const parkingGst = (gst / 100) * parking;
    const transportationGst = (gst / 100) * transportation;

    console.log(additionalCharges, "additionalCharges");

    return {
      totalDue,
      gstFee,
      serviceFee,
      tcs,
      parkingGst,
      transportationGst,
    };
  }
};
