import * as yup from "yup";

export const createCompanySchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Company name must be at least 3 characters")
    .max(100, "Company name cannot exceed 100 characters")
    .required("Company name is required"),

  code: yup
    .string()
    .trim()
    .uppercase()
    .min(3, "Company code must be at least 3 characters")
    .max(20, "Company code cannot exceed 20 characters")
    .matches(
      /^[A-Z0-9_-]+$/,
      "Company code can contain only letters, numbers, _ and -"
    )
    .required("Company code is required"),

  gstNo: yup
    .string()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .matches(/^[0-9A-Z]{15}$/, {
      message: "GST number must be 15 characters",
      excludeEmptyString: true,
    }),
});

export const updateCompanySchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Company name must be at least 3 characters")
    .max(100, "Company name cannot exceed 100 characters")
    .required("Company name is required"),

  gstNo: yup
    .string()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .matches(/^[0-9A-Z]{15}$/, {
      message: "GST number must be 15 characters",
      excludeEmptyString: true,
    }),

  isActive: yup.boolean(),
});
