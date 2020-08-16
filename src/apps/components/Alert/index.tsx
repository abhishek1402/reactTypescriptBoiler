import React, { useState, useRef, useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import { AlertType } from "../../shared/types";

// import Calendar from "react-calendar";
// import dateFormatter from "../../../utils/dateFormatter";

interface IProps {
  type: AlertType;
  msg: string;
}
const AlertCmp = ({ type, msg }: IProps) => {
  return <Alert severity={type}>{msg}</Alert>;
};

export default AlertCmp;
