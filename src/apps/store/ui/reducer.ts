import {
  IUIState,
  UIActionTypes,
  IUIAlertSuccess,
  IUIAlertError,
  IUIAlertHide,
  IUIPushInHistory,
  IUIRemoveFromHistory,
  IUIAction,
} from "./types";
import { AlertType } from "../../shared/types";

const initialState: IUIState = {
  showAlert: false,
  alertMsg: "",
  alertType: null,
  history: [],
  noOfItemsInHistory: 4,
};

const alertSuccess = (state: IUIState, action: IUIAlertSuccess) => {
  return {
    ...state,
    showAlert: true,
    alertMsg: action.alertMsg,
    alertType: AlertType.ALERT_SUCCESS,
  };
};

const alertError = (state: IUIState, action: IUIAlertError) => {
  return {
    ...state,
    showAlert: true,
    alertMsg: action.alertMsg,
    alertType: AlertType.ALERT_ERROR,
  };
};

const hideAlert = (state: IUIState, action: IUIAlertHide) => {
  return {
    ...state,
    showAlert: false,
    alertMsg: "",
    alertType: null,
  };
};

const pushInHistory = (state: IUIState, action: IUIPushInHistory) => {
  let history = [...state.history];
  if (history.includes(action.item)) {
    return state;
  }
  if (history.length > state.noOfItemsInHistory) {
    history = history.slice(1);
  }
  history.push(action.item);
  return {
    ...state,
    history,
  };
};

const removeFromHistory = (state: IUIState, action: IUIRemoveFromHistory) => {
  let history = [...state.history];
  history.splice(action.index, 1);
  return { ...state, history };
};

const uiReducer = (
  state: IUIState = initialState,
  action: IUIAction
): IUIState => {
  switch (action.type) {
    case UIActionTypes.UI_ALERT_SUCCESS:
      return alertSuccess(state, action);
    case UIActionTypes.UI_ALERT_ERROR:
      return alertError(state, action);
    case UIActionTypes.UI_ALERT_HIDE:
      return hideAlert(state, action);
    case UIActionTypes.UI_PUSH_HISTORY:
      return pushInHistory(state, action);
    case UIActionTypes.UI_REOMVE_FROM_HISTORY:
      return removeFromHistory(state, action);
    default:
      return state;
  }
};

export default uiReducer;
