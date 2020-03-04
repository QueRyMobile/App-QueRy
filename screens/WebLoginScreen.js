import * as WebBrowser from 'expo-web-browser';
import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import config from '../config'
import { AuthContext } from "../navigation/authTest";
import LoginScreen from './LoginScreen';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await config
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <LoginScreen/>
  );
};

export default withRouter(Login);