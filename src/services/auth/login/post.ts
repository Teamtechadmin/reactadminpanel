import { axiosInstance } from "@/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { LOGIN_ENDPOINT } from "../endpoints";
import { LoginType } from "../types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (values: LoginType) => {
      return axiosInstance.post(LOGIN_ENDPOINT, values);
    },
  });
};
