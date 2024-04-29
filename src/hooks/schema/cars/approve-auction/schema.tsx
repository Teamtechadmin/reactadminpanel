import * as yup from "yup";

function useFormSchema() {
  const schema = yup.object().shape({
    bidStartTime: yup.date().required("Starting Time is required"),
    bidEndTime: yup
      .date()
      .required("Ending Time is required")
      .min(yup.ref("bidStartTime"), "End Time must be after Start Time"),
    realValue: yup
      .number()
      .positive("Should be a positive number")
      .required("Fair Market Value is required")
      .nonNullable()
      .typeError("Fair Market Value is required"),
  });

  return schema;
}

export default useFormSchema;
