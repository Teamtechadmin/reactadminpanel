import { axiosInstance } from "@/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { FCM_ENDPOINT } from "./endpoints";
import { FCMBody } from "./types";

interface UpdateDealerProps {
  id: string;
  body: FCMBody;
}

const setFCM = (props: UpdateDealerProps) => {
  const { id, body } = props;
  return axiosInstance.post(`${FCM_ENDPOINT}/${id}`, body);
};

export const useSetFCM = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: FCMBody }) =>
      setFCM({
        id,
        body,
      }),
  });
};
