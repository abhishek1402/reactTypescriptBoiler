import {
  ISignupApi,
  ICreatePasswordPayload,
  ILoginPayload,
} from "../../store/auth/types";
import instance from "../../config/axios";

export const signupApi = async (payload: ISignupApi) => {
  return new Promise(async (res, rej) => {
    return instance
      .post("http://localhost:8080/api/user/", payload)
      .then(() => res(true))
      .catch((err: Error) => rej(err));
  });
};

export const loginApi = async (payload: ILoginPayload) => {
  return new Promise(async (res, rej) => {
    return instance
      .post("http://localhost:8080/api/user/login", payload)
      .then((data) => res(data))
      .catch((err: Error) => rej(err));
  });
};

export const createPasswordApi = async (payload: ICreatePasswordPayload) => {
  return new Promise(async (res, rej) => {
    return instance
      .post("http://localhost:8080/api/user/createPassword", payload)
      .then(() => res(true))
      .catch((err: Error) => rej(err));
  });
};
