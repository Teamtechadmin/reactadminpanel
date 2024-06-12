import CustomDialogue from "@/components/ui/dialogue/AuctionDailogue";
import React, { SetStateAction } from "react";
import AssignEvaluatorDialogueBody from "./body/AssignEvaluatorDialogueBody";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  leadID: string;
}

export default function AssignEvaluatorDialogue(props: Props) {
  const { open, setOpen, leadID } = props;
  const handleClose = () => setOpen(!open);

  return (
    <CustomDialogue
      open={open}
      handleClose={handleClose}
      dailogueTitle="Add New Lead"
      icon="tabler:users-group"
      maxWidth="md"
      titleFont={18}
      ComponentContent={
        <AssignEvaluatorDialogueBody
          handleClose={handleClose}
          leadID={leadID}
        />
      }
      titleWeight={600}
      iconSize="1.25rem"
    />
  );
}
