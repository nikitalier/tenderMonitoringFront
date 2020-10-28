import React, {useContext} from "react";
import {hot} from "react-hot-loader";
import {withRouter} from "react-router-dom";
import IdleTimer from "react-idle-timer";
import AppView from "./AppView";
import * as securityApi from "../api/securityApi";
import {useSnackbar} from "../utils/snackbar";
import {AppContext} from "../AppContext";
import Login from "../pages/login/Login";

const logout = (currentUserName, context, snackbar) => () => {
  console.log(currentUserName)
  securityApi.logout()
    .then(() => snackbar.showSuccess(`Вас слишком долго не было, ${currentUserName.Login}!`));
};

const App = (props) => {
  const [context] = useContext(AppContext);
  const {currentUser} = context;
  const snackbar = useSnackbar();

  const currentUserName = currentUser;

  return (
    currentUser ?
      <IdleTimer element={document} onIdle={logout(currentUserName.Login, context, snackbar)} timeout={1000 * 60 * 30}>
          <AppView {...props}/>
      </IdleTimer>
      :
      <Login {...props}/>
  );
};

export default withRouter(hot(module)(App));
