import * as yup from "yup";

function useFormSchema() {
  const incrementedTime = new Date(new Date().getTime() + 24 * 60 * 60000);
  const schema = yup.object().shape({
    dateAndTime: yup
      .date()
      .required("Date is required")
      .test(
        "is-incremented",
        "Date must be 24H in the future",
        (value) => new Date(value) >= incrementedTime,
      ),
    make: yup.string().required("This Field is Required"),
    rto: yup.string().required("This Field is Required"),
    year: yup.string().required("This Field is Required"),
    model: yup.string().required("This Field is Required"),
    fuelType: yup.string().required("This Field is Required"),
    transmission: yup.string().required("This Field is Required"),
    variant: yup.string().required("This Field is Required"),
    ownershipNumber: yup.string().required("This Field is Required"),
    odometerReading: yup.string().required("This Field is Required"),
    sellingPlan: yup.string().required("This Field is Required"),
    sellerMobileNumber: yup
      .string()
      .required("This Field is Required")
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
    source: yup.string().required("This Field is Required"),
    registrationNumber: yup.string().required("This Field is Required"),
    purpose: yup.string().required("This Field is Required"),
  });

  return schema;
}

export default useFormSchema;
