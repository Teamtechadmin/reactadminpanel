import CustomDialogue from "@/components/ui/dialogue/AuctionDailogue";
import { AuctionData } from "@/services/result/auction/types";
import { BillBody } from "../ui/BillBody";
import { BillHandleType } from "@/types/results/type";

interface BillDialogueProps {
  open: boolean;
  handleClose: () => void;
  data: AuctionData | null;
  type: BillHandleType;
}

export const BillDialogue = (props: BillDialogueProps) => {
  const { open, handleClose, data, type } = props;
  const isView = type === "view";
  return (
    <CustomDialogue
      open={open}
      dailogueTitle={isView ? "View Bill" : "Bill Details"}
      ComponentContent={
        <BillBody data={data} handleClose={handleClose} isView={isView} />
      }
      handleClose={handleClose}
      icon="tabler:bill"
      titleWeight={600}
      titleFont={20}
      maxWidth="xs"
    />
  );
};
