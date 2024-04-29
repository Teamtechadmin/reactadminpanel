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
import { CarAuctionOtbHandleTypes } from "@/types/cars/car";

interface AuctionDialogueProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  id: string;
  modal: CarAuctionOtbHandleTypes;
  isList?: boolean;
}

const defaultValues = {
  bidStartTime: new Date(),
  bidEndTime: new Date(),
  realValue: 0,
};

function AuctionDialogue(props: AuctionDialogueProps) {
  const { open, setOpen, id, modal, isList } = props;
  const isAuction = modal === "auction";
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
    const auctionBody = { ...val, status: "SCHEDULED" };
    const otbBody = {
      otbStartTime: String(val.startBidTime),
      otbEndTime: String(val.endBidTime),
      realValue: val.realValue,
      status: "OTB",
    };
    approveAuction({
      body: isAuction ? auctionBody : otbBody,
      id,
      handleSuccess: () => {
        toast.success(
          isAuction
            ? "Auction Approved Successfully!!"
            : "Moved To Otb Successfully",
        );
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
      dailogueTitle={isAuction ? "Ready for Auction?" : "Move To OTB?"}
      handleClose={handleClose}
      icon={isAuction ? "tabler:gavel" : "tabler:credit-card-pay"}
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
            isAuction={isAuction}
          />
        </form>
      }
    />
  );
}

export default AuctionDialogue;
