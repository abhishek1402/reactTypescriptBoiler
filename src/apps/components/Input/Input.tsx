import React, { useState, useRef, useEffect } from "react";
import useOutsideClick from "../../utils/outsideClick";
import InputValidations from "../../utils/validation";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { InputFormBase } from "../../utils/InputForm";
import {
  IInput,
  ValidationType,
  IOptionsType,
  InputError,
} from "../../shared/types";

// import Calendar from "react-calendar";
// import dateFormatter from "../../../utils/dateFormatter";
interface IProps extends IInput {
  blurChange?: (e: string, identifier: string) => void;
  inputChange?: (e: string, identifier: string) => void;
  setError: (err: string) => void;
  setInputValue: (value: number | string) => void;
}
const InputCmp = ({
  type,
  label,
  inputChange,
  options,
  validation,
  classes,
  disabled,
  placeholder,
  identifier,
  value,
  blurChange,
  setError,
  setInputValue,
  error,
  dateSelected,
}: IProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [inputValue, setValue] = useState<string | number>(value ? value : "");
  const [err, setErr] = useState<{ err: boolean; msg: string }>({
    err: false,
    msg: "",
  });
  const divEle = useRef<HTMLDivElement>(null);
  useOutsideClick(divEle, () => {
    setShowCalendar(false);
  });
  //   useEffect(() => {
  //     if (value) setInputValue(value);
  //     return () => {
  //       setInputValue("");
  //     };
  //   }, [value]);
  const [expirationClass, setExpirationClass] = useState<string>(" ");
  const changeFn = (e: React.ChangeEvent<any>) => {
    let error: InputError = { err: false, msg: "" };
    if (validation?.length) {
      for (let index = 0; index < validation.length; index++) {
        let ele = validation[index];
        let err: InputError = InputValidations[ele](e, label);
        if (err && err.err) {
          error = {
            ...err,
          };
          break;
        }
      }
      if (error.err) {
        setError(error.msg);
      } else {
        setInputValue(e.target.value);
      }
    }
  };
  const onInputChange = (value: string, identifier: string) => {
    if (inputChange) {
      inputChange(value, identifier);
    } else if (blurChange) {
      blurChange(value, identifier);
    }
    setInputValue(value);
  };
  const calendarInputChange = (value: string, expirationClass?: string) => {
    if (typeof value === "string") {
      let err = InputValidations.date(value);
      return setError(err.msg);
    }
    if (onInputChange) {
      setShowCalendar(false);
      onInputChange(value, identifier);
      if (expirationClass) {
        setExpirationClass(" ");
      }
    }
  };

  switch (type) {
    case "select": {
      return (
        <div
          className={`form-group  ${classes ? classes.join(" ") : "col-12 "}`}
        >
          {label ? (
            <label
              className={`${
                validation?.includes(ValidationType.required) ? "required" : ""
              }`}
            >
              {label}
            </label>
          ) : null}
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={(e) => changeFn(e)}
            disabled={disabled}
            value={value}
          >
            {options
              ? options.map((ele: IOptionsType, index: number) => (
                  <option
                    key={`${ele.value}` + `${ele.label}` + `${index}`}
                    value={ele.value}
                  >
                    {ele.label}
                  </option>
                ))
              : null}
          </select>
          {error.err ? (
            <div className="error text-danger">{error.msg}</div>
          ) : null}
        </div>
      );
    }
    case "password":
    case "text": {
      return (
        <FormControl fullWidth>
          {/* <InputLabel htmlFor="standard-adornment-amount"></InputLabel> */}
          <TextField
            error={error.err}
            required
            id="standard-required"
            label={placeholder}
            type={type}
            value={inputValue}
            disabled={disabled}
            helperText={error.msg}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              changeFn(e);
              setValue(e.target.value);
            }}
          />
          {/* <Input
            // onBlur={(e:React.BlurEvent<HTMLInputElement>) => changeFn(e)}
            
          
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              debugger;
              changeFn(e);
              setValue(e.target.value);
            }}
          />
          {error.err ? (
            <FormHelperText error={error.err}>{error.msg}</FormHelperText>
          ) : null} */}
        </FormControl>

        // <div
        //   className={`form-group ${classes ? classes.join(" ") : "col-12 "}`}
        // >
        //   {label ? (
        //     <label
        //       className={`${
        //         validation?.includes(ValidationType.required) ? "required" : ""
        //       }`}
        //     >
        //       {label}
        //     </label>
        //   ) : null}
        //   <input
        //     type="text"
        //     className="form-control"
        //     placeholder={placeholder}
        //     onBlur={(e) => changeFn(e)}
        //     value={inputValue}
        //     disabled={disabled}
        //     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        //       if (value) changeFn(e);
        //       else setInputValue(e.target.value);
        //     }}
        //   />

        // </div>
      );
    }

    case "number": {
      return (
        <div
          className={`form-group ${classes ? classes.join(" ") : "col-12 "}`}
        >
          {label ? (
            <label
              className={`${
                validation?.includes(ValidationType.required) ? "required" : ""
              }`}
            >
              {label}
            </label>
          ) : null}
          <input
            type="number"
            className="form-control"
            placeholder={placeholder}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => changeFn(e)}
            disabled={disabled}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (value) changeFn(e);
              else setInputValue(e.target.value);
            }}
          />
          {error.err ? (
            <div className="error text-danger">{error.msg}</div>
          ) : null}
        </div>
      );
    }
    case "textbox": {
      return (
        <div
          className={`form-group ${classes ? classes.join(" ") : "col-12 "}`}
        >
          {label ? (
            <label
              className={`
          ${validation?.includes(ValidationType.required) ? "required" : ""}
          `}
            >
              {label}
            </label>
          ) : null}

          <textarea
            className="form-control"
            rows={5}
            id="comment"
            onBlur={(e) => changeFn(e)}
            disabled={disabled}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              if (value) changeFn(e);
              else setInputValue(e.target.value);
            }}
          ></textarea>
          {error.err ? (
            <div className="error text-danger">{error.msg}</div>
          ) : null}
        </div>
      );
    }
    case "calendar": {
      if (classes && classes.find((element) => element == "border-danger")) {
        setExpirationClass("border-danger");
        classes.splice(classes.indexOf("border-danger"), 1);
      }

      return (
        // <div
        //   className={`form-group ${classes ? classes.join(" ") : "col-12 "} `}
        //   ref={divEle}
        // >
        //   {label ? (
        //     <label
        //       className={`${
        //         validation?.includes(ValidationType.required) ? "required" : ""
        //       }`}
        //     >
        //       {label}
        //     </label>
        //   ) : null}
        //   <input
        //     type="text"
        //     className={`${"form-control"} ${expirationClass}`}
        //     placeholder={placeholder}
        //     onClick={(e) => setShowCalendar(!showCalendar)}
        //     value={dateSelected ? dateSelected : value}
        //   />
        //   {showCalendar ? (
        //     <div style={{ position: "absolute", zIndex: 1, width: "100%" }}>
        //       <Calendar
        //         minDate={new Date()}
        //         onChange={(e: any) => calendarInputChange(e, expirationClass)}
        //       />
        //     </div>
        //   ) : null}
        //   {error.err ? (
        //     <div className="error text-danger">{error.msg}</div>
        //   ) : null}
        // </div>
        null
      );
    }
    default: {
      return null;
    }
  }
};

export default InputCmp;
