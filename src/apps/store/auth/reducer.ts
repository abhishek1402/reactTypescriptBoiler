import { IAuthState, AuthTypes, IAuthAction } from "./types";
import { reducerFactory } from "../factory";
const initialState: IAuthState = {
  authenticated: false,
  error: "",
  loading: false,
  passwordCreation: false,
};

//To do --> proper type checking for action
const auth = (
  state: IAuthState = initialState,
  action: IAuthAction
): IAuthState => {
  switch (action.type) {
    case AuthTypes.SIGN_UP_START:
      return reducerFactory(state, action).start;
    case AuthTypes.SIGN_UP_SUCCESS:
      return reducerFactory(state, action).success;
    case AuthTypes.SIGN_UP_FAIL:
      return reducerFactory(state, action).fail;
    case AuthTypes.CREATE_PASSWORD_START:
      return reducerFactory(state, action).start;
    case AuthTypes.CREATE_PASSWORD_SUCCESS:
      return reducerFactory(state, action).success;
    case AuthTypes.CREATE_PASSWORD_FAIL:
      return reducerFactory(state, action).fail;
    case AuthTypes.LOGIN_START:
      return reducerFactory(state, action).start;
    case AuthTypes.LOGIN_SUCCESS:
      return reducerFactory(state, action).success;
    case AuthTypes.LOGIN_FAIL:
      return reducerFactory(state, action).fail;
    case AuthTypes.RESET_STATE:
      return reducerFactory(initialState, action).reset;
    default:
      return state;
  }
};

export default auth;
