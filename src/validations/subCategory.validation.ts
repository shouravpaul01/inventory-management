import * as yup from "yup";


export const subCategoryValidation = yup.object().shape({
  name: yup.string().required("The field is required."),
  category: yup.string().required("The field is required."),
  code: yup
    .string()
    .trim()
    .required("The field is required.")
    .min(3, "Code must be at least 3 characters.")
    .max(6, "Code must be at most 6 characters."),
});

