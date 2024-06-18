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
    if (data && data.initialCallDate) {
      const indexToDataMap: any = {
        0: {
          notes: data.initialFollowUpNotes,
          date: data.initialCallDate,
        },
        1: {
          notes: data.followUpNotes,
          date: data.followUpCallDate,
        },
        2: {
          notes: data.finalFollowUpNotes,
          date: data.finalCallDate,
        },
      };
      const subStatus = data?.subStatus;
      const followUps: any = subStatus?.map((item, index) => ({
        status: item,
        notes: indexToDataMap[index]?.notes,
        date: indexToDataMap[index]?.date,
      }));
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
      setValue("followUps", followUps);
      setRefresh((refresh) => refresh + 1);
    }
  }, [data, setRefresh, setValue]);
}
