import * as yup from "yup";

const defaultReqText = "This field is required.";

function useFormSchema() {
  const schema = yup.object().shape({
    sellerName: yup.string().required(defaultReqText),
    owner: yup.string().required(defaultReqText),
    floodAffected: yup.string().required(defaultReqText),
    expectedPrice: yup.string().required(defaultReqText),
    initialCallDate: yup.string().required(defaultReqText),
  });

  return schema;
}

export default useFormSchema;
