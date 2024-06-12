import { axiosInstance } from "@/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { UPDATE_LEAD } from "./types";
import { LeadUpdate } from "@/types/leads/patch/types";

interface UpdateEvalProps {
  id: string;
  body: LeadUpdate;
}

const updateLead = (props: UpdateEvalProps) => {
  const { id, body } = props;
  return axiosInstance.patch(`${UPDATE_LEAD}/${id}`, body);
};

export const useUpdateLead = () => {
  return useMutation({
    mutationFn: ({ id, body }: UpdateEvalProps) =>
      updateLead({
        id,
        body,
      }),
  });
};
