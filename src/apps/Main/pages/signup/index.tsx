import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { SignupForm } from "./signupForm";
import InputCmp from "../../../components/Input/Input";
import { ThunkDispatch } from "redux-thunk";
import { ISignupApi } from "../../../store/auth/types";
import { connect } from "react-redux";
import { signup } from "../../../store/auth/action";
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
interface IDispatchProps {
  signup: (payload: ISignupApi) => void;
}
type IProps = IDispatchProps;
const SignupCmp = ({ signup }: IProps) => {
  const [signupForm, SetSignupForm] = useState(SignupForm);
  useEffect(() => {
    console.log(signupForm);
  }, [signupForm]);
  const classes = useStyles();
  let form = Object.keys(signupForm.form).map((ele) => {
    let e = ele as keyof typeof signupForm.form;
    return (
      <InputCmp
        key={signupForm.form[e].identifier}
        validation={signupForm.form[e].validation}
        identifier={signupForm.form[e].identifier}
        type={signupForm.form[e].type}
        valid={signupForm.form[e].valid}
        placeholder={signupForm.form[e].placeholder}
        value={signupForm.form[e].value}
        error={signupForm.form[e].error}
        setError={(e) => {
          signupForm.setError(SetSignupForm, signupForm, ele, e);
        }}
        setInputValue={(value: number | string) => {
          signupForm.setInputValue(SetSignupForm, signupForm, ele, value);
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
              <Typography variant="h5" align="right" color="inherit">
                CREATE ACCOUNT
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
                  disabled={signupForm.isFormValid()}
                  onClick={() =>
                    signup({
                      email: String(signupForm.form.email.value),
                      userName: String(signupForm.form.userName.value),
                    })
                  }
                >
                  Sign up
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
};

// const mapStateToProps = (state: RootState): IStateProps => {
//   return {
//     poDetail: state.purchaseOrder.poDetail,
//     itemsList: state.purchaseOrder.poSkuItems,
//     itemsLoading: state.purchaseOrder.poSkuItemsLoading,
//     submitting: state.grn.skuGrnFormSubmitting,
//     skuGrnFormState: state.grn.skuGrnFormState,
//   };
// };

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): IDispatchProps => ({
  signup: (payload: ISignupApi) => dispatch(signup(payload)),
});

export default connect(null, mapDispatchToProps)(SignupCmp);
