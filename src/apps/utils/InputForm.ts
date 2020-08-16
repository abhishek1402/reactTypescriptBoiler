import { InputForm, IInput } from "../shared/types";

// export const setInputValue = <T extends InputForm<InputFormBase>>(
//   setFormState: React.Dispatch<React.SetStateAction<T>>,
//   prevFormState: T,
//   identifier: string,
//   value: number | string
// ) => {
//   let i = identifier as keyof typeof prevFormState.form;
//   setFormState({
//     ...prevFormState,
//     form: {
//       ...prevFormState.form,
//       [i]: {
//         ...prevFormState.form[i],
//         valid: true,
//         value,
//         error: { err: false, msg: "" },
//       },
//     },
//   });
// };

// let setError = <T extends InputForm<InputFormBase>>(
//   setFormState: React.Dispatch<React.SetStateAction<T>>,
//   prevFormState: T,
//   identifier: string,
//   errorMsg: string
// ) => {
//   if (errorMsg) {
//     setFormState({
//       ...prevFormState,
//       form: {
//         ...prevFormState.form,
//         [identifier]: {
//           ...prevFormState.form[identifier],
//           valid: false,
//           error: {
//             err: true,
//             msg: errorMsg,
//           },
//         },
//       },
//     });
//   } else {
//     setFormState({
//       ...prevFormState,
//       form: {
//         ...prevFormState.form,
//         [identifier]: {
//           ...prevFormState.form[identifier],
//           valid: true,
//           error: {
//             err: false,
//             msg: "",
//           },
//         },
//       },
//     });
//   }
// };

export class InputFormBase implements InputForm<InputFormBase> {
  form: Record<string, IInput>;
  formName: string;
  constructor(form: Record<string, IInput>, formName: string) {
    this.form = form;
    this.formName = formName;
  }
  isFormValid = () => {
    return !Object.keys(this.form).every((ele) => this.form[ele].valid);
  };
  setInputValue = <T extends InputForm<InputFormBase>>(
    setFormState: React.Dispatch<React.SetStateAction<T>>,
    prevFormState: T,
    identifier: string,
    value: number | string
  ) => {
    let i = identifier as keyof typeof prevFormState.form;
    this.form = {
      ...prevFormState.form,
      [i]: {
        ...prevFormState.form[i],
        valid: true,
        value,
        error: { err: false, msg: "" },
      },
    };
    setFormState({
      ...prevFormState,
      form: {
        ...this.form,
      },
    });
  };
  setError = <T extends InputForm<InputFormBase>>(
    setFormState: React.Dispatch<React.SetStateAction<T>>,
    prevFormState: T,
    identifier: string,
    errorMsg: string
  ) => {
    if (errorMsg) {
      this.form = {
        ...prevFormState.form,
        [identifier]: {
          ...prevFormState.form[identifier],
          valid: false,
          error: {
            err: true,
            msg: errorMsg,
          },
        },
      };
      setFormState({
        ...prevFormState,
        form: {
          ...this.form,
        },
      });
    } else {
      this.form = {
        ...prevFormState.form,
        [identifier]: {
          ...prevFormState.form[identifier],
          valid: true,
          error: {
            err: false,
            msg: "",
          },
        },
      };
      setFormState({
        ...prevFormState,
        form: {
          ...this.form,
        },
      });
    }
  };
}
