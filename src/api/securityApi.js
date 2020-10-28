import jwtDecode from "jwt-decode";
import {getCommonJsonRequestProps, throwHttpErrors} from "../common";

export const setCurrentUserToken = (currentUserToken) => {
  if (currentUserToken) {
    localStorage.setItem("hrjedi-token", currentUserToken);
  } else {
    localStorage.removeItem("hrjedi-token");
  }
};

export const login = (login, password) =>
  //logout()
  fetch(`http://localhost:3001/security/login`, {
    method: "POST",
    headers: {
      ...getCommonJsonRequestProps().headers,
    },
    body: JSON.stringify({login, password}),
  })
    .then(throwHttpErrors)
    .then(response => {
      return response.json()
    })
    .then(jwtResponse => {
      return jwtResponse.accessToken
    })
    .then(accessToken => {
      setCurrentUserToken(accessToken);
      return getCurrentUser();
    });

export const logout = () => new Promise((resolve) => {
  setCurrentUserToken(null);
  resolve();
});

export const getCurrentUser = () => {
  const currentUserToken = localStorage.getItem("hrjedi-token");
  if (currentUserToken) {
    const decodedJwt = jwtDecode(currentUserToken);
    if (Date.now() >= decodedJwt.exp * 1000) {
      setCurrentUserToken(null);
      return null;
    }
    return decodedJwt.Credential;
  }
  return null;
};

export const generateSecuredPassword = (history) =>
  fetch(`/hr-rest/security/generate-pass`, {
    method: "GET",
    ...getCommonJsonRequestProps(),
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.text());
