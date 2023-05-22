import {
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/lib/api/constants";
import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("please enter your email in correct format.")
    .required("Please enter your email"),
  password: yup
    .string()
    .max(
      PASSWORD_MAX_LENGTH,
      `Your password must be less than ${PASSWORD_MAX_LENGTH} characters`
    )
    .min(
      PASSWORD_MIN_LENGTH,
      `Your password must be at least ${PASSWORD_MIN_LENGTH} characters`
    )
    .required("Please enter your password"),
});

export const signUpSchema = yup.object({
  name: yup
    .string()
    .min(
      NAME_MIN_LENGTH,
      `Your name must be at least ${NAME_MIN_LENGTH} characters`
    )
    .required("Please enter your name"),
  email: yup
    .string()
    .email("please enter your email in correct format.")
    .required("Please enter your email"),
  password: yup
    .string()
    .max(
      PASSWORD_MAX_LENGTH,
      `Your password must be less than ${PASSWORD_MAX_LENGTH} characters`
    )
    .min(
      PASSWORD_MIN_LENGTH,
      `Your password must be at least ${PASSWORD_MIN_LENGTH} characters`
    )
    .required("Please enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .max(
      PASSWORD_MAX_LENGTH,
      `Your confirm password must be less than ${PASSWORD_MAX_LENGTH} characters`
    )
    .min(
      PASSWORD_MIN_LENGTH,
      `Your confirm password must be at least ${PASSWORD_MIN_LENGTH} characters`
    )
    .required("Please enter your confirm password"),
});
