import * as yup from "yup";

export const createFacultyValidation = yup.object({
  name: yup.string().required("Name is required."),
  roomNo: yup
    .number()
    .required("Room No is required.")
    .typeError("Room No must be a number.")
    .integer("Room No must be an integer.")
    .positive("Room No must be a positive number."),

  designation: yup.string().required("Designation is required."),
  email: yup.string().required("Email is required."),
});
