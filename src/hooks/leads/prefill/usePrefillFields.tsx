import { LeadUpdate } from "@/types/leads/patch/types";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  data: LeadUpdate;
  setValue: UseFormSetValue<LeadUpdate>;
}

export default function usePrefillFields(props: Props) {
  const { data, setValue } = props;
  useEffect(() => {
    if (data) {
      setValue("address", data?.address);
      setValue("district", data?.district);
      setValue("expectedPrice", data?.expectedPrice);
      setValue("floodAffected", data?.floodAffected);
      setValue("initialCallDate", data?.initialCallDate);
      setValue("initialFollowUpNotes", data?.initialFollowUpNotes);
      setValue("landMark", data?.landMark);
      setValue("locationLink", data?.locationLink);
      setValue("owner", data?.relation === "owner" ? "yes" : "no");
      setValue("relation", data?.relation);
      setValue("pinCode", data?.pinCode);
      setValue("sellerName", data?.sellerName);
      setValue("sellingReason", data?.sellingReason);
      setValue("status", data?.status);
      setValue("teleCallerId", data?.teleCallerId);
    }
  }, [data, setValue]);
}
