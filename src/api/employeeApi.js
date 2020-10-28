import {getCommonJsonRequestProps, throwHttpErrors} from "../common";

export const getAllUsers = (history) =>
  fetch(`http://localhost:3001/users/all`, {
    method: "GET",
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json())
    .then(users => users || []);

export const updateEmail = (history, email) =>
  fetch(`/hr-rest/employees/current/update-email`, {
    method: "POST",
    ...getCommonJsonRequestProps(),
    body: email,
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json())
    .then(users => users || []);

export const findUser = (history, login) =>
  fetch(`http://localhost:3001/users?login=${login}`, {
    method: "GET"
  })
    .then(response => {
      //console.log(response)
      return throwHttpErrors(response, history)
    })
    .then(response => {
      //console.log(response.json())
      return response.json()}
      );

export const getEmployeeFullNameByLogin = (employeeLogin, history) =>
  fetch(`/hr-rest/employees/${employeeLogin}/fullName`, {
    method: "GET",
    ...getCommonJsonRequestProps(),
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.data);

export const loadAvatar = (history) =>
  fetch(`/hr-rest/employees/current/avatar`, {
    method: "GET",
    ...getCommonJsonRequestProps(),
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.blob())
    .then(image => image.size > 0 ? window.URL.createObjectURL(image) : null);