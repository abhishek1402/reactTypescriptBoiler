import React from "react";

const required = (
  e: React.ChangeEvent<HTMLSelectElement>,
  eleName?: string
) => {
  if (!e.target.value && e.target.value !== "0") {
    return { err: true, msg: `${eleName} is required` };
  } else {
    return { err: false, msg: "" };
  }
};

const minLength8 = (
  e: React.ChangeEvent<HTMLSelectElement>,
  eleName?: string
) => {
  if (e.target.value.length < 8) {
    return { err: true, msg: `length should be greater than 5` };
  } else {
    return { err: false, msg: "" };
  }
};

const positive = (
  e: React.ChangeEvent<HTMLSelectElement>,
  eleName?: string
) => {
  if (Number(e.target.value) < 0) {
    return { err: true, msg: `${eleName} should be positive` };
  } else {
    return { err: false, msg: "" };
  }
};

const email = (e: React.ChangeEvent<any>) => {
  let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  if (!e.target.value.match(regex)) {
    return { err: true, msg: `Provide valid Email` };
  } else {
    return { err: false, msg: "" };
  }
};

const date = (e: string) => {
  let regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  if (!e.match(regex)) {
    return { err: true, msg: `Date should be format DD/MM/YYYY` };
  } else {
    return { err: false, msg: "" };
  }
};

const smallerThen = (
  e: React.ChangeEvent<HTMLSelectElement>,
  checkWith: number,
  eleName: string
) => {
  if (Number(e.target.value) < checkWith) {
    return { err: true, msg: `${eleName} should be positive` };
  } else {
    return { err: false, msg: "" };
  }
};
const InputValidations = {
  required,
  date,
  minLength8,
  positive,
  smallerThen,
  email,
};
export default InputValidations;
