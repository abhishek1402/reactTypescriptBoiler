import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { History } from "history";

import InputCmp from "../../../components/Input/Input";
import { LoginForm } from "./loginForm";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ILoginPayload } from "../../../store/auth/types";
import { login } from "../../../store/auth/action";
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

interface IStateProps {
  authenticated: boolean;
  loading: boolean;
}
interface IDispatchProps {
  login: (payload: ILoginPayload) => void;
}

interface IOwnProps {
  history: History;
}
type IProps = IStateProps & IDispatchProps & IOwnProps;
export function LoginCmp({ authenticated, loading, login, history }: IProps) {
  const [loginForm, SetLoginForm] = useState(LoginForm);
  useEffect(() => {
    if (authenticated) {
      history.push("/signup");
    }
  });
  const classes = useStyles();
  let form = Object.keys(loginForm.form).map((ele) => {
    let e = ele as keyof typeof loginForm.form;
    return (
      <InputCmp
        key={loginForm.form[e].identifier}
        validation={loginForm.form[e].validation}
        //   classes: ["col-12"],
        identifier={loginForm.form[e].identifier}
        type={loginForm.form[e].type}
        valid={loginForm.form[e].valid}
        placeholder={loginForm.form[e].placeholder}
        value={loginForm.form[e].value}
        error={loginForm.form[e].error}
        setError={(e) => {
          loginForm.setError(SetLoginForm, loginForm, ele, e);
        }}
        setInputValue={(value: number | string) => {
          loginForm.setInputValue(SetLoginForm, loginForm, ele, value);
        }}
      />
    );
  });
  return (
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
                LOGIN
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
                  disabled={loginForm.isFormValid()}
                  onClick={() =>
                    login({
                      email: String(loginForm.form["email"].value),
                      password: String(loginForm.form["password"].value),
                    })
                  }
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Typography>OR</Typography>
              </Grid>
              <Grid container item xs={6} justify="flex-end">
                <Button size="large" color="primary" variant="outlined">
                  With Google
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: RootState): IStateProps => {
  return {
    authenticated: state.auth.authenticated,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): IDispatchProps => ({
  login: (payload: ILoginPayload) => dispatch(login(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginCmp);
