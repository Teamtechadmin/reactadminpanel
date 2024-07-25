import CustomDialogue from "@/components/ui/dialogue/AuctionDailogue";
import { BillBody } from "../ui/BillBody";
import { BillHandleType, OtbLeaderBoardRow } from "@/types/results/type";
import { AuctionData } from "@/services/result/auction/types";

interface BillDialogueProps<T> {
  open: boolean;
  handleClose: () => void;
  data: T;
  type: BillHandleType;
  carID: string;
  isOtb?: boolean;
}

export function BillDialogue<T extends AuctionData | OtbLeaderBoardRow>(
  props: BillDialogueProps<T>,
) {
  const { open, handleClose, data, type, isOtb, carID } = props;
  const isView = type === "view";
  return (
    <CustomDialogue
      open={open}
      dailogueTitle={isView ? "View Bill" : "Bill Details"}
      ComponentContent={
        <BillBody
          data={data}
          handleClose={handleClose}
          isView={isView}
          isOtb={isOtb}
          carID={carID}
        />
      }
      handleClose={handleClose}
      icon="tabler:bill"
      titleWeight={600}
      titleFont={20}
      maxWidth="lg"
    />
  );
}
