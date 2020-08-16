import {
  AuthTypes,
  ISignupApi,
  ISignUpFail,
  ISignUpSuccess,
  ICreatePasswordPayload,
  ILoginPayload,
} from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { signupApi, createPasswordApi, loginApi } from "../../shared/api/auth";
import { uiAlert } from "../ui/action";
import { AlertType } from "../../shared/types";
import { actionFactory } from "../factory";

export const signup = (
  payload: ISignupApi
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(actionFactory(AuthTypes.SIGN_UP_START).start);
    signupApi(payload)
      .then((ele) => {
        dispatch(
          uiAlert(
            AlertType.ALERT_SUCCESS,
            `Signup Succefull.
          Please check your email for password link`
          )
        ).then((ele) => {
          dispatch(actionFactory(AuthTypes.SIGN_UP_SUCCESS).success);
        });
      })
      .catch((err) => {
        dispatch(uiAlert(AlertType.ALERT_ERROR, err.message)).then((ele) => {
          dispatch(actionFactory(AuthTypes.SIGN_UP_FAIL).fail);
        });
      });
  };
};

export const createPassword = (
  payload: ICreatePasswordPayload
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(actionFactory(AuthTypes.CREATE_PASSWORD_START).start);
    createPasswordApi(payload)
      .then((ele) => {
        dispatch(
          uiAlert(
            AlertType.ALERT_SUCCESS,
            `Password Crateion Succefull.
          Please login to your account`
          )
        ).then((ele) => {
          dispatch(
            actionFactory(AuthTypes.CREATE_PASSWORD_SUCCESS, {
              passwordCreation: true,
            }).success
          );
        });
      })
      .catch((err) => {
        dispatch(uiAlert(AlertType.ALERT_ERROR, err.message)).then((ele) => {
          dispatch(actionFactory(AuthTypes.CREATE_PASSWORD_FAIL).fail);
        });
      });
  };
};

export const login = (
  payload: ILoginPayload
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(actionFactory(AuthTypes.LOGIN_START).start);
    loginApi(payload)
      .then((ele) => {
        dispatch(uiAlert(AlertType.ALERT_SUCCESS, `Login Succefull`)).then(
          (ele: any) => {
            localStorage.setItem("token", ele.token);
            dispatch(
              actionFactory(AuthTypes.LOGIN_SUCCESS, {
                authenticated: true,
              }).success
            );
          }
        );
      })
      .catch((err) => {
        dispatch(uiAlert(AlertType.ALERT_ERROR, err.message)).then((ele) => {
          dispatch(actionFactory(AuthTypes.LOGIN_FAIL).fail);
        });
      });
  };
};
