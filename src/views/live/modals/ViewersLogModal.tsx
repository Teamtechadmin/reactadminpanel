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
  const watchLength = log?.viewerList?.length ?? 0;
  return (
    <CustomDialogue
      ComponentContent={<ViewersLogModalBody type={type} data={log} />}
      CustomHeaderItem={<ViewersBadge watchCount={watchLength ?? 0} />}
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
