import { AuthTypes, IAuthState, IAuthAction } from "./auth/types";

export function actionFactory<T, R>(type: T, data?: R, error?: Error) {
  return {
    start: {
      type,
      loading: true,
    },
    success: {
      type,
      loading: false,
      ...(data && { data: data }),
    },
    fail: {
      type,
      loading: false,
      error: error,
    },
  };
}
export interface IAction<K = any> {
  type: string;
  data?: K;
}
type MergedWithOptional<T1> = {
  [K in keyof T1]: T1[K];
} & { loading: boolean };

export interface IReducerFactory<T1, T2> {
  start: MergedWithOptional<T1>;
  success: MergedWithOptional<T1>;
  fail: MergedWithOptional<T1>;
  reset: MergedWithOptional<T1>;
}

export function reducerFactory<T1, T2 extends IAction>(
  state: T1,
  action: T2
): IReducerFactory<T1, T2> {
  return {
    start: {
      ...state,
      ...action.data,
      loading: false,
    },
    success: {
      ...state,
      loading: false,
      ...action.data,
    },
    fail: {
      ...state,
      loading: false,
      ...action.data,
    },
    reset: {
      ...state,
      ...action.data,
      loading: false,
    },
  };
}
