import React, {useContext} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from "react-helmet";
import Typography from "@material-ui/core/Typography";
import {useSimplePageStyles} from "../../styles/simplePageStyles";
import {AppContext} from "../../AppContext";
import {Link} from '@material-ui/core';

const Landing = () => {
  const [context] = useContext(AppContext);
  const classes = useSimplePageStyles();
  const currentUser = context.currentUser;
  return (
    <div>
      <Helmet title="Tender monitroting"/>
      <Card>
        <CardContent>
          <Typography variant="h3">{`Привет, ${currentUser ? currentUser.login : "незнакомец"}!`}</Typography>
          <Typography variant="h6" className={classes.largeMessage}>Это Tender Monitoring &mdash; система управления мониторинга тендерами.</Typography>
          <Link href="">
            <Typography variant="h4" className={classes.pageText} >Вики страница системы</Typography>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Landing;
