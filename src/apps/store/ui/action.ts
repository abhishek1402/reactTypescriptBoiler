import { UIActionTypes } from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { AlertType } from "../../shared/types";

export const alertSuccess = (msg: string) => {
  return {
    type: UIActionTypes.UI_ALERT_SUCCESS,
    alertMsg: msg,
  };
};

export const alertError = (msg: string) => {
  return {
    type: UIActionTypes.UI_ALERT_ERROR,
    alertMsg: msg,
  };
};

export const alertHide = () => {
  return {
    type: UIActionTypes.UI_ALERT_HIDE,
  };
};

export const pushInHistory = (ele: string) => {
  return {
    type: UIActionTypes.UI_PUSH_HISTORY,
    item: ele,
  };
};

export const removeFromHistory = (index: number) => {
  return {
    type: UIActionTypes.UI_REOMVE_FROM_HISTORY,
    index,
  };
};

export const uiAlert = (
  alertType: string,
  msg: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<any> => {
    switch (alertType) {
      case AlertType.ALERT_SUCCESS: {
        return new Promise((resolve, reject) => {
          dispatch(alertSuccess(msg));
          return setTimeout(() => {
            dispatch(alertHide());
            resolve(true);
          }, 2000);
        });
      }
      case AlertType.ALERT_ERROR: {
        return new Promise((resolve, reject) => {
          dispatch(alertError(msg));
          return setTimeout(() => {
            dispatch(alertHide());
            resolve(true);
          }, 2000);
        });
      }
      default:
        return dispatch(alertHide());
    }
  };
};
