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
import { removeSecondsFromDateTime } from "@/utils/remove-seconds-from-date";

interface AuctionDialogueProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  id: string;
  modal: CarAuctionOtbHandleTypes;
  isList?: boolean;
  isResult?: boolean;
}

const defaultValues = {
  bidStartTime: new Date(),
  bidEndTime: new Date(),
  realValue: 0,
};

function AuctionDialogue(props: AuctionDialogueProps) {
  const { open, setOpen, id, modal, isList, isResult } = props;
  const isAuction = modal === "auction";
  const schema = useFormSchema();
  const { updateCar: approveAuction, isPending } = useUpdateCarById();
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

  const queryKey = isList ? ["cars"] : isResult ? ["auction-result"] : ["car"];

  function onSubmit(val: ApproveCar) {
    const auctionBody = {
      bidEndTime: removeSecondsFromDateTime(val.bidEndTime),
      bidStartTime: removeSecondsFromDateTime(val.bidStartTime),
      realValue: val.realValue,
      status: "SCHEDULED",
    };
    const otbBody = {
      otbStartTime: removeSecondsFromDateTime(val.bidStartTime),
      otbEndTime: removeSecondsFromDateTime(val.bidEndTime),
      realValue: val.realValue,
      status: "OTB_SCHEDULED",
    };
    approveAuction({
      body: isAuction ? auctionBody : otbBody,
      id,
      handleSuccess: () => {
        queryClient.invalidateQueries({
          queryKey,
        });
        toast.success(
          isAuction
            ? "Auction Approved Successfully!!"
            : "Moved To Otb Successfully",
        );
        handleClose();
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
            isLoading={isPending}
          />
        </form>
      }
    />
  );
}

export default AuctionDialogue;
