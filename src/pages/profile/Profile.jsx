import React, {useContext, useEffect, useState} from "react";
import ProfileView from "./ProfileView";
import {AppContext} from "../../AppContext";
import {findUser} from "../../api/employeeApi";
import {useSnackbar} from "../../utils/snackbar";

const Profile = (props) => {
  const [context] = useContext(AppContext);
  const {history} = props;
  const tokenUser = context.currentUser;
  const [currentUser, setCurrentUser] = useState();
  const {showError} = useSnackbar();

  useEffect(() => {

    // console.log(tokenUser)
    findUser(history, tokenUser.login).then(user => {
      // console.log(user.ID)
      return setCurrentUser(user)
    })
      .catch(() => showError("Произошла ошибка при загрузке информации о пользователе"));
  }, [tokenUser, history, showError]);

  // console.log(currentUser)

  return (
    <ProfileView
      currentUser={currentUser}
    />
  );
};

export default Profile;
