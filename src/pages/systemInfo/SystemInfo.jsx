import React, {useEffect, useState} from "react";
import Helmet from "react-helmet";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {useSimplePageStyles} from "../../styles/simplePageStyles";
import * as employeeApi from "../../api/employeeApi";
import {useSnackbar} from "../../utils/snackbar";
import {Link} from '@material-ui/core';

const SystemInfo = ({history}) => {
  const [users, setUsers] = useState([]);
  const {showError} = useSnackbar();
  useEffect(() => {
    loadAllUsers(setUsers, history, showError);
  }, [setUsers, history, showError]);

  const classes = useSimplePageStyles();
  return (
    <div>
      <Helmet title="Система - Tender Monitoring"/>
      <Card>
        <CardContent>
          <Typography className={classes.pageTitle} variant="h3">Система Tender Monitoring</Typography>
          <Link href="">
            <Typography variant="h4" className={classes.pageText} >Техническая информация о системе</Typography>
          </Link>
          <Typography variant="h5" className={classes.pageSubTitle}>
            Пользователи
          </Typography>
          {users.map(
            user => <Typography key={user.ID} variant="subtitle1" className={classes.pageText}>Логин: {user.Login}, ФИО: {user.FullName}</Typography>)}
        </CardContent>
      </Card>
    </div>);
};

const loadAllUsers = (setUsers, history, showError) => {
  employeeApi.getAllUsers(history)
    .then(users => setUsers(users))
    .catch(() => showError("Ошибка при попытке загрузки списка пользователей"));
};

export default SystemInfo;
