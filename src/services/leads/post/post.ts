import { axiosInstance } from "@/axios/axiosInstance";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { CREATE_LEAD } from "./endpoints";
import { LeadBody } from "./types";

export const useAddLeads = (): UseMutationResult<
  AxiosResponse<any>,
  unknown,
  LeadBody,
  unknown
> => {
  return useMutation({
    mutationFn: (values: LeadBody) => {
      return axiosInstance.post(CREATE_LEAD, values);
    },
  });
};
