import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Grid from "@material-ui/core/Grid";
import profileIcon from "../../images/profile-icon.png";
import TextField from "@material-ui/core/TextField";
import {useProfileStyles} from "./profileStyles";
import {CircularProgress} from "@material-ui/core";
import {useFormik} from "formik";
import {formikValidate} from "../../forms";
import {required} from "../../forms/formik/formikValidationRules";

const validate = formikValidate({
  email: [required()],
});

const ProfileView = ({currentUser, onSave}) => {
  const preview = !currentUser;
  const classes = useProfileStyles();
  const {values, errors, handleSubmit, handleChange, setErrors} = useFormik({
    initialValues: {
      Login: currentUser ? currentUser.Login : "",
    },
    onSubmit: (values) => {
      return onSave(values)
    },
    validate,
    validateOnChange: false,
    validateOnBlur: true,
    enableReinitialize: true,
  });
  return (
    preview ?
      <CircularProgress/>
      :
      <form onSubmit={handleSubmit} onChange={() => Object.keys(errors).length !== 0 && setErrors({})}>
        <Card>
          <CardContent>
            <Grid container justify="center">
              <Grid item>
                <img alt="complex" className={classes.imageInput} src={profileIcon}/>
              </Grid>
              <Grid item sm>
                <Typography className={classes.pageTitle} variant="h3">
                  {currentUser.FullName}
                </Typography>
                <CardContent>
                  <TextField
                    id="email"
                    label="Почтовый ящик"
                    placeholder="Почтовый ящик"
                    type="text"
                    className={classes.gridContainer}
                    error={errors.email}
                    helperText={errors.email}
                    value={values.Login}
                    onChange={handleChange}
                  />
                </CardContent>
                {/* <CardActions>
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Сохранить
                  </Button>
                </CardActions> */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
  );
};

export default ProfileView;
