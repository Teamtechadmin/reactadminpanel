import { BillForm } from "@/types/results/type";

export const RC_DEPOSIT_AMT = 5900;
export const TCS_PERCENT = 1;
export const GST_PERCENT = 18;

export const calculateBill = (values?: BillForm) => {
  if (values) {
    const {
      totalAmount,
      serviceRate,
      parkingCharge,
      transportationCharge,
      additionalCharges,
      discount,
    } = values;

    const bidAmt = Number(totalAmount ?? 0);
    const service = Number(serviceRate ?? 0);
    const parking = Number(parkingCharge ?? 0);
    const transportation = Number(transportationCharge ?? 0);
    const discountAmt = Number(discount ?? 0);

    const serviceFee = (service / 100) * bidAmt;
    const gstFee = (GST_PERCENT / 100) * serviceFee;
    const totalDue = bidAmt + serviceFee + gstFee;
    const tcs = bidAmt > 1000000 ? (TCS_PERCENT / 100) * bidAmt : 0;
    const parkingGst = (GST_PERCENT / 100) * parking;
    const transportationGst = (GST_PERCENT / 100) * transportation;

    // ADDITIONAL CUSTOM CHARGES
    let totalAdditionalValue = 0;
    let totalAdditionalTaxFee = 0;
    const additionalChargeFees = additionalCharges?.map((charge) => {
      const TAX_PERCENT = Number(charge.tax ?? 0);
      const CHARGE_VALUE = Number(charge.value ?? 0);
      const TAX_FEE = ((TAX_PERCENT / 100) * CHARGE_VALUE)?.toFixed(2);
      totalAdditionalValue += CHARGE_VALUE;
      totalAdditionalTaxFee += parseFloat(TAX_FEE);
      return {
        value: CHARGE_VALUE?.toFixed(2),
        taxFee: TAX_FEE,
      };
    });

    const totalAdditionalSum = totalAdditionalValue + totalAdditionalTaxFee;

    const totalSum =
      bidAmt +
      serviceFee +
      gstFee +
      RC_DEPOSIT_AMT +
      tcs +
      parking +
      parkingGst +
      transportation +
      transportationGst;

    const totalAmtDue = totalSum + totalAdditionalSum - discountAmt;

    return {
      totalDue,
      gstFee,
      serviceFee,
      tcs,
      parkingGst,
      transportationGst,
      additionalChargeFees,
      totalAmtDue,
    };
  }
};
