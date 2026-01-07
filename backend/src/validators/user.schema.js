import * as yup from "yup";

export const createUserSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .required(),
  email: yup
    .string()
    .email("Invalid email")
    .max(100)
    .required(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required(),
  roleId: yup.string().required(),
});

export const updateUserSchema = yup.object({
  name: yup.string().min(3).max(50),
  email: yup.string().email().max(100),
  password: yup.string().min(6),
  roleId: yup.string(),
});
