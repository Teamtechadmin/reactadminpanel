import { axiosInstance } from "@/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { FCM_ENDPOINT, REMOVE_FCM_ENDPOINT } from "./endpoints";
import { FCMBody } from "./types";

interface UpdateDealerProps {
  id: string;
  body: FCMBody;
}

interface RemoveFcmProps {
  id: string;
  body: {
    fcmToken: string;
  };
}

export const setFCM = (props: UpdateDealerProps) => {
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

export const removeFcm = (props: RemoveFcmProps) => {
  const { id, body } = props;
  return axiosInstance.post(`${REMOVE_FCM_ENDPOINT}/${id}`, body);
};

export const useRemoveFcm = () => {
  return useMutation({
    mutationFn: (props: RemoveFcmProps) => removeFcm(props),
  });
};
