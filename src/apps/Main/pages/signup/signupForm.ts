import { InputFormBase } from "../../../utils/InputForm";
import { ValidationType, InputType } from "../../../shared/types";

export const SignupForm = new InputFormBase(
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
    userName: {
      validation: [ValidationType.required, ValidationType.minLength8],
      identifier: "userName",
      type: InputType.text,
      valid: false,
      placeholder: "User Name",
      value: "",
      error: { err: false, msg: "" },
    },
  },
  "SignupForm"
);
