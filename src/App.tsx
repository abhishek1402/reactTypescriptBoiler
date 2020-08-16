import React from "react";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import "./App.css";
import MainApp from "./apps/Main";
import TrayApp from "./apps/Tray";
import { AlertCmp } from "./apps/components";
import { AlertType } from "./apps/shared/types";
import { RootState } from "./apps/store";
import { connect } from "react-redux";
interface IStateProps {
  alertMsg: string;
  alertType: AlertType | null;
  authenticated: boolean;
}
type IProps = IStateProps;

const App = ({ alertMsg, alertType }: IProps) => {
  const Alert = alertType ? <AlertCmp msg={alertMsg} type={alertType} /> : null;
  return (
    <div>
      {Alert}
      <HashRouter>
        <Switch>
          <Route path="/tray" component={TrayApp} />
          <Route path="/" component={MainApp} />
        </Switch>
      </HashRouter>
    </div>
  );
};

const mapStateToProps = (state: RootState): IStateProps => {
  return {
    alertMsg: state.ui.alertMsg,
    alertType: state.ui.alertType,
    authenticated: state.auth.authenticated,
  };
};
export default withRouter(connect(mapStateToProps, "")(App));
