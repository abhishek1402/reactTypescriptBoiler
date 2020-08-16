import { IAction } from "../factory";

export enum AuthTypes {
  SIGN_UP_START = "SIGN_UP_START",
  SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS",
  SIGN_UP_FAIL = "SIGN_UP_FAIL",
  RESET_STATE = "RESET_STATE",
  CREATE_PASSWORD_START = "CREATE_PASSWORD_START",
  CREATE_PASSWORD_SUCCESS = "CREATE_PASSWORD_SUCCESS",
  CREATE_PASSWORD_FAIL = "CREATE_PASSWORD_FAIL",
  LOGIN_START = "LOGIN_START",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
}

export interface ISignupApi {
  email: string;
  userName: string;
}
export interface ICreatePasswordPayload {
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}
export interface ISignUpStart extends IAction {
  type: AuthTypes.SIGN_UP_START;
}
export interface ISignUpSuccess extends IAction {
  type: AuthTypes.SIGN_UP_SUCCESS;
}
export interface ISignUpFail extends IAction {
  type: AuthTypes.SIGN_UP_FAIL;
  data: {
    error: string;
  };
}
export interface ICreatePasswordStart extends IAction {
  type: AuthTypes.CREATE_PASSWORD_START;
}
export interface ICreatePasswordSuccess extends IAction {
  type: AuthTypes.CREATE_PASSWORD_SUCCESS;
  data: {
    passwordCreation: boolean;
  };
}
export interface ICreatePasswordFail extends IAction {
  type: AuthTypes.CREATE_PASSWORD_FAIL;
  data: {
    error: string;
  };
}
export interface ILoginStart extends IAction {
  type: AuthTypes.LOGIN_START;
}
export interface ILoginSuccess extends IAction {
  type: AuthTypes.LOGIN_SUCCESS;
  data: {
    passwordCreation: boolean;
  };
}
export interface ILoginFail extends IAction {
  type: AuthTypes.LOGIN_FAIL;
  data: {
    error: string;
  };
}
export interface ISignupResetState extends IAction {
  type: AuthTypes.RESET_STATE;
}

export type IAuthAction =
  | ISignUpStart
  | ISignUpSuccess
  | ISignUpFail
  | ISignupResetState
  | ICreatePasswordStart
  | ICreatePasswordSuccess
  | ICreatePasswordFail
  | ILoginStart
  | ILoginSuccess
  | ILoginFail;

export interface IAuthState {
  readonly authenticated: boolean;
  readonly error: string;
  readonly loading: boolean;
  readonly passwordCreation: boolean;
}
