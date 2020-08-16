import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { SignupForm } from "./pages/signup/signupForm";
import InputCmp from "../components/Input/Input";
import { Switch, Route, Link, NavLink } from "react-router-dom";
import SignupCmp from "./pages/signup";
import LoginCmp from "./pages/login";
import { useTheme } from "@material-ui/core/styles";
// import { CreatePasswordForm } from "./pages/createPassword/createPasswordForm";
import CreatePwdCmp from "./pages/createPassword";

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

export default function ButtonAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Super Cloud
          </Typography>
          <div className="mr10">
            <NavLink
              to="/login"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
              activeClassName={"MuiPaper-elevation5"}
            >
              <Button color="inherit" variant="outlined">
                Login
              </Button>
            </NavLink>
          </div>
          <NavLink
            to="/signup"
            style={{ textDecoration: "none", color: "inherit" }}
            activeClassName={"MuiPaper-elevation5"}
          >
            <Button color="inherit" variant="outlined">
              Signup
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
      <div className="h80vh">
        {/* <Grid
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
                  <Typography variant="h5" align="center" component="h2">
                    LOGIN
                  </Typography>
                </div>

                <FormControl fullWidth>
                  <InputLabel htmlFor="standard-adornment-amount">
                    Email
                  </InputLabel>
                  <Input id="standard-adornment-amount" />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel htmlFor="standard-adornment-amount">
                    Password
                  </InputLabel>
                  <Input id="standard-adornment-amount" />
                </FormControl>
              </CardContent>

              <CardActions>
                <Grid direction="row" container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Button size="large" color="primary" variant="outlined">
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
        </Grid> */}

        {/* <FormControl fullWidth>
                  <InputLabel htmlFor="standard-adornment-amount">
                    Name
                  </InputLabel>
                  <Input id="standard-adornment-amount" />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel htmlFor="standard-adornment-amount">
                    Email
                  </InputLabel>
                  <Input id="standard-adornment-amount" />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel htmlFor="standard-adornment-amount">
                    Mobile Number
                  </InputLabel>
                  <Input id="standard-adornment-amount" />
                </FormControl> */}
        <Switch>
          <Route path="/signup" component={SignupCmp} />
          <Route path="/login" component={LoginCmp} />
          <Route path="/createPassword" component={CreatePwdCmp} />
        </Switch>
      </div>
    </div>
  );
}
