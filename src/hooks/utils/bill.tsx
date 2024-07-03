import { LeaderBoard } from "@/services/result/auction/types";
import { BillForm } from "@/types/results/type";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

interface CalculateBillProps {
  setValue: UseFormSetValue<BillForm>;
  data?: LeaderBoard;
}

export const usePrefillBill = (props: CalculateBillProps) => {
  const { setValue, data } = props;

  useEffect(() => {
    if (data) {
      setValue("totalAmount", data?.finalPrice ?? 0);
    }
  }, [setValue]);
};
