import CustomDialogue from "@/components/ui/dialogue/AuctionDailogue";
import { SetStateAction } from "react";
import { AuctionContent } from "./AuctionContent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormSchema from "@/hooks/schema/cars/approve-auction/schema";
import { ApproveCar } from "@/types/cars/approve";
import useUpdateCarById from "@/hooks/actions/cars/update-car";
import { useQueryClient } from "@tanstack/react-query";
import useCustomToast from "@/utils/toast";

interface AuctionDialogueProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  id: string;
  isList?: boolean;
}

const defaultValues = {
  startBidTime: new Date(),
  endBidTime: new Date(),
  realValue: 0,
};

function AuctionDialogue(props: AuctionDialogueProps) {
  const { open, setOpen, id, isList } = props;
  const schema = useFormSchema();
  const approveAuction = useUpdateCarById();
  const queryClient = useQueryClient();
  const toast = useCustomToast();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver<any>(schema),
  });

  function onSubmit(val: ApproveCar) {
    approveAuction({
      body: { ...val, status: "SCHEDULED" },
      id,
      handleSuccess: () => {
        toast.success("Auction Approved Successfully!!");
        handleClose();
        queryClient.invalidateQueries({
          queryKey: [isList ? "cars" : "car"],
        });
      },
    });
  }

  function handleClose() {
    setOpen(!open);
    reset();
  }

  return (
    <CustomDialogue
      open={open}
      dailogueTitle={"Ready for Auction?"}
      handleClose={handleClose}
      icon="tabler:gavel"
      maxWidth={"xs"}
      titleFont={18}
      titleWeight={600}
      iconSize="1.5rem"
      ComponentContent={
        <form onSubmit={handleSubmit(onSubmit)}>
          <AuctionContent
            handleCancel={handleClose}
            control={control}
            errors={errors as any}
          />
        </form>
      }
    />
  );
}

export default AuctionDialogue;
