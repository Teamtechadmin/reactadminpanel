import { axiosInstance } from "@/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { ASSIGN_EVALUATORS } from "./endpoints";
import { AssignEvaluatorBody } from "./types";

interface Props {
  id: string;
  body: AssignEvaluatorBody;
}

const assignEvaluator = (props: Props) => {
  const { id, body } = props;
  return axiosInstance.patch(`${ASSIGN_EVALUATORS}/${id}`, body);
};

export const useAssignEvaluator = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: AssignEvaluatorBody }) =>
      assignEvaluator({
        id,
        body,
      }),
  });
};
