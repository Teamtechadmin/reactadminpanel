import * as yup from "yup";

function useFormSchema() {
  const incrementedTime = new Date(new Date().getTime() + 1 * 60000);
  const schema = yup.object().shape({
    bidStartTime: yup
      .date()
      .required("Starting Time is required")
      .test(
        "is-incremented",
        "Start Time must be at least 1 minute in the future",
        (value) => new Date(value) >= incrementedTime,
      ),
    bidEndTime: yup
      .date()
      .required("Ending Time is required")
      .min(yup.ref("bidStartTime"), "End Time must be after Start Time")
      .test(
        "is-incremented",
        "End Time must be at least 1 minute in the future",
        (value) => new Date(value) >= incrementedTime,
      ),
    realValue: yup
      .number()
      .positive("Should be a positive number")
      .required("Fair Market Value is required")
      .nonNullable()
      .typeError("Fair Market Value is required"),
    highestBid: yup.number().typeError("Should be any number value"),
  });

  return schema;
}

export default useFormSchema;
