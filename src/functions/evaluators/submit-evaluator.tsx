import { EvaluatorsCreateResponseData } from "@/services/evaluators/create/types";
import { EvaluatorAddFormType } from "@/types/evaluators/formTypes";

interface EvaluatorSubmitProps {
  isEdit: boolean;
  value: EvaluatorAddFormType;
  handleSuccess: (res: EvaluatorsCreateResponseData, isEdit: boolean) => void;
  add: any;
  update: any;
  id?: string;
}
const evaluatorSubmit = (props: EvaluatorSubmitProps) => {
  const { isEdit, value, add, update, handleSuccess, id } = props;
  const body = {
    ...value,
    role: "EVALUATOR",
  };
  const mutationBody = isEdit ? { id, body } : body;
  const mutationFn = isEdit ? update : add;
  mutationFn.mutate(mutationBody, {
    onSuccess: (res: { data: { data: EvaluatorsCreateResponseData[] } }) =>
      handleSuccess(res.data.data?.[0], isEdit),
  });
};

export default evaluatorSubmit;
