import CustomDialogue from "@/components/ui/dialogue/AuctionDailogue";
import { AuctionData } from "@/services/result/auction/types";
import { BillBody } from "../ui/BillBody";

interface BillDialogueProps {
  open: boolean;
  handleClose: () => void;
  data: AuctionData | null;
}

export const BillDialogue = (props: BillDialogueProps) => {
  const { open, handleClose, data } = props;
  return (
    <CustomDialogue
      open={open}
      dailogueTitle="Bill Details"
      ComponentContent={<BillBody data={data} handleClose={handleClose} />}
      handleClose={handleClose}
      icon="tabler:bill"
      titleWeight={600}
      titleFont={20}
      maxWidth="xs"
    />
  );
};
