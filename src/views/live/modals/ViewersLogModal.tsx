import CustomDialogue from "@/components/ui/dialogue/AuctionDailogue";
import { LiveTabTypes } from "@/types/live/auctions";
import ViewersLogModalBody from "./ViewersLogModalBody";
import { ViewersBadge } from "./bagdge/ViewersBadge";

interface Props {
  openLog: boolean;
  handleClose: () => void;
  type: LiveTabTypes;
  log: any;
}

export const ViewersLogModal = (props: Props) => {
  const { handleClose, openLog, log, type } = props;
  const dailogueTitle = `${log?.model}`;
  return (
    <CustomDialogue
      ComponentContent={<ViewersLogModalBody type={type} />}
      CustomHeaderItem={<ViewersBadge />}
      dailogueTitle={dailogueTitle}
      handleClose={handleClose}
      icon=""
      maxWidth="md"
      open={openLog}
      titleFont={20}
      titleWeight={600}
    />
  );
};
