import React from "react";
import {Route, Switch} from "react-router-dom";
import Helmet from "react-helmet";
import NotFound from "../errors/NotFound";
import Login from "../pages/login/Login";
import Landing from "../pages/landing/Landing";
import Profile from "../pages/profile/Profile";
import {useAppStyles} from "./appStyles";
import AuthRoute from "../security/AuthRoute";
import Settings from "../pages/settings/Settings";
import SystemInfo from "../pages/systemInfo/SystemInfo";
import Keywords from "../pages/keywords/keywords";
import Tenders from "../pages/tenders/tenders"
import Tender from "../pages/tender/tender"
import Summary from "../pages/summary/Summary"
import {ALL, ADMIN} from "../security/Authorities";

const App = () => {
  const classes = useAppStyles();
  return (
    <div>
      <Helmet bodyAttributes={{class: classes.body}}/>
      <Switch>
        <Route path="/login" component={Login} exact/>
        <AuthRoute path="/" component={Landing} authorities={ALL} exact/>
        <AuthRoute path="/keywords" component={Keywords} authorities={ALL} exact/>
        <AuthRoute path="/tenders" component={Tenders} authorities={ALL} exact/>
        <AuthRoute path="/tenders/:id" component={Tender} authorities={ALL} exact/>
        <AuthRoute path="/summary" component={Summary} authorities={ALL} exact/>
        <AuthRoute path="/profile" component={Profile} authorities={ALL} exact/>
        <AuthRoute path="/settings" component={Settings} authorities={ALL} exact/>
        <AuthRoute path="/system" component={SystemInfo} authorities={[ADMIN]} exact/>
        <AuthRoute path="/" component={NotFound}/>
      </Switch>
    </div>
  );
};

export default App;
