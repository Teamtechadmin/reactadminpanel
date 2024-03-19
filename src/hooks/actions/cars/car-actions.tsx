import { handleApproveQC } from "@/functions/cars/approve-qc";
import { handleRejectQC } from "@/functions/cars/reject-qc";
import { useUpdateCar } from "@/services/cars/update/patch";
import useCustomToast from "@/utils/toast";
import { useQueryClient } from "@tanstack/react-query";

interface CarActionsProps {
  id: string;
}

const useCarActions = (props: CarActionsProps) => {
  const { id } = props;
  const updateCar = useUpdateCar();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  function approveQC() {
    handleApproveQC({ handleSuccess, id, updateCar });
  }

  function rejectQC() {
    handleRejectQC({ handleSuccess, id, updateCar });
  }

  function handleSuccess(successMessage: string) {
    toast.success(successMessage);
    queryClient.invalidateQueries({
      queryKey: ["car"],
    });
  }

  return {
    approveQC,
    rejectQC,
    handleSuccess,
  };
};

export default useCarActions;
