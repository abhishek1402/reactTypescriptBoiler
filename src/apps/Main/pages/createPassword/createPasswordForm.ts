import { InputFormBase } from "../../../utils/InputForm";
import { ValidationType, InputType } from "../../../shared/types";

export const CreatePasswordForm = new InputFormBase(
  {
    password: {
      validation: [ValidationType.required, ValidationType.minLength8],
      identifier: "password",
      type: InputType.password,
      valid: false,
      placeholder: "Password",
      value: "",
      error: { err: false, msg: "" },
    },
    rePassword: {
      validation: [ValidationType.required, ValidationType.minLength8],
      identifier: "rePassword",
      type: InputType.password,
      valid: false,
      placeholder: "Retype Password",
      value: "",
      error: { err: false, msg: "" },
    },
  },
  "CreatePasswordForm"
);
