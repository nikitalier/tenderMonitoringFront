import React, {useState} from "react";
import SettingsView from "./SettingsView";
import {generateSecuredPassword} from "../../api/securityApi";
import {useSnackbar} from "../../utils/snackbar";

const Settings = (props) => {
  const {history} = props;
  const {showError} = useSnackbar();
  return (
    <SettingsView/>
  );
};

export default Settings;
