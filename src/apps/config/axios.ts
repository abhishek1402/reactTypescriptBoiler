import axios from "axios";
// import store from "../store";
const instance = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin,Access-Control-Allow-Origin,X-Requested-With, Content-Type, Accept,sessionId",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers.authorization = localStorage.getItem("token");
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    if (res.headers && res.headers.sessionid) {
      // document.cookie = `sessionId=${res.headers.sessionid};domain=wms-dev.akucintasayurbox.com;path=/"`;
      localStorage.setItem("sessionId", res.headers.sessionid);
    }
    return res.data;
  },
  (err) => {
    let error = err && err.response && err.response.data && err.response.data;
    if (error) {
      debugger;
      //   logout(true)(store.dispatch, (): any => {}, {});
      //   throw new axios.Cancel("User Looged Out");
      throw new Error(error && error.error ? error.error.reason : "");
    } else {
      throw new Error(error ? error.message : "");
    }
  }
);
export default instance;
