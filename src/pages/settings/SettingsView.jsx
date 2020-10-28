import React from "react";
import {useSimplePageStyles} from "../../styles/simplePageStyles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Switch from '@material-ui/core/Switch';
import { Radio } from "@material-ui/core";

const SettingsView = () => {
  const classes = useSimplePageStyles();
  return (
    <Card>
      <CardContent>
        <Typography className={classes.pageTitle} variant="h3">Настройки</Typography>
        <Card>
          <CardContent>
            <Typography variant="h5">Уведомления по почте</Typography>
            <Switch
              // checked={state.checkedA}
              // onChange={handleChange}
              name="checkedA"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default SettingsView;
