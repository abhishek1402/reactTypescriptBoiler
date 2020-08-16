import { InputFormBase } from "../../utils/InputForm";

export enum InputType {
  select = "select",
  number = "number",
  text = "text",
  calendar = "calendar",
  textbox = "textbox",
  password = "password",
}
export enum ValidationType {
  required = "required",
  minLength8 = "minLength8",
  positive = "positive",
  email = "email",
}
export enum AlertType {
  ALERT_ERROR = "error",
  ALERT_SUCCESS = "success",
}
export interface IOptionsType {
  value: string | number;
  label: string;
}
export interface InputError {
  err: boolean;
  msg: string;
}
export interface IInput {
  valid?: boolean;
  type: InputType;
  validation?: ValidationType[];
  label?: string;
  value: string | number;
  options?: IOptionsType[];
  classes?: Array<string>;
  disabled?: boolean;
  placeholder?: string;
  dateSelected?: string;
  identifier: string;
  error: { err: boolean; msg: string };
  mandatory?: boolean;
}

export interface InputForm<T extends InputFormBase> {
  formName?: String;
  isFormValid: () => boolean;
  form: Record<string, IInput>;
  setInputValue: (
    setFormState: React.Dispatch<React.SetStateAction<T>>,
    prevFormState: T,
    identifier: string,
    value: number | string
  ) => void;
  setError: (
    setFormState: React.Dispatch<React.SetStateAction<T>>,
    prevFormState: T,
    identifier: string,
    errorMsg: string
  ) => void;
}
