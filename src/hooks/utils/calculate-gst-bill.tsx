import { calculateBill } from "@/functions/results/calculate-bill";
import { BillForm } from "@/types/results/type";
import { useEffect, useState } from "react";

export type Calculations = {
  totalDue: number;
  gstFee: number;
  serviceFee: number;
} | null;

interface CalculateBillProps {
  values: BillForm;
}

export const useCalculateBill = (props: CalculateBillProps) => {
  const { values } = props;
  const [state, setState] = useState<Calculations>(null);

  useEffect(() => {
    const value = calculateBill(values);
    if (value) {
      setState(value);
    }
  }, [
    values?.additionalCharges,
    values?.gstRate,
    values?.parkingCharge,
    values?.rcDeposit,
    values?.serviceRate,
    values?.totalAmount,
    values?.transportationCharge,
  ]);

  return state;
};
