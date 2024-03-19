import { UpdateCarProps } from "@/services/cars/update/type";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface RejectQCProps {
  id: string;
  handleSuccess: (message: string) => void;
  updateCar: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    UpdateCarProps,
    unknown
  >;
}

export const handleRejectQC = (props: RejectQCProps) => {
  const { id, handleSuccess, updateCar } = props;
  updateCar.mutate(
    {
      body: {
        qcStatus: "REJECTED",
      },
      id,
    },
    {
      onSuccess: () => handleSuccess("QC Rejected Successfully"),
    },
  );
};
