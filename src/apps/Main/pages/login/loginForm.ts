import { InputFormBase } from "../../../utils/InputForm";
import { ValidationType, InputType } from "../../../shared/types";

export const LoginForm = new InputFormBase(
  {
    email: {
      validation: [ValidationType.required, ValidationType.email],
      identifier: "email",
      type: InputType.text,
      valid: false,
      placeholder: "Email",
      value: "",
      error: { err: false, msg: "" },
    },
    password: {
      validation: [ValidationType.required, ValidationType.minLength8],
      identifier: "password",
      type: InputType.password,
      valid: false,
      placeholder: "Password",
      value: "",
      error: { err: false, msg: "" },
    },
  },
  "LoginForm"
);
