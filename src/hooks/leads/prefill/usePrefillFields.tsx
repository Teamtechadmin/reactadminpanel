import { LeadUpdate } from "@/types/leads/patch/types";
import { SetStateAction, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  data: LeadUpdate;
  setValue: UseFormSetValue<LeadUpdate>;
  setRefresh: React.Dispatch<SetStateAction<number>>;
}

export default function usePrefillFields(props: Props) {
  const { data, setValue, setRefresh } = props;
  useEffect(() => {
    if (data) {
      setValue("address", data?.address);
      setValue("district", data?.city);
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
      setRefresh((refresh) => refresh + 1);
    }
  }, [data, setRefresh, setValue]);
}
