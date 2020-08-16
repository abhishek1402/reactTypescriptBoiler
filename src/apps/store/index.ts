import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import auth from "./auth/reducer";
import ui from "./ui/reducer";

import thunk from "redux-thunk";
import { IAuthState } from "./auth/types";
import { IUIState } from "./ui/types";

export interface RootState {
  auth: IAuthState;
  ui: IUIState;
}
export default createStore(
  combineReducers<RootState>({
    auth,
    ui,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
