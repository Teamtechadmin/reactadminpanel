import { axiosInstance } from "@/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { GET_EVALUATORS_ENDPOINT } from "../endpoints";
import { Evaluator } from "../list/types";

interface UpdateEvalProps {
  id: string;
  body: {
    isBlocked?: boolean;
  };
}

const updateEvaluator = (props: UpdateEvalProps) => {
  const { id, body } = props;
  return axiosInstance.patch(`${GET_EVALUATORS_ENDPOINT}/${id}`, body);
};

export const useUpdateEvaluator = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Evaluator }) =>
      updateEvaluator({
        id,
        body,
      }),
  });
};
