import { useUpdateCar } from "@/services/cars/update/patch";
import { UpdateCarDataBody } from "@/services/cars/update/type";
import { errorMessageParser } from "@/utils/error";
import useCustomToast from "@/utils/toast";

interface ApproveAuctions {
  body: UpdateCarDataBody;
  id: string;
  handleSuccess?: () => void;
}

const useUpdateCarById = () => {
  const update = useUpdateCar();
  const toast = useCustomToast();

  function updateCar(props: ApproveAuctions) {
    const { body, id, handleSuccess } = props;
    update.mutate(
      {
        body,
        id,
      },
      {
        onSuccess: () => handleSuccess && handleSuccess(),
        onError: (err) => toast.error(errorMessageParser(err)),
      },
    );
  }

  return updateCar;
};

export default useUpdateCarById;
