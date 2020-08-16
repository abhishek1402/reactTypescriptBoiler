import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import InputCmp from "../../../components/Input/Input";
import { CreatePasswordForm } from "./createPasswordForm";
import { Location, History } from "history";
import { parseQueryString } from "../../../utils/url";
import { ICreatePasswordPayload } from "../../../store/auth/types";
import { createPassword } from "../../../store/auth/action";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { RootState } from "../../../store";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
type StateType = {
  query: string;
};
type ILocation = Location<StateType>;

interface IStateProps {
  passwordCreation: boolean;
}
interface IOwnProps {
  location: ILocation;
  history: History;
}
interface IDispatchProps {
  createPassword: (payload: ICreatePasswordPayload) => void;
}

const CreatePwdCmp = ({
  history,
  location,
  createPassword,
  passwordCreation,
}: IOwnProps & IDispatchProps & IStateProps) => {
  const [token, settoken] = useState<string>("");
  const [createPasswordForm, SetCreatePasswordForm] = useState(
    CreatePasswordForm
  );
  useEffect(() => {
    settoken(parseQueryString(location.search));
    localStorage.setItem("token", parseQueryString(location.search));
  }, []);
  useEffect(() => {
    if (passwordCreation) {
      history.push("/login");
    }
  }, [passwordCreation]);
  useEffect(() => {
    if (
      createPasswordForm.form.password.value !==
      createPasswordForm.form.rePassword.value
    ) {
      createPasswordForm.setError(
        SetCreatePasswordForm,
        createPasswordForm,
        "rePassword",
        "Password Not Match"
      );
    } else {
      createPasswordForm.setError(
        SetCreatePasswordForm,
        createPasswordForm,
        "rePassword",
        ""
      );
    }
  }, [
    createPasswordForm.form.password.value,
    createPasswordForm.form.rePassword.value,
  ]);
  const classes = useStyles();
  let form = Object.keys(createPasswordForm.form).map((ele) => {
    let e = ele as keyof typeof createPasswordForm.form;
    return (
      <InputCmp
        key={
          createPasswordForm.form[e].identifier + createPasswordForm.formName
        }
        validation={createPasswordForm.form[e].validation}
        identifier={createPasswordForm.form[e].identifier}
        type={createPasswordForm.form[e].type}
        valid={createPasswordForm.form[e].valid}
        placeholder={createPasswordForm.form[e].placeholder}
        value={createPasswordForm.form[e].value}
        error={createPasswordForm.form[e].error}
        setError={(e) => {
          createPasswordForm.setError(
            SetCreatePasswordForm,
            createPasswordForm,
            ele,
            e
          );
        }}
        setInputValue={(value: number | string) => {
          createPasswordForm.setInputValue(
            SetCreatePasswordForm,
            createPasswordForm,
            ele,
            value
          );
        }}
      />
    );
  });
  return token ? (
    <Grid
      container
      direction="row"
      className="h100"
      justify="center"
      alignItems="center"
    >
      <Grid item sm={8} xs={11} md={5}>
        <Card className={classes.root}>
          <CardContent>
            <div className=" mb10">
              <Typography variant="h5" align="left">
                Create Password
              </Typography>
            </div>

            {form}
          </CardContent>

          <CardActions>
            <Grid direction="row" container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <Button
                  size="large"
                  color="primary"
                  variant="outlined"
                  disabled={createPasswordForm.isFormValid()}
                  onClick={() => {
                    if (createPasswordForm.form["password"].value) {
                      createPassword({
                        password: String(
                          createPasswordForm.form["password"].value
                        ),
                      });
                    }
                  }}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  ) : (
    <Grid
      container
      direction="row"
      className="h100"
      justify="center"
      alignItems="center"
    >
      <Typography variant="h4" align="left">
        This Page Has Expired
      </Typography>
    </Grid>
  );
};

const mapStateToProps = (state: RootState): IStateProps => {
  return {
    passwordCreation: state.auth.passwordCreation,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): IDispatchProps => ({
  createPassword: (payload: ICreatePasswordPayload) =>
    dispatch(createPassword(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePwdCmp);
