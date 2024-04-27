import * as yup from "yup";

export const useFormSchema = ({ minAmount }: { minAmount: number }) => {
  const schema = yup.object().shape({
    amount: yup
      .number()
      .required("Amount is required")
      .min(minAmount, "Should not be lesser than bidded price")
      .typeError("No decimal points, commas or special characters allowed"),
    startTime: yup.date().required("Starting Time is required"),
    endTime: yup
      .date()
      .required("Ending Time is required")
      .min(yup.ref("startTime"), "End Time must be after Start Time"),
  });

  return schema;
};
