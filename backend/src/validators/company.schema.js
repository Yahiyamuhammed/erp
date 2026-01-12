import * as yup from "yup";

export const createCompanySchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Company name must be at least 3 characters")
    .max(100, "Company name must be less than 100 characters")
    .required("Company name is required"),

  code: yup
    .string()
    .trim()
    .uppercase()
    .min(3, "Company code must be at least 3 characters")
    .max(20, "Company code must be less than 20 characters")
    .required("Company code is required"),

  gstNo: yup.string().trim().nullable(),
});

export const updateCompanySchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Company name must be at least 3 characters")
    .max(100, "Company name must be less than 100 characters")
    .required("Company name is required"),
  code: yup
    .string()
    .trim()
    .uppercase()
    .min(3, "Company code must be at least 3 characters")
    .max(20, "Company code must be less than 20 characters")
    .required("Company code is required"),

  gstNo: yup.string().trim().nullable(),
  isActive: yup.boolean(),
});
