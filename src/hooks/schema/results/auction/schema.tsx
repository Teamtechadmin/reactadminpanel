import * as yup from "yup";

export const useFormSchema = ({ minAmount }: { minAmount: number }) => {
  const incrementedTime = new Date(new Date().getTime() + 1 * 60000);
  const schema = yup.object().shape({
    amount: yup
      .number()
      .required("Amount is required")
      .min(minAmount, "Should not be lesser than bidded price")
      .typeError("No decimal points, commas or special characters allowed"),
    startTime: yup
      .date()
      .required("Starting Time is required")
      .test(
        "is-incremented",
        "Start Time must be at least 1 minute in the future",
        (value) => new Date(value) >= incrementedTime,
      ),
    endTime: yup
      .date()
      .required("Ending Time is required")
      .min(yup.ref("startTime"), "End Time must be after Start Time")
      .test(
        "is-incremented",
        "End Time must be at least 1 minute in the future",
        (value) => new Date(value) >= incrementedTime,
      ),
  });

  return schema;
};
