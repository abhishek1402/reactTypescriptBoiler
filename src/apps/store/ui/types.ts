import { AlertType } from "../../shared/types";

export enum UIActionTypes {
  UI_ALERT_SUCCESS = "UI_ALERT_SUCCESS",
  UI_ALERT_ERROR = "UI_ALERT_ERROR",
  UI_ALERT_HIDE = "UI_ALERT_HIDE",
  UI_PUSH_HISTORY = "UI_PUSH_HISTORY",
  UI_REOMVE_FROM_HISTORY = "UI_REOMVE_FROM_HISTORY",
}

export interface IUIState {
  readonly showAlert: boolean;
  readonly alertMsg: string;
  readonly alertType: AlertType | null;
  readonly history: Array<string>;
  readonly noOfItemsInHistory: number;
}

export interface IUIAlertSuccess {
  type: UIActionTypes.UI_ALERT_SUCCESS;
  alertMsg: string;
}

export interface IUIAlertError {
  type: UIActionTypes.UI_ALERT_ERROR;
  alertMsg: string;
}

export interface IUIAlertHide {
  type: UIActionTypes.UI_ALERT_HIDE;
}

export interface IUIPushInHistory {
  type: UIActionTypes.UI_PUSH_HISTORY;
  item: string;
}
export interface IUIRemoveFromHistory {
  type: UIActionTypes.UI_REOMVE_FROM_HISTORY;
  index: number;
}

export type IUIAction =
  | IUIAlertSuccess
  | IUIAlertError
  | IUIAlertHide
  | IUIPushInHistory
  | IUIRemoveFromHistory;
