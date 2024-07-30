import { RC_DEPOSIT_AMT } from "@/functions/results/calculate-bill";
import { CustomCharge, LeaderBoard } from "@/services/result/auction/types";
import { BillForm } from "@/types/results/type";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

interface ExtendedData extends LeaderBoard {
  parkingCharges: number;
  transportation: number;
  discount: number;
  customCharger: CustomCharge[];
}

interface CalculateBillProps {
  setValue: UseFormSetValue<BillForm>;
  data?: ExtendedData;
}

export const usePrefillBill = (props: CalculateBillProps) => {
  const { setValue, data } = props;

  useEffect(() => {
    if (data) {
      console.log(data, "dataCheck");
      setValue("totalAmount", data?.finalPrice ?? data?.amount ?? 0);
      setValue("rcDeposit", RC_DEPOSIT_AMT);
      setValue("parkingCharge", Number(data?.parkingCharges ?? 0));
      setValue("transportationCharge", Number(data?.transportation ?? 0));
      setValue("discount", Number(data?.discount ?? 0));
      setValue(
        "additionalCharges",
        data?.customCharger?.map((item) => ({
          name: item.name,
          value: item.value,
          tax: item.gst,
        })),
      );
    }
  }, [setValue]);
};
