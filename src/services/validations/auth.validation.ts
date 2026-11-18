import * as yup from "yup";


export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Please enter your full name.")
    .min(3, "Name must contain at least 3 characters.")
    .matches(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "Name can contain only letters and spaces.",
    ),
  email: yup
    .string()
    .trim()
    .required("Please enter your email address.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address.",
    ),
  phone: yup
    .string()
    .trim()
    .required("Please enter your phone number.")
    .matches(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Indian phone number."),
  password: yup
    .string()
    .required("Please enter your password.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.",
    ),
  confirm_password: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Passwords do not match."),
  terms: yup
  .boolean()
  .required("Please accept the terms and conditions.")
  .oneOf([true], "Please accept the terms and conditions."),
});

export type SignupValues = yup.InferType<typeof registerSchema>;

export const loginSchema = yup.object({
  email_or_phone: yup
    .string()
    .trim()
    .required("Please enter your email address.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address.",
    ),
  password: yup.string().required("Please enter your password."),
});

export type LoginValues = yup.InferType<typeof loginSchema>;

