import * as yup from "yup";

export const createUserSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .max(100, "Email must be less than 100 characters")
    .required("Email is required"),

  password: yup
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain one uppercase letter")
    .matches(/[0-9]/, "Password must contain one number")
    .required("Password is required"),
  roleId: yup.string().required("Role is required"),
});

export const updateUserSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .max(100, "Email must be less than 100 characters")
    .required("Email is required"),

  roleId: yup.string().required("Role is required"),
});
