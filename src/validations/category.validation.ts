import * as yup from "yup";


export const categoryValidation = yup.object().shape({
  name: yup.string().required("Name is required."),
  code: yup
    .string()
    .trim()
    .required("Code is required.")
    .min(3, "Code must be at least 3 characters.")
    .max(6, "Code must be at most 6 characters."),
});



 