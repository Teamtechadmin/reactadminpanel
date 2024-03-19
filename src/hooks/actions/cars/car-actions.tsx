import { handleApproveQC } from "@/functions/cars/approve-qc";
import { handleRejectQC } from "@/functions/cars/reject-qc";
import { useUpdateCar } from "@/services/cars/update/patch";
import useCustomToast from "@/utils/toast";
import { useQueryClient } from "@tanstack/react-query";

const useCarActions = () => {
  const updateCar = useUpdateCar();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  function approveQC(id: string, isList?: boolean) {
    handleApproveQC({ handleSuccess, id, updateCar, isList });
  }

  function rejectQC(id: string) {
    handleRejectQC({ handleSuccess, id, updateCar });
  }

  function handleSuccess(successMessage: string, isList?: boolean) {
    toast.success(successMessage);
    queryClient.invalidateQueries({
      queryKey: [isList ? "car" : "cars"],
    });
  }

  return {
    approveQC,
    rejectQC,
    handleSuccess,
  };
};

export default useCarActions;
